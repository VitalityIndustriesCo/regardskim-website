"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";

type FormStatus = "idle" | "loading" | "success" | "error";

const SPOTS_REMAINING = 67;
const TOTAL_SPOTS = 100;

export default function ComingSoonPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/coming-soon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName.trim(),
          email: email.trim(),
          storeUrl: storeUrl.trim(),
          website: honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        // Fire Meta Pixel Lead event
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead");
        }
        setFirstName("");
        setEmail("");
        setStoreUrl("");
        setHoneypot("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const progressPct = ((TOTAL_SPOTS - SPOTS_REMAINING) / TOTAL_SPOTS) * 100;

  return (
    <div
      className="paper-grain min-h-screen"
      style={{ backgroundColor: "#f5f0e8", fontFamily: "var(--font-plus-jakarta)" }}
    >
      {/* Logo */}
      <header className="flex items-center justify-center px-6 pt-10 pb-2">
        <span className="font-display text-3xl font-bold" style={{ color: "#1a1a1a" }}>
          RegardsKim
        </span>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">

        {/* Hero */}
        <FadeIn delay={0.05}>
          <section className="pt-12 pb-8 text-center">
            <h1
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              style={{ color: "#1a1a1a" }}
            >
              Your inbox, handled.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 md:text-lg" style={{ color: "#6b6b6b" }}>
              Regards Kim answers your customer emails so you don&apos;t have to. Tracking questions, returns,
              order updates — handled automatically.
            </p>

            {/* Hero image */}
            <div className="mt-10">
              <div className="relative mx-auto inline-block w-full max-w-2xl overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(26,26,26,0.12)]">
                <Image
                  src="/images/coming-soon-hero-1.png"
                  alt="Regards Kim inbox preview"
                  width={800}
                  height={480}
                  className="w-full object-cover"
                  onError={() => {}}
                  priority
                />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Trust badges */}
        <FadeIn delay={0.1}>
          <section className="py-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2.5">
                <ShopifyLogo className="h-7 w-7" />
                <span className="text-sm font-medium" style={{ color: "#1a1a1a" }}>Built for Shopify</span>
              </div>
              <div className="h-4 w-px hidden md:block" style={{ backgroundColor: "#d6cfc4" }} />
              <div className="flex items-center gap-2.5">
                <GmailLogo className="h-7 w-7" />
                <span className="text-sm font-medium" style={{ color: "#1a1a1a" }}>Works with Gmail</span>
              </div>
              <div className="h-4 w-px hidden md:block" style={{ backgroundColor: "#d6cfc4" }} />
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✨</span>
                <span className="text-sm font-medium" style={{ color: "#1a1a1a" }}>Trained on 100,000+ real customer emails</span>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Divider */}
        <div className="my-2 h-px" style={{ backgroundColor: "#d6cfc4" }} />

        {/* Founding 100 */}
        <FadeIn delay={0.15}>
          <section className="py-12 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: "#e85d3a", color: "#ffffff" }}
            >
              Limited offer
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold md:text-4xl"
              style={{ color: "#1a1a1a" }}
            >
              Join the Founding 100
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7" style={{ color: "#6b6b6b" }}>
              The first 100 stores to sign up get 50% off — forever. Not a trial. Not a promo.
              A permanent thank-you for believing early.
            </p>

            {/* Counter */}
            <div
              className="mx-auto mt-8 max-w-sm rounded-2xl border p-6"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(26,26,26,0.1)" }}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="font-display text-6xl font-bold tabular-nums leading-none"
                  style={{ color: "#d04e2e" }}
                >
                  {SPOTS_REMAINING}
                </span>
                <span className="text-xl font-medium" style={{ color: "#6b6b6b" }}>/ {TOTAL_SPOTS}</span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: "#6b6b6b" }}>
                spots remaining
              </p>

              {/* Progress bar */}
              <div
                className="relative mt-5 h-2.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "rgba(26,26,26,0.08)" }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #e85d3a, #d04e2e)",
                  }}
                />
              </div>
              <p className="mt-2 text-xs" style={{ color: "#6b6b6b" }}>
                {TOTAL_SPOTS - SPOTS_REMAINING} of {TOTAL_SPOTS} spots claimed
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Email capture form */}
        <FadeIn delay={0.2}>
          <section className="pb-12">
            <div
              className="mx-auto rounded-3xl border p-6 shadow-sm md:p-10"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(26,26,26,0.08)" }}
            >
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">🎉</div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "#1a1a1a" }}>
                    You&apos;re in!
                  </h3>
                  <p className="mt-2 text-base" style={{ color: "#6b6b6b" }}>
                    Check your inbox for confirmation.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "#1a1a1a" }}>
                    Lock in your founding spot
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>
                    Reserve your spot now. No payment required.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                    />

                    <div>
                      <label
                        htmlFor="cs-first-name"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "#1a1a1a" }}
                      >
                        First name
                      </label>
                      <input
                        id="cs-first-name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        className="w-full rounded-xl border px-4 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(26,26,26,0.15)",
                          backgroundColor: "rgba(245,240,232,0.4)",
                          color: "#1a1a1a",
                        }}
                        placeholder="Your first name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cs-email"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "#1a1a1a" }}
                      >
                        Email
                      </label>
                      <input
                        id="cs-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        className="w-full rounded-xl border px-4 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(26,26,26,0.15)",
                          backgroundColor: "rgba(245,240,232,0.4)",
                          color: "#1a1a1a",
                        }}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cs-store"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "#1a1a1a" }}
                      >
                        Store URL{" "}
                        <span style={{ color: "#6b6b6b", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        id="cs-store"
                        type="text"
                        value={storeUrl}
                        onChange={(e) => setStoreUrl(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(26,26,26,0.15)",
                          backgroundColor: "rgba(245,240,232,0.4)",
                          color: "#1a1a1a",
                        }}
                        placeholder="yourstore.myshopify.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 w-full rounded-full py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(232,93,58,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(208,78,46,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #e85d3a, #d04e2e)",
                      }}
                    >
                      {status === "loading" ? "Reserving your spot…" : "Lock in my spot"}
                    </button>

                    {status === "error" && (
                      <p className="text-sm" style={{ color: "#d04e2e" }}>
                        Something went wrong — try again.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </section>
        </FadeIn>

        {/* What is Regards Kim */}
        <FadeIn delay={0.25}>
          <section className="py-10">
            <h2
              className="mb-8 text-center font-display text-2xl font-bold md:text-3xl"
              style={{ color: "#1a1a1a" }}
            >
              What is Regards Kim?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📬",
                  text: "Sorts, reads, and replies to customer emails using live store data and tracking",
                },
                {
                  icon: "✍️",
                  text: "Drafts in your style and you decide what gets sent — it just handles the busy work",
                },
                {
                  icon: "⚡",
                  text: "Works with Gmail and Shopify — set up in under 5 minutes",
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl border p-5"
                  style={{ backgroundColor: "#ffffff", borderColor: "rgba(26,26,26,0.08)" }}
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: "rgba(232,93,58,0.08)" }}>
                    {icon}
                  </span>
                  <p className="mt-1.5 text-sm leading-6 md:text-base" style={{ color: "#1a1a1a" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "rgba(26,26,26,0.1)" }}>
        <p className="text-sm" style={{ color: "#6b6b6b" }}>
          © RegardsKim 2026
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <Link href="/privacy" className="text-sm transition-colors hover:underline" style={{ color: "#6b6b6b" }}>
            Privacy
          </Link>
          <span style={{ color: "#d6cfc4" }}>·</span>
          <Link href="/terms" className="text-sm transition-colors hover:underline" style={{ color: "#6b6b6b" }}>
            Terms
          </Link>
        </div>
        <p className="mt-3 text-sm italic" style={{ color: "#6b6b6b" }}>
          Kind regards, Kim
        </p>
      </footer>
    </div>
  );
}
