"use client";

import { useState } from "react";
import Image from "next/image";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function AffiliatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          website: website.trim(),
          message: message.trim(),
          honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setWebsite("");
        setMessage("");
        setHoneypot("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main>
      <section className="paper-grain bg-cream py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-normal text-forest md:text-7xl">
              Earn with Regards Kim
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate md:text-lg">
              Recommend the tool you trust. Earn recurring commission on every merchant you refer.
            </p>
            <div className="mt-8">
              <Image src="/affiliate-hero.jpg" alt="Affiliate program" width={640} height={320} className="mx-auto rounded-2xl shadow-lg" style={{ maxHeight: 320 }} />
            </div>
            <div className="mt-10">
              <a href="#apply" className="btn-primary">
                Become an affiliate
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-forest">Recurring commission</h2>
              <p className="mt-3 text-sm text-slate md:text-base">
                Earn 20% of every referral&apos;s subscription, every month, for as long as they stay.
              </p>
            </article>
            <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-forest">Easy to recommend</h2>
              <p className="mt-3 text-sm text-slate md:text-base">
                Regards Kim sells itself — 7-day free trial, no setup friction, real results from day one.
              </p>
            </article>
            <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-forest">We support you</h2>
              <p className="mt-3 text-sm text-slate md:text-base">
                Need assets, landing pages, or custom links? We&apos;ll help you promote effectively.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="apply" className="bg-mist py-16 md:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl rounded-3xl border border-forest/10 bg-white p-6 shadow-sm md:p-10">
            <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">Partner application</h2>
            <p className="mt-3 text-sm text-slate md:text-base">
              Tell us a little about you and how you&apos;d like to promote Regards Kim.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-forest">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="w-full rounded-xl border border-forest/15 bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-slate/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/30"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="w-full rounded-xl border border-forest/15 bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-slate/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/30"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-forest">
                  Website/Social URL (optional)
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="w-full rounded-xl border border-forest/15 bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-slate/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/30"
                  placeholder="https://"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-forest">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="w-full rounded-xl border border-forest/15 bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-slate/50 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/30"
                  placeholder="Anything we should know?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Apply to become an affiliate"}
              </button>

              {status === "success" && <p className="text-sm text-green-700">Thanks for applying! We&apos;ll be in touch soon.</p>}
              {status === "error" && (
                <p className="text-sm text-red-600">Something went wrong — please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
