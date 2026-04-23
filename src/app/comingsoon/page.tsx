"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";

type FormStatus = "idle" | "loading" | "success" | "error";

const TOTAL_SPOTS = 100;
const INITIAL_SPOTS = 67; // fallback while loading

export default function ComingSoonPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [spotsRemaining, setSpotsRemaining] = useState(INITIAL_SPOTS);

  // Fetch real count from MailerLite on mount
  useEffect(() => {
    fetch("/api/spots")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.remaining === "number") {
          setSpotsRemaining(data.remaining);
        }
      })
      .catch(() => {}); // silently fall back to INITIAL_SPOTS
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      // Read Meta cookies for CAPI match quality
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
        setSpotsRemaining((prev) => Math.max(0, prev - 1)); // instant visual feedback
        // Fire Meta Pixel Lead event with matching eventID for CAPI deduplication
        if (typeof window !== "undefined" && (window as any).fbq && data.eventId) {
          (window as any).fbq("track", "Lead", {}, { eventID: data.eventId });
        } else if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead");
        }
        setFirstName("");
        setEmail("");
        setStoreUrl("");
        setHoneypot("");
        // Small delay so user sees the counter drop before success screen
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#060B14", fontFamily: "var(--font-plus-jakarta)" }}
    >
      {/* Logo */}
      <header className="flex items-center justify-center px-6 pt-10 pb-2">
        <span className="font-display text-3xl font-bold" style={{ color: "#FFFFFF" }}>
          RegardsKim
        </span>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">

        {/* Hero */}
        <FadeIn delay={0.05}>
          <section className="pt-12 pb-8 text-center">
            <h1
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              style={{ color: "#FFFFFF" }}
            >
              Your inbox, handled.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 md:text-lg" style={{ color: "#E2E8F0" }}>
              The Shopify app that connects to your Gmail and handles your customer emails for you. Tracking questions, returns, order updates — drafted and ready to send.
            </p>

            {/* Hero image */}
            <div className="mt-10">
              <div className="relative mx-auto inline-block w-full max-w-2xl">
                <Image
                  src="/images/hero-product-mockup.png"
                  alt="RegardsKim inbox showing customer emails sorted and drafted automatically"
                  width={1536}
                  height={1024}
                  className="w-full"
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
                <span className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Built for Shopify</span>
              </div>
              <div className="h-4 w-px hidden md:block" style={{ backgroundColor: "#1E293B" }} />
              <div className="flex items-center gap-2.5">
                <GmailLogo className="h-7 w-7" />
                <span className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Connects with Gmail</span>
              </div>
              <div className="h-4 w-px hidden md:block" style={{ backgroundColor: "#1E293B" }} />
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✨</span>
                <span className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Trained on 100,000+ real customer emails</span>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Divider */}
        <div className="my-2 h-px" style={{ backgroundColor: "#1E293B" }} />

        {/* Founding 100 */}
        <FadeIn delay={0.15}>
          <section className="py-12 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: "#B08D57", color: "#0A0F1A" }}
            >
              Limited offer
            </span>
            <h2
              className="mt-4 font-display text-3xl font-bold md:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Join the Founding 100
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7" style={{ color: "#E2E8F0" }}>
              The first 100 stores to sign up get 50% off — forever. Not a trial. Not a promo.
              A permanent thank-you for believing early.
            </p>

            {/* Counter */}
            <div
              className="mx-auto mt-8 max-w-sm rounded-2xl border p-6"
              style={{ backgroundColor: "#111827", borderColor: "#1E293B" }}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="font-display text-6xl font-bold tabular-nums leading-none"
                  style={{ color: "#C9A66B" }}
                >
                  {spotsRemaining}
                </span>
                <span className="text-xl font-medium" style={{ color: "#E2E8F0" }}>/ {TOTAL_SPOTS}</span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: "#E2E8F0" }}>
                spots remaining
              </p>

              {/* Progress bar */}
              <div
                className="relative mt-5 h-2.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "#1E293B" }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #B08D57, #C9A66B)",
                  }}
                />
              </div>
              <p className="mt-2 text-xs" style={{ color: "#E2E8F0" }}>
                {TOTAL_SPOTS - spotsRemaining} of {TOTAL_SPOTS} spots claimed
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Email capture form */}
        <FadeIn delay={0.2}>
          <section className="pb-12">
            <div
              className="mx-auto rounded-3xl border p-6 shadow-sm md:p-10"
              style={{ backgroundColor: "#111827", borderColor: "#1E293B" }}
            >
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">🎉</div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                    You&apos;re in!
                  </h3>
                  <p className="mt-2 text-base" style={{ color: "#E2E8F0" }}>
                    Check your inbox for confirmation.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                    Lock in your founding spot
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "#E2E8F0" }}>
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
                        style={{ color: "#FFFFFF" }}
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
                          borderColor: "#1E293B",
                          backgroundColor: "#1E293B",
                          color: "#FFFFFF",
                        }}
                        placeholder="Your first name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cs-email"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "#FFFFFF" }}
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
                          borderColor: "#1E293B",
                          backgroundColor: "#1E293B",
                          color: "#FFFFFF",
                        }}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cs-store"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "#FFFFFF" }}
                      >
                        Store URL{" "}
                        <span style={{ color: "#E2E8F0", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        id="cs-store"
                        type="text"
                        value={storeUrl}
                        onChange={(e) => setStoreUrl(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#1E293B",
                          backgroundColor: "#1E293B",
                          color: "#FFFFFF",
                        }}
                        placeholder="yourstore.myshopify.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 w-full rounded-full py-3.5 text-sm font-semibold shadow-[0_8px_24px_rgba(176,141,87,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(176,141,87,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #B08D57, #C9A66B)",
                      }}
                    >
                      {status === "loading" ? "Reserving your spot…" : "Lock in my spot"}
                    </button>

                    {status === "error" && (
                      <p className="text-sm" style={{ color: "#C9A66B" }}>
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
              style={{ color: "#FFFFFF" }}
            >
              What is Regards Kim?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📬",
                  text: "Reads your customer emails, pulls in live order and tracking data, and drafts the reply for you",
                },
                {
                  icon: "✍️",
                  text: "Drafts replies in your style — you decide what gets sent, nothing goes out without you",
                },
                {
                  icon: "⚡",
                  text: "Replace your VA for $49/month",
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-4 rounded-2xl border p-5"
                  style={{ backgroundColor: "#111827", borderColor: "#1E293B" }}
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: "rgba(176,141,87,0.15)" }}>
                    {icon}
                  </span>
                  <p className="mt-1.5 text-sm leading-6 md:text-base" style={{ color: "#FFFFFF" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "#1E293B" }}>
        <p className="text-sm" style={{ color: "#E2E8F0" }}>
          © RegardsKim 2026
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <Link href="/about" className="text-sm transition-colors hover:underline" style={{ color: "#E2E8F0" }}>
            About
          </Link>
          <span style={{ color: "#1E293B" }}>·</span>
          <Link href="/privacy" className="text-sm transition-colors hover:underline" style={{ color: "#E2E8F0" }}>
            Privacy
          </Link>
          <span style={{ color: "#1E293B" }}>·</span>
          <Link href="/terms" className="text-sm transition-colors hover:underline" style={{ color: "#E2E8F0" }}>
            Terms
          </Link>
        </div>
        <p className="mt-3 text-sm italic" style={{ color: "#E2E8F0" }}>
          Kind regards, Kim
        </p>
      </footer>
    </div>
  );
}
