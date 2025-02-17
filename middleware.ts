import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.pathname;
  // const token = req.cookies.get("next-auth.session-token");
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", path);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string; // Extract user role

  const studentUrl = new URL("/dashboard/students", req.url);
  const teacherUrl = new URL("/dashboard/teachers", req.url);
  const parenttUrl = new URL("/dashboard/students", req.url);
  // Redirect users to their allowed page
  // if (path.startsWith("/dashboard")) {
  //   if (role === "student") {
  //     return NextResponse.rewrite(studentUrl);
  //   }
  //   if (role === "teacher") {
  //     return NextResponse.rewrite(teacherUrl);
  //   }
  //   if (role === "parent") {
  //     return NextResponse.rewrite(parenttUrl);
  //   }
  // }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/services/:path*", "/admin/:path*"], // Apply middleware only to these routes
};
