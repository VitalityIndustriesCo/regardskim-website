import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || "";
const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

// Simple in-memory rate limiting (resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const honeypot = body.website || ""; // hidden field — bots fill this

    // Honeypot check
    if (honeypot) {
      // Bot detected — return fake success
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".") || email.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Add to MailerLite
    if (MAILERLITE_API_KEY) {
      const res = await fetch(MAILERLITE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          status: "active", // single opt-in
          groups: ["184796545632175364"], // Newsletter group
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`[subscribe] MailerLite error (${res.status}):`, err);
        // Still return success to user — don't expose backend errors
      }
    }

    console.log(`[subscribe] ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
