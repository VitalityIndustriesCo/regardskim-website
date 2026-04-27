"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";

type FormStatus = "idle" | "loading" | "success" | "error";

const TOTAL_SPOTS = 100;
const INITIAL_SPOTS = 67;

export default function Founding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
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
    <section id="founding" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Limited offer
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
              Join the Founding 100
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-slate md:text-lg">
              The first 100 stores to sign up get 50% off — forever. Not a trial. Not a promo. A permanent thank-you for believing early.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-slate/12 bg-[var(--surface-card)] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-6xl font-bold tabular-nums leading-none text-oxblood">
                {spotsRemaining}
              </span>
              <span className="text-xl font-medium text-slate">/ {TOTAL_SPOTS}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate">spots remaining</p>

            <div className="relative mt-5 h-2.5 w-full overflow-hidden rounded-full bg-mist">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #B08D57, #C9A66B)",
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate">
              {TOTAL_SPOTS - spotsRemaining} of {TOTAL_SPOTS} spots claimed
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-8 max-w-lg rounded-3xl border border-slate/12 bg-[var(--surface-card)] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.28)] md:p-10">
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-4xl">🎉</div>
                <h3 className="font-display text-2xl font-bold text-ink">You&apos;re in!</h3>
                <p className="mt-2 text-base text-slate">Check your inbox for confirmation.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-ink">Lock in your founding spot</h3>
                <p className="mt-2 text-sm text-slate">Reserve your spot now. No payment required.</p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
                    <label htmlFor="founding-name" className="mb-2 block text-sm font-medium text-ink">
                      First name
                    </label>
                    <input
                      id="founding-name"
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
                    <label htmlFor="founding-email" className="mb-2 block text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="founding-email"
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
                    <label htmlFor="founding-store" className="mb-2 block text-sm font-medium text-ink">
                      Shopify store URL <span className="text-slate">(optional)</span>
                    </label>
                    <input
                      id="founding-store"
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
                    className="btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Reserving your spot…" : "Lock in my spot"}
                  </button>

                  {status === "error" && (
                    <p className="text-sm text-red-600">Something went wrong — try again.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
