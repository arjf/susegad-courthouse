import crypto from "node:crypto";
import { cookies } from "next/headers";

const CSRF_COOKIE = "_csrf_token";
const TOKEN_LENGTH = 32;

function serializeCookie(value: string, opts: { maxAge?: number; sameSite?: "lax" | "strict" } = {}): string {
  const parts = [`${CSRF_COOKIE}=${value}`, "Path=/", "HttpOnly", "Secure", `SameSite=${opts.sameSite ?? "strict"}`];
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`);
  return parts.join("; ");
}

export async function generateCsrfToken(): Promise<string> {
  const token = crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/adm",
  });
  return token;
}

export async function validateCsrfToken(submittedToken: string | null | undefined): Promise<boolean> {
  if (!submittedToken) return false;
  const cookieStore = await cookies();
  const storedToken = cookieStore.get(CSRF_COOKIE)?.value;
  if (!storedToken) return false;

  const storedBuf = Buffer.from(storedToken);
  const submittedBuf = Buffer.from(submittedToken);

  if (storedBuf.length !== submittedBuf.length) return false;

  return crypto.timingSafeEqual(storedBuf, submittedBuf);
}

export async function rotateCsrfToken(): Promise<string> {
  const token = crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/adm",
  });
  return token;
}

type CsrfProtectedHandler = (request: Request) => Promise<Response>;
type CsrfRouteHandler = {
  POST?: CsrfProtectedHandler;
  GET?: CsrfProtectedHandler;
};

export function withCsrf(handler: CsrfProtectedHandler): CsrfProtectedHandler {
  return async (request: Request) => {
    if (request.method === "GET" || request.method === "HEAD") {
      return handler(request);
    }

    const contentType = request.headers.get("content-type") || "";
    let token: string | null = null;

    token = request.headers.get("X-CSRF-Token");

    if (!token && contentType.includes("application/json")) {
      const body = await request.clone().json();
      token = body._csrf || null;
    } else if (!token && (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded"))) {
      const formData = await request.clone().formData();
      token = (formData.get("_csrf") as string) || null;
    }

    const isValid = await validateCsrfToken(token);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid or missing CSRF token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(request);
  };
}
