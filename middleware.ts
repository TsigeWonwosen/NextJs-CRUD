import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("next-auth.session-token");

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", path);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/services/:path*", "/admin/:path*"], // Apply middleware only to these routes
};
