import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.SUBSCRIBE_WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // If webhook configured, forward to Google Apps Script / Sheet
    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
        });
      } catch (err) {
        console.error("[subscribe] Webhook failed:", err);
      }
    }

    // Always log server-side as backup
    console.log(`[subscribe] ${email} at ${new Date().toISOString()}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
