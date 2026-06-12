"use client";

import { Check, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type PricingProps = {
  copy?: HomeCopy["pricing"];
};

export default function Pricing({ copy = enHomeCopy.pricing }: PricingProps) {
  return (
    <section id="pricing" className="bg-mist dark:bg-paper py-16 md:py-28">
      <div className="section-shell text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-6xl">
            {copy.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate md:text-lg">
            {copy.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-10 grid w-full max-w-5xl gap-6 text-left lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-slate/12 bg-white p-5 shadow-[0_10px_28px_rgba(35,53,71,0.18),0_2px_6px_rgba(35,53,71,0.10)] dark:border-slate/20 dark:bg-[#1D2840] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_2px_6px_rgba(0,0,0,0.2)] md:rounded-[2rem] md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-slate">{copy.planName}</p>
          <div className="mt-4 flex items-end gap-2 text-ink">
            <span className="font-display font-bold text-5xl leading-none sm:text-6xl md:text-7xl">{copy.price}</span>
            <span className="mb-1.5 text-sm text-slate sm:mb-2 sm:text-base">{copy.period}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-brass/12 px-2.5 py-0.5 text-xs font-semibold text-brass">{copy.rateBadge}</span>
          </div>
          <p className="mt-1 text-xs text-slate">{copy.billingNote}</p>

          <ul className="mt-6 space-y-3 md:mt-8">
            {copy.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate md:text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
            {copy.cta}
          </a>

            <div className="mt-5 flex flex-wrap gap-2">
              {copy.reassurance.map((item) => (
                <span key={item} className="rounded-full border border-[#E3D3C6] bg-[#FFF9F3] px-3 py-1.5 text-xs font-bold text-slate dark:border-slate/15 dark:bg-[#20283A]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-brass/20 bg-white p-5 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:border-slate/20 dark:bg-[#1D2840] md:rounded-[2rem] md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brass/10 text-brass">
              <ShieldCheck size={24} />
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold text-ink">{copy.explainerHeading}</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate md:text-base">
              {copy.explainerParagraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === copy.explainerParagraphs.length - 1 ? "font-semibold text-ink" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.09}>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate">
            {copy.finalNote}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
