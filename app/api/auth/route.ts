import { NextRequest, NextResponse } from "next/server";

const USERNAME = "michal";
const PASSWORD = "studio2024";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === USERNAME && password === PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
