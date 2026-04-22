import { NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || "";
const MAILERLITE_COMING_SOON_GROUP_ID = process.env.MAILERLITE_COMING_SOON_GROUP_ID || "";

const TOTAL_SPOTS = 100;

export async function GET() {
  try {
    if (!MAILERLITE_API_KEY || !MAILERLITE_COMING_SOON_GROUP_ID) {
      // Fallback if env vars missing
      return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
    }

    const res = await fetch(
      `https://connect.mailerlite.com/api/groups/${MAILERLITE_COMING_SOON_GROUP_ID}`,
      {
        headers: {
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          Accept: "application/json",
        },
        next: { revalidate: 60 }, // cache for 60 seconds
      }
    );

    if (!res.ok) {
      console.error(`[spots] MailerLite error (${res.status}):`, await res.text());
      return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
    }

    const data = await res.json();
    const subscriberCount = data?.data?.active_count ?? 0;
    const remaining = Math.max(0, TOTAL_SPOTS - subscriberCount);

    return NextResponse.json(
      { remaining, total: TOTAL_SPOTS },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[spots] Error:", err);
    return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
  }
}
