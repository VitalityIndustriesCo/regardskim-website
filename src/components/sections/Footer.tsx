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
    <footer className="border-t border-forest/10 bg-white py-12">
      <div className="section-shell grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <p className="font-display font-bold text-2xl text-forest">RegardsKim</p>
          <p className="mt-3 text-sm text-slate">Customer email support for ecommerce stores.</p>

          <form onSubmit={handleSubscribe} className="mt-6">
            <p className="text-sm font-medium text-forest mb-2">Stay in the loop</p>
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
                className="w-full max-w-[220px] rounded-lg border border-forest/15 bg-cream/50 px-3 py-2 text-sm text-forest placeholder:text-slate/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/30"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest/90 disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {status === "success" && (
              <p className="mt-2 text-xs text-green-700">You&apos;re in! We&apos;ll keep you posted.</p>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-red-600">Something went wrong — try again.</p>
            )}
          </form>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate">
          <Link href="/" className="hover:text-forest">Home</Link>
          <Link href="/#how-it-works" className="hover:text-forest">How it works</Link>
          <Link href="/#pricing" className="hover:text-forest">Pricing</Link>
          <Link href="/#faq" className="hover:text-forest">FAQ</Link>
          <Link href="/about" className="hover:text-forest">About</Link>
          <Link href="/blog" className="hover:text-forest">Blog</Link>
          <Link href="/affiliate" className="hover:text-forest">Affiliate</Link>
          <Link href="/privacy" className="hover:text-forest">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-forest">Terms of Service</Link>
        </nav>

        <div className="md:text-right">
          <p className="font-display font-bold text-2xl text-forest">Your inbox, handled.</p>
          <p className="mt-3 text-sm text-slate">Kind regards, Kim</p>
          <p className="mt-6 text-sm text-slate/80">&copy; RegardsKim 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
