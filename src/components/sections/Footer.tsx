"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-slate/10 bg-white py-12 dark:bg-[#20283A]">
      <div className="section-shell grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <p className="font-display font-bold text-2xl text-ink">RegardsKim</p>
          <p className="mt-3 text-sm text-slate">Customer email support for ecommerce stores.</p>

          <form onSubmit={handleSubscribe} className="mt-6">
            <p className="text-sm font-medium text-ink mb-2">Stay in the loop</p>
            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
            />
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                placeholder="you@store.com"
                className="w-full max-w-[220px] rounded-lg border border-slate/20 bg-mist px-3 py-2 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-white focus:outline-none focus:ring-2 focus:ring-brass/30 dark:focus:bg-[#1B2436]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-lg bg-brass px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-oxblood disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {status === "success" && (
              <p className="mt-2 text-xs text-emerald-600">You&apos;re in! We&apos;ll keep you posted.</p>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-red-600">Something went wrong — try again.</p>
            )}
          </form>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate">
          <Link href="/" className="hover:text-ink">Home</Link>
          <Link href="/#how-it-works" className="hover:text-ink">How it works</Link>
          <Link href="/#pricing" className="hover:text-ink">Pricing</Link>
          <Link href="/#faq" className="hover:text-ink">FAQ</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <Link href="/affiliate" className="hover:text-ink">Affiliate</Link>
          <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink">Terms of Service</Link>
        </nav>

        <div className="md:text-right">
          <p className="font-display font-bold text-2xl text-ink">Your inbox, handled.</p>
          <p className="mt-3 text-sm text-slate">Kind regards, Kim</p>
          <p className="mt-6 text-sm text-slate/60">&copy; RegardsKim 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
