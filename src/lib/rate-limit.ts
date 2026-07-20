import crypto from "node:crypto";
import { cookies } from "next/headers";

const RATE_LIMIT_COOKIE = "_rl";

interface RateLimitEntry {
  count: number;
  windowStart: number;
  blockedUntil: number | null;
}

const store = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 30 * 60 * 1000;

export async function checkRateLimit(request: Request): Promise<{ allowed: boolean; remaining: number; blockedUntil: number | null }> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";

  const key = `rl:${ip}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || (now - entry.windowStart) > WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now, blockedUntil: null });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, blockedUntil: null };
  }

  if (entry.blockedUntil && now < entry.blockedUntil) {
    return { allowed: false, remaining: 0, blockedUntil: entry.blockedUntil };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_MS;
    return { allowed: false, remaining: 0, blockedUntil: entry.blockedUntil };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count, blockedUntil: null };
}

export function resetRateLimit(request: Request): void {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
  store.delete(`rl:${ip}`);
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if ((now - entry.windowStart) > WINDOW_MS * 2) {
      store.delete(key);
    }
  }
}, 60_000);
