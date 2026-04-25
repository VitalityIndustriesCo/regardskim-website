"use client";

import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const CTA_URL = "/founding";

const inclusions = [
  "Connects to your Shopify store and Gmail",
  "Drafts replies using live order and tracking data",
  "Handles order questions, returns, and shipping updates",
  "You review every reply before it sends",
  "Invite your team with separate logins",
];

export default function Pricing() {
  const price = 49;
  const period = "/month";
  const billingNote = "Billed monthly through your Shopify account";

  return (
    <section id="pricing" className="bg-forest py-16 md:py-28">
      <div className="section-shell text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-6xl">
            Pricing
          </h2>
          <p className="mt-4 text-base text-slate md:text-lg">
            You handle the sales. Regards Kim handles the support.
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brass">
            Simple monthly pricing
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-10 w-full max-w-md rounded-[1.5rem] border border-mist bg-cream p-5 text-left md:rounded-[2rem] md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-slate">Regards Kim</p>
          <div className="mt-4 flex items-end gap-2 text-ink">
            <span className="font-display font-bold text-5xl leading-none sm:text-6xl md:text-7xl">${price}</span>
            <span className="mb-1.5 text-sm text-slate sm:mb-2 sm:text-base">{period}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-slate line-through">$98/month</span>
            <span className="rounded-full bg-brass/15 px-2.5 py-0.5 text-xs font-semibold text-brass">50% off — forever</span>
          </div>
          <p className="mt-1 text-xs text-slate">{billingNote}</p>

          <ul className="mt-6 space-y-3 md:mt-8">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate md:text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-brass" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a href={CTA_URL} className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
            Lock in your spot
          </a>
        </FadeIn>

        <FadeIn delay={0.09}>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate">
            Starting with a 7-day free trial
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
