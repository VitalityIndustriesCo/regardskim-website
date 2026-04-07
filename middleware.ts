import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/inbox",
  "/analytics",
  "/settings",
  "/connections",
  "/billing",
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const needsAuth = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!needsAuth) {
    return NextResponse.next();
  }

  const isEmbeddedRequest =
    searchParams.get("embedded") === "1" || searchParams.has("host");

  if (isEmbeddedRequest) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/inbox/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/connections/:path*",
    "/billing/:path*",
  ],
};
