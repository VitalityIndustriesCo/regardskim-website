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

  // Redirect homepage to coming soon
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/comingsoon", request.url));
  }

  const needsAuth = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!needsAuth) {
    return NextResponse.next();
  }

  // Shopify embedded requests carry a `host` param (base64-encoded shop admin origin)
  // or an `embedded=1` flag — allow them through without cookie checks
  const isEmbeddedRequest =
    searchParams.get("embedded") === "1" || searchParams.has("host");

  if (isEmbeddedRequest) {
    return NextResponse.next();
  }

  // Non-embedded access to app routes: redirect to the install page
  // (standalone access to the app is not supported — must come from Shopify Admin)
  return NextResponse.redirect(new URL("/comingsoon", request.url));
}

export const config = {
  matcher: [
    "/",
    "/inbox/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/connections/:path*",
    "/billing/:path*",
  ],
};
