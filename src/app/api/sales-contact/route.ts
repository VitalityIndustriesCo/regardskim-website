import { NextRequest, NextResponse } from "next/server";

const SUPPORT_EMAIL = "support@regardskim.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CONTACT_FORM_FROM_EMAIL =
  process.env.CONTACT_FORM_FROM_EMAIL || "RegardsKim Website <support@regardskim.com>";
const RESEND_API = "https://api.resend.com/emails";

type SalesContactPayload = {
  name?: string;
  email?: string;
  storeUrl?: string;
  monthlyOrders?: string;
  message?: string;
  website?: string;
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function textBody(payload: Required<Omit<SalesContactPayload, "website">>, ip: string, userAgent: string) {
  return [
    "New RegardsKim website enquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Store URL: ${payload.storeUrl || "Not provided"}`,
    `Monthly orders: ${payload.monthlyOrders || "Not provided"}`,
    "",
    "Message:",
    payload.message || "Not provided",
    "",
    "Source:",
    "regardskim.com website contact form",
    `IP: ${ip}`,
    `User agent: ${userAgent || "unknown"}`,
  ].join("\n");
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlBody(payload: Required<Omit<SalesContactPayload, "website">>) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Store URL", payload.storeUrl || "Not provided"],
    ["Monthly orders", payload.monthlyOrders || "Not provided"],
    ["Message", payload.message || "Not provided"],
  ];

  return `
    <h2>New RegardsKim website enquiry</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="border:1px solid #e5e7eb;font-weight:bold;vertical-align:top;">${htmlEscape(label)}</td>
              <td style="border:1px solid #e5e7eb;white-space:pre-wrap;">${htmlEscape(value)}</td>
            </tr>`
        )
        .join("")}
    </table>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SalesContactPayload;
    const honeypot = clean(body.website, 120);

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const payload = {
      name: clean(body.name, 120),
      email: clean(body.email, 254).toLowerCase(),
      storeUrl: clean(body.storeUrl, 180),
      monthlyOrders: clean(body.monthlyOrders, 40),
      message: clean(body.message, 1200),
    };

    if (!payload.name) {
      return NextResponse.json({ error: "Please add your name." }, { status: 400 });
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ error: "Please add a valid email." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please email support directly." }, { status: 429 });
    }

    if (!RESEND_API_KEY) {
      console.error("[sales-contact] RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email is not configured yet." }, { status: 503 });
    }

    const response = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FORM_FROM_EMAIL,
        to: SUPPORT_EMAIL,
        reply_to: payload.email,
        subject: `Website enquiry from ${payload.name}`,
        text: textBody(payload, ip, userAgent),
        html: htmlBody(payload),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[sales-contact] Resend error (${response.status}):`, errorText);
      return NextResponse.json({ error: "Could not send your details." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sales-contact] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
