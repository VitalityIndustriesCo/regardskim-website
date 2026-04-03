"use client";

import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo, OutlookLogo } from "@/components/ui/BrandLogos";
import { ClipboardList, Inbox, UserPen } from "lucide-react";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Step 01 — Sign up */}
          <FadeIn delay={0}>
            <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-brass">01</span>
                <div className="rounded-lg bg-mist p-2 text-forest">
                  <Inbox size={18} />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-forest">
                Create your account
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Sign up at RegardsKim and start your setup in seconds.
              </p>
            </div>
          </FadeIn>

          {/* Step 02 — Connect store */}
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-brass">02</span>
                <ShopifyLogo className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-forest">
                Connect your store
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Shopify today — WooCommerce and more coming soon.
              </p>
            </div>
          </FadeIn>

          {/* Step 03 — Connect email */}
          <FadeIn delay={0.16}>
            <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-brass">03</span>
                <GmailLogo className="h-7 w-7" />
                <OutlookLogo className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-forest">
                Connect your email
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Authorise Gmail or Outlook and Kim starts reading immediately.
              </p>
            </div>
          </FadeIn>

          {/* Step 04 — Personalise */}
          <FadeIn delay={0.24}>
            <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-brass">04</span>
                <div className="rounded-lg bg-mist p-2 text-forest">
                  <UserPen size={18} />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-forest">
                Make Kim yours
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Set your policies, choose your agent&apos;s name, and add your email signature.
              </p>
            </div>
          </FadeIn>

          {/* Step 05 — Go */}
          <FadeIn delay={0.32}>
            <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-brass">05</span>
                <div className="rounded-lg bg-mist p-2 text-forest">
                  <ClipboardList size={18} />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-forest">
                Open your inbox
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                By the time you&apos;re done, Kim already has drafts waiting.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 text-center">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Create your account
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
