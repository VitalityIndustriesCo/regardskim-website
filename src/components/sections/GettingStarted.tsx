"use client";

import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import { Inbox, ShieldCheck } from "lucide-react";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

const icons = [
  <ShopifyLogo key="shopify" className="h-10 w-10" />,
  <GmailLogo key="gmail" className="h-10 w-10" />,
  <ShieldCheck key="shield" size={40} className="h-10 w-10" />,
  <Inbox key="inbox" size={40} className="h-10 w-10" />,
];

type GettingStartedProps = {
  copy?: HomeCopy["gettingStarted"];
};

export default function GettingStarted({ copy = enHomeCopy.gettingStarted }: GettingStartedProps) {
  return (
    <section id="install" className="bg-mist dark:bg-paper py-20 md:py-28">
      <div className="section-shell">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink md:text-6xl">
            {copy.heading}
          </h2>
        </FadeIn>

        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate md:text-lg">
          {copy.body}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.08}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-slate/10 bg-white p-5 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#1D2840] dark:border-slate/20 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.2)] md:flex-col md:items-start md:p-6">
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-display text-sm font-bold text-brass">{step.number}</span>
                  <div className="rounded-lg bg-brass/10 p-3 text-brass md:p-4">{icons[index]}</div>
                </div>
                <h3 className="font-display text-lg font-bold text-ink md:mt-4 md:text-xl">{step.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
