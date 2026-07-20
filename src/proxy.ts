import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

export function proxy(request: NextRequest) {
  if (isComingSoon && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
