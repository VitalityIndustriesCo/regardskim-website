"use client";

import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import { Inbox, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect your Shopify store",
    icon: <ShopifyLogo className="h-10 w-10" />,
  },
  {
    number: "02",
    title: "Connect your email",
    icon: <GmailLogo className="h-10 w-10" />,
  },
  {
    number: "03",
    title: "Confirm your store policies",
    icon: <ShieldCheck size={40} className="h-10 w-10" />,
  },
  {
    number: "04",
    title: "Start reviewing your drafted replies",
    icon: <Inbox size={40} className="h-10 w-10" />,
  },
];

export default function GettingStarted() {
  return (
    <section id="getting-started" className="bg-paper py-20 md:py-28">
      <div className="section-shell">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">Getting Started</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-forest md:text-6xl">
            Up and running in minutes
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-brass">{step.number}</span>
                  <div className="rounded-lg bg-mist p-4 text-forest">{step.icon}</div>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-forest">{step.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
