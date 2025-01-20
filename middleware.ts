import { getSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";

// const protectedRoutes = ["/dashboard", "/services", "/admin"];

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.pathname;
  // if (protectedRoutes.some((route) => path.startsWith(route))) {
  const token = req.cookies.get("next-auth.session-token");

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", path); // Optional: Redirect back after login
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
  // }
};

export const config = {
  matcher: ["/services/:path*", "/admin/:path*"], // Apply middleware only to these routes
};
