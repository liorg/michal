import { NextRequest, NextResponse } from "next/server";

const USERNAME = "michal";
const PASSWORD = "studio2024";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect only /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.replace("Basic ", "");
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");
    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next();
    }
  }

  // Not authenticated – ask for credentials
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
