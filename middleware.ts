import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow the login page itself
  if (pathname === "/admin/login") return NextResponse.next();

  // Check session cookie
  const session = req.cookies.get("admin_session")?.value;
  if (session === "authenticated") return NextResponse.next();

  // Redirect to login
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
