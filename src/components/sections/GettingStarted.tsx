"use client";

import FadeIn from "@/components/ui/FadeIn";
import { Store, Mail, ClipboardList, Inbox } from "lucide-react";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const steps = [
  {
    num: "01",
    icon: Store,
    title: "Install the app",
    body: "Connect your Shopify store in one click.",
  },
  {
    num: "02",
    icon: Mail,
    title: "Connect Gmail or Outlook",
    body: "Authorise your support inbox and Kim starts reading immediately.",
  },
  {
    num: "03",
    icon: ClipboardList,
    title: "Set your policies",
    body: "Refund window, processing time, return address — Kim uses these to draft accurate replies.",
  },
  {
    num: "04",
    icon: Inbox,
    title: "Open your inbox",
    body: "By the time you're done, Kim already has drafts waiting.",
  },
];

export default function GettingStarted() {
  return (
    <section id="getting-started" className="py-20 md:py-28">
      <div className="section-shell">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            Getting Started
          </p>
          <h2 className="mt-4 font-display font-bold text-4xl tracking-normal text-forest md:text-6xl">
            Up and running in minutes
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-brass">
                      {step.num}
                    </span>
                    <div className="rounded-lg bg-mist p-2 text-forest">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Get started with Shopify
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
