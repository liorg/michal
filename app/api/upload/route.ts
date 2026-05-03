import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const allowed = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "סוג קובץ לא נתמך" }, { status: 400 });
    }

    // Convert to base64 data URL – works on Vercel (no filesystem needed)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = ext === "pdf" ? "application/pdf" : `image/${ext === "jpg" ? "jpeg" : ext}`;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "שגיאה בהעלאה" }, { status: 500 });
  }
}
