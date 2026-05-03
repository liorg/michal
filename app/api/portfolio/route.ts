import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "data", "portfolio.json");

function readData() {
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeData(data: unknown) {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = readData();
  const newId = data.items.length > 0 ? Math.max(...data.items.map((i: { id: number }) => i.id)) + 1 : 1;
  const newItem = { id: newId, ...body };
  data.items.push(newItem);
  writeData(data);
  return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = readData();
  data.items = data.items.filter((i: { id: number }) => i.id !== id);
  writeData(data);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const data = readData();
  data.items = data.items.map((i: { id: number }) => (i.id === body.id ? body : i));
  writeData(data);
  return NextResponse.json(body);
}
