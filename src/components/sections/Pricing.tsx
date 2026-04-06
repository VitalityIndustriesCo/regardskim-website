"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "/signup";

const inclusions = [
  "Integrates with Shopify, Gmail & Outlook",
  "Draft replies for customer emails",
  "Order, tracking & return support",
  "Review before anything sends",
  "Invite your team with separate logins",
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const price = annual ? 37 : 49;
  const period = annual ? "/month" : "/month";
  const billingNote = annual ? "Billed annually" : "Billed monthly";

  return (
    <section id="pricing" className="bg-paper py-16 md:py-28">
      <div className="section-shell text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-forest md:text-6xl">
            Pricing
          </h2>
          <p className="mt-4 text-base text-slate md:text-lg">
            You handle the sales. Kim handles the support.
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate">
            Starting with a 7-day free trial
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brass">
            Save up to 25% with annual
          </p>
        </FadeIn>

        {/* Annual / Monthly toggle */}
        <FadeIn delay={0.03} className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${!annual ? "text-forest" : "text-slate"}`}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              annual ? "bg-brass" : "bg-brass/25"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                annual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-semibold ${annual ? "text-forest" : "text-slate"}`}>
            Annual
          </span>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-10 w-full max-w-md rounded-[2rem] border border-forest/15 bg-paper p-8 text-left md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-slate">RegardsKim</p>
          <div className="mt-4 flex items-end gap-2 text-forest">
            <span className="font-display font-bold text-7xl leading-none">${price}</span>
            <span className="mb-2 text-slate">{period}</span>
          </div>
          <p className="mt-1 text-xs text-slate">{billingNote}</p>

          <ul className="mt-8 space-y-3">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate md:text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-brass" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a href={DASHBOARD_URL} className="btn-primary mt-8 inline-flex">
            Get started for free
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
