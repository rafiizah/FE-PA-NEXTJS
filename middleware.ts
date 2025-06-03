import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value || "";

  if (!token) {
    console.log("Middleware: No token found, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log("Middleware: Decoded token and role:", { role, path: req.nextUrl.pathname });

    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin" && role !== "superadmin") {
      console.log("Middleware: Unauthorized access to /admin, redirecting to /");
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware: Invalid token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboardUmkm/:path*", "/dashboardAsosiasi/:path*"],
};