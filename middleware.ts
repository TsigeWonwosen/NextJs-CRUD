import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routeAccessMap } from "./app/libs/routeAccessMap";

export async function middleware(req: NextRequest) {
  let pathName = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathName);
    return NextResponse.redirect(loginUrl);
  }

  pathName = pathName.split("/")[2];
  pathName = "/" + pathName;

  const allowedRoles = Object.entries(routeAccessMap).find(
    ([path]) => pathName == path,
  )?.[1];

  const role = (token.role as string).toLocaleLowerCase();

  if (role && (pathName == "/login" || pathName == "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if ((allowedRoles ?? []).length > 0 && !(allowedRoles ?? []).includes(role)) {
    return NextResponse.redirect(new URL("/forbidden", req.url)); // Redirect to unauthorized page
  }

  if (allowedRoles?.includes(role)) {
    if (role === "student" && pathName !== "/students") {
      return NextResponse.redirect(new URL("/dashboard/students", req.url));
    }
    // if (role === "teacher" && pathName !== "/teachers") {
    //   return NextResponse.redirect(new URL("/dashboard/teachers", req.url));
    // }
    if (role === "parent" && pathName !== "/parents") {
      return NextResponse.redirect(new URL("/dashboard/parents", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/services/:path*", "/admin/:path*"], // Apply middleware only to these routes
};
