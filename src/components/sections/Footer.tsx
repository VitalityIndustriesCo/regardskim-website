"use client";

import Link from "next/link";
import { useState } from "react";

const mainColumns = [
  {
    title: "Get Started",
    links: [
      { href: "/#install", label: "Install on Shopify" },
      { href: "/pricing", label: "Pricing" },
      { href: "/founding", label: "Founding 100" },
    ],
  },
  {
    title: "How It Works",
    links: [
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { href: "/compare/gorgias", label: "Kim vs Gorgias" },
      { href: "/compare/zendesk", label: "Kim vs Zendesk" },
      { href: "/compare/tidio", label: "Kim vs Tidio" },
      { href: "/compare/reamaze", label: "Kim vs Reamaze" },
      { href: "/compare/richpanel", label: "Kim vs Richpanel" },
      { href: "/compare/freshdesk", label: "Kim vs Freshdesk" },
      { href: "/compare/hiring-staff", label: "Kim vs Hiring Staff" },
      { href: "/compare/va", label: "Kim vs Hiring a VA" },
      { href: "/compare/diy", label: "Kim vs Doing It Yourself" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { href: "/tools/ai-email-response-generator", label: "AI Email Response Generator" },
      { href: "/tools/return-policy-generator", label: "Return Policy Generator" },
      { href: "/tools/cs-email-templates", label: "CS Email Templates" },
      { href: "/tools/support-cost-calculator", label: "Support Cost Calculator" },
      { href: "/tools/ai-tone-rewriter", label: "AI Tone Rewriter" },
    ],
  },
] as const;

const secondaryColumns = [
  {
    title: "Company",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/affiliate", label: "Affiliate Program" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/tools/support-cost-calculator", label: "Support Cost Calc" },
      { href: "/tools/cs-email-templates", label: "CS Email Templates" },
      { href: "/blog", label: "Blog" },
    ],
  },
] as const;

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
    <footer className="border-t border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] py-12 dark:bg-[#20283A]">
      <div className="section-shell">
        {/* Top row: brand/subscribe + main 4 columns */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
          <div>
            <p className="font-display text-2xl font-bold text-ink">RegardsKim</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate">
              Customer email support for ecommerce stores.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <p className="mb-2 text-sm font-medium text-ink">Stay in the loop</p>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="you@store.com"
                  className="w-full rounded-lg border border-slate/20 bg-mist dark:bg-[#1B2436] px-3 py-2 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30 dark:focus:bg-[#1B2436]"
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

            {/* Company + Resources tucked under subscribe */}
            <div className="mt-8 grid grid-cols-2 gap-8">
              {secondaryColumns.map((column) => (
                <div key={column.title}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">{column.title}</p>
                  <div className="mt-4 space-y-3 text-[0.9375rem] leading-6 text-slate">
                    {column.links.map((link) => (
                      <Link key={link.href + link.label} href={link.href} className="block hover:text-ink">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 xl:grid-cols-4">
            {mainColumns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate/70">{column.title}</p>
                <div className="mt-4 space-y-3 text-[0.9375rem] leading-6 text-slate">
                  {column.links.map((link) => (
                    <Link key={link.href + link.label} href={link.href} className="block hover:text-ink">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate/10 dark:border-slate/20 pt-6 text-sm text-slate/70 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-ink">Your inbox, handled.</p>
            <p className="mt-1 text-sm text-slate">Kind regards, Kim</p>
          </div>
          <p>&copy; RegardsKim 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
