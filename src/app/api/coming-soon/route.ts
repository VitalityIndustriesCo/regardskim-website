import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || "";
const MAILERLITE_COMING_SOON_GROUP_ID = process.env.MAILERLITE_COMING_SOON_GROUP_ID || "";
const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

const META_PIXEL_ID = "1609329553452333";
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN || "";
const META_CAPI_URL = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`;

async function sendMetaCAPIEvent(email: string, ip: string, userAgent: string) {
  if (!META_CAPI_TOKEN) return;
  const hashedEmail = createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  try {
    await fetch(`${META_CAPI_URL}?access_token=${META_CAPI_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: "https://regardskim.com/comingsoon",
          user_data: {
            em: [hashedEmail],
            client_ip_address: ip !== "unknown" ? ip : undefined,
            client_user_agent: userAgent || undefined,
          },
        }],
      }),
    });
  } catch (err) {
    console.error("[CAPI] Failed to send Meta CAPI event:", err);
  }
}

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
    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const storeUrl = (body.storeUrl || "").trim();
    const honeypot = body.website || ""; // hidden field — bots fill this

    // Honeypot check
    if (honeypot) {
      // Bot detected — return fake success
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!email || !email.includes("@") || !email.includes(".") || email.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Add to MailerLite
    if (MAILERLITE_API_KEY) {
      const groups = MAILERLITE_COMING_SOON_GROUP_ID ? [MAILERLITE_COMING_SOON_GROUP_ID] : [];
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
          ...(groups.length > 0 && { groups }),
          fields: {
            name,
            company: storeUrl,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`[coming-soon] MailerLite error (${res.status}):`, err);
        // Still return success to user — don't expose backend errors
      }
    }

    // Send Meta CAPI Lead event (server-side, deduplicates with browser Pixel)
    await sendMetaCAPIEvent(email, ip, userAgent);

    console.log(`[coming-soon] ${email}${storeUrl ? ` (${storeUrl})` : ""}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[coming-soon] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
