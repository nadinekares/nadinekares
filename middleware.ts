import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/dev", "/playground", "/styleguide", "/components", "/archive"];

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    PRIVATE_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dev/:path*", "/playground/:path*", "/styleguide/:path*", "/components/:path*", "/archive/:path*"],
};
