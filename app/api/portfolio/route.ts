import { NextRequest, NextResponse } from "next/server";

type Item = {
  id: number;
  title: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
  fileUrl?: string;
  fileType?: string;
};

const DEFAULT_ITEMS: Item[] = [
  { id: 1, title: "מותג קפה בוטיק", category: "מיתוג", emoji: "☕", color: "#e8d5c4", description: "בניית זהות מותגית מלאה לבית קפה עצמאי" },
  { id: 2, title: "קליניקת יופי", category: "תוכן", emoji: "✨", color: "#e8d5e8", description: "ניהול תוכן ועיצוב פוסטים לרשתות חברתיות" },
  { id: 3, title: "סטודיו לצילום", category: "עיצוב", emoji: "📸", color: "#d5e8e4", description: "עיצוב פיד ואסטרטגיית תוכן לאינסטגרם" },
];

const USE_REDIS = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const KV_KEY = "portfolio_items";

function getRedis() {
  const { Redis } = require("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

async function readItems(): Promise<Item[]> {
  if (USE_REDIS) {
    try {
      const redis = getRedis();
      const items = await redis.get(KV_KEY);
      return (items as Item[]) ?? DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  }
  const { readFileSync } = await import("fs");
  const { join } = await import("path");
  try {
    const raw = readFileSync(join(process.cwd(), "data", "portfolio.json"), "utf-8");
    return JSON.parse(raw).items;
  } catch {
    return DEFAULT_ITEMS;
  }
}

async function writeItems(items: Item[]) {
  if (USE_REDIS) {
    const redis = getRedis();
    await redis.set(KV_KEY, items);
    return;
  }
  const { writeFileSync } = await import("fs");
  const { join } = await import("path");
  writeFileSync(
    join(process.cwd(), "data", "portfolio.json"),
    JSON.stringify({ items }, null, 2),
    "utf-8"
  );
}

export async function GET() {
  const items = await readItems();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = await readItems();
  const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const newItem: Item = { id: newId, ...body };
  items.push(newItem);
  await writeItems(items);
  return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const items = await readItems();
  await writeItems(items.filter((i) => i.id !== id));
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const items = await readItems();
  await writeItems(items.map((i) => (i.id === body.id ? body : i)));
  return NextResponse.json(body);
}