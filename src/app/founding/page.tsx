"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";

type FormStatus = "idle" | "loading" | "success" | "error";

const TOTAL_SPOTS = 100;
const INITIAL_SPOTS = 67;

const bullets = [
  "Connects to your Shopify store and Gmail",
  "Drafts replies using real order, tracking, and policy data",
  "Handles WISMO, returns, refunds, and complaints",
  "You review and approve every reply before it sends",
  "Your customers just see your store, never us",
];

export default function FoundingPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [spotsRemaining, setSpotsRemaining] = useState(INITIAL_SPOTS);

  useEffect(() => {
    fetch("/api/spots")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.remaining === "number") {
          setSpotsRemaining(data.remaining);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      const getCookie = (name: string) =>
        document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[ 1] || "";

      const res = await fetch("/api/coming-soon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName.trim(),
          email: email.trim(),
          storeUrl: storeUrl.trim(),
          website: honeypot,
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSpotsRemaining((prev) => Math.max(0, prev - 1));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (typeof window !== "undefined" && w.fbq && data.eventId) {
          w.fbq("track", "Lead", {}, { eventID: data.eventId });
        } else if (typeof window !== "undefined" && w.fbq) {
          w.fbq("track", "Lead");
        }
        setFirstName("");
        setEmail("");
        setStoreUrl("");
        setHoneypot("");
        setTimeout(() => setStatus("success"), 1200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const progressPct = ((TOTAL_SPOTS - spotsRemaining) / TOTAL_SPOTS) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Minimal header — logo only, no nav */}
      <header className="border-b border-slate/10 bg-[var(--surface-card)] px-6 py-5">
        <Link href="/" className="font-display text-2xl font-bold tracking-normal text-ink">
          RegardsKim
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-8">
        <div className="w-full max-w-xl">
          {/* Headline */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Founding 100
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-normal text-ink md:text-5xl">
              Stop spending hours on customer&nbsp;emails
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-slate md:text-lg">
              Regards Kim is a Shopify app that connects to your Gmail, reads your customer emails, and drafts replies using your live store data. You review, approve, and send.
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate/15 bg-[var(--surface-card)] px-3 py-2 shadow-sm dark:shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
              <ShopifyLogo className="h-5 w-5" />
              <span className="text-xs font-semibold text-ink">Built for Shopify</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate/15 bg-[var(--surface-card)] px-3 py-2 shadow-sm dark:shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
              <GmailLogo className="h-4 w-4" />
              <span className="text-xs font-semibold text-ink">Connects with Gmail</span>
            </div>
          </div>

          {/* What Kim handles */}
          <ul className="mx-auto mt-8 max-w-sm space-y-2.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Pricing + scarcity */}
          <div className="mx-auto mt-8 max-w-sm text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-sm text-slate line-through">$98/mo</span>
              <span className="font-display text-4xl font-bold text-ink">$49</span>
              <span className="text-sm text-slate">/mo forever</span>
            </div>
            <p className="mt-1 text-xs text-slate">Founding price locked in permanently. Regular price after 100 spots fill.</p>
          </div>

          {/* Spots counter */}
          <div className="mx-auto mt-6 max-w-xs text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-3xl font-bold tabular-nums text-oxblood">{spotsRemaining}</span>
              <span className="text-sm text-slate">of {TOTAL_SPOTS} spots remaining</span>
            </div>
            <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-mist">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #B08D57, #C9A66B)",
                }}
              />
            </div>
          </div>

          {/* Form card */}
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate/12 bg-[var(--surface-card)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_38px_rgba(0,0,0,0.28)]">
            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="mb-3 text-3xl">🎉</div>
                <h3 className="font-display text-xl font-bold text-ink">You&apos;re in!</h3>
                <p className="mt-2 text-sm text-slate">Check your inbox for confirmation. We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 opacity-0"
                />

                <div>
                  <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium text-ink">
                    First name
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="w-full rounded-xl border border-slate/20 bg-mist px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-[var(--surface-card)] focus:outline-none focus:ring-1 focus:ring-brass/30"
                    placeholder="Your first name"
                  />
                </div>

                <div>
                  <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="f-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="w-full rounded-xl border border-slate/20 bg-mist px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-[var(--surface-card)] focus:outline-none focus:ring-1 focus:ring-brass/30"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="f-store" className="mb-1.5 block text-sm font-medium text-ink">
                    Shopify store URL <span className="text-slate">(optional)</span>
                  </label>
                  <input
                    id="f-store"
                    type="text"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate/20 bg-mist px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-[var(--surface-card)] focus:outline-none focus:ring-1 focus:ring-brass/30"
                    placeholder="yourstore.myshopify.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Reserving your spot…" : "Claim your founding spot"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                )}

                <p className="text-center text-xs text-slate/70">No payment required. We&apos;ll notify you when it&apos;s time to install.</p>
              </form>
            )}
          </div>

          {/* Link to full site */}
          <p className="mt-8 text-center text-xs text-slate/60">
            Want to learn more?{" "}
            <Link href="/" className="text-brass underline underline-offset-2 hover:text-ink">
              Visit regardskim.com
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
