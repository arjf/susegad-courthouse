import crypto from "node:crypto";
import { cookies } from "next/headers";

const CSRF_COOKIE = "_csrf_token";
const TOKEN_LENGTH = 32;
const CSRF_SALT = crypto.randomBytes(32).toString("hex");
const SIGNED_TOKEN_TTL_MS = 30 * 60 * 1000;

export async function generateCsrfToken(): Promise<string> {
  const token = crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return token;
}

export function generateSignedCsrfToken(): string {
  const payload = `${Date.now()}`;
  const hmac = crypto.createHmac("sha256", CSRF_SALT).update(payload).digest();
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = hmac.toString("base64url");
  return `${encoded}.${signature}`;
}

export function verifySignedCsrfToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encoded, signature] = parts;

  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString();
  } catch {
    return false;
  }

  const expectedHmac = crypto.createHmac("sha256", CSRF_SALT).update(payload).digest();
  const expectedSig = expectedHmac.toString("base64url");

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  const timestamp = parseInt(payload, 10);
  if (isNaN(timestamp)) return false;

  return Date.now() - timestamp < SIGNED_TOKEN_TTL_MS;
}

export async function rotateCsrfToken(): Promise<string> {
  const token = crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return token;
}

type CsrfProtectedHandler = (request: Request) => Promise<Response>;

export function withCsrf(handler: CsrfProtectedHandler): CsrfProtectedHandler {
  return async (request: Request) => {
    if (request.method === "GET" || request.method === "HEAD") {
      return handler(request);
    }

    const contentType = request.headers.get("content-type") || "";
    const cookieToken = (await cookies()).get(CSRF_COOKIE)?.value ?? null;
    let submittedToken: string | null = null;
    let signedToken: string | null = null;

    submittedToken = request.headers.get("X-CSRF-Token");

    if (!submittedToken && contentType.includes("application/json")) {
      const body = await request.clone().json();
      submittedToken = body._csrf || null;
    }

    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.clone().formData();
      submittedToken = (formData.get("_csrf") as string) || null;
      signedToken = (formData.get("_csrf_signed") as string) || null;
    }

    let valid = false;

    if (submittedToken && cookieToken) {
      const sBuf = Buffer.from(submittedToken);
      const cBuf = Buffer.from(cookieToken);
      if (sBuf.length === cBuf.length) {
        valid = crypto.timingSafeEqual(sBuf, cBuf);
      }
    }

    if (!valid && signedToken) {
      valid = verifySignedCsrfToken(signedToken);
    }

    if (!valid) {
      return new Response(JSON.stringify({ error: "Invalid or missing CSRF token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(request);
  };
}
