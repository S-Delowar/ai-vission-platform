import { NextResponse } from "next/server";

export default function middleware(req) {
  const access = req.cookies.get("access")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  // Handle Root Redirect
  if (pathname === "/") {
    // If logged in → dashboard
    if (access) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // If NOT logged in → signin
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If user is logged in, redirect them away from login/signup
  if (isAuthPage && access) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is NOT logged in, block dashboard pages
  if (pathname.startsWith("/dashboard") && !access) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard"],
};
