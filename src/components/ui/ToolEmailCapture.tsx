"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

type Props = {
  heading?: string;
  sub?: string;
};

export default function ToolEmailCapture({
  heading = "Get more like this",
  sub = "One short email a week on handling Shopify support faster — templates, playbooks, and what's working for other stores. No spam, unsubscribe anytime.",
}: Props) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending" || state === "done") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="mx-auto mt-12 max-w-2xl rounded-3xl border border-brass/20 bg-white p-7 text-center shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:border-slate/15 dark:bg-[#20283A] md:p-8">
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brass/10 text-brass">
        <Mail size={21} />
      </div>
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{heading}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate">{sub}</p>

      {state === "done" ? (
        <p className="mt-6 text-sm font-bold text-emerald-700 dark:text-emerald-400">
          You&apos;re in. Check your inbox soon.
        </p>
      ) : (
        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourstore.com"
            className="w-full flex-1 rounded-full border border-[#E3D3C6] bg-[#FFF9F3] px-5 py-3 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-brass dark:border-slate/20 dark:bg-[#111625]"
            aria-label="Email address"
          />
          {/* Honeypot — hidden from humans */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn-primary shrink-0 disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Send it"}
          </button>
        </form>
      )}
      {state === "error" ? (
        <p className="mt-3 text-xs font-semibold text-red-600">Something went wrong — try again in a minute.</p>
      ) : null}
    </section>
  );
}
