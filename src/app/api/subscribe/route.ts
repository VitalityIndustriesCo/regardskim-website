import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

async function loadSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: string[]): Promise<void> {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const subscribers = await loadSubscribers();

    if (subscribers.includes(email)) {
      // Already subscribed — still return success (no need to tell them)
      return NextResponse.json({ ok: true });
    }

    subscribers.push(email);
    await saveSubscribers(subscribers);

    console.log(`[subscribe] New subscriber: ${email} (total: ${subscribers.length})`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
