import { NextResponse } from "next/server";

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID || "";
const EDGE_CONFIG_TOKEN = process.env.EDGE_CONFIG_TOKEN || "";
const TOTAL_SPOTS = 100;

export async function GET() {
  try {
    if (!EDGE_CONFIG_ID || !EDGE_CONFIG_TOKEN) {
      return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
    }

    const res = await fetch(
      `https://edge-config.vercel.com/${EDGE_CONFIG_ID}/item/spots_claimed?token=${EDGE_CONFIG_TOKEN}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(`[spots] Edge Config read error (${res.status})`);
      return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
    }

    const claimed = await res.json();
    const remaining = Math.max(0, TOTAL_SPOTS - (typeof claimed === "number" ? claimed : 0));

    return NextResponse.json({ remaining, total: TOTAL_SPOTS });
  } catch (err) {
    console.error("[spots] Error:", err);
    return NextResponse.json({ remaining: 67, total: TOTAL_SPOTS });
  }
}
