import { NextResponse } from "next/server";

export default function middleware(req) {
  const access = req.cookies.get("access")?.value || null;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isProtectedPage = pathname.startsWith("/dashboard");

  // AUTH PAGES (signin/signup)
  if (isAuthPage) {
    // If logged in, go to dashboard
    if (access) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Not logged in, allow signin/signup
    return NextResponse.next();
  }

  // PROTECTED PAGE (/dashboard)
  if (isProtectedPage) {
    // If NOT logged in, go to signin
    if (!access) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  // ALL OTHER ROUTES
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/dashboard",
  ],
};
