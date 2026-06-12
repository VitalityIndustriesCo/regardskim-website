import type { Metadata } from "next";
import Link from "next/link";

import FadeIn from "@/components/ui/FadeIn";
import HeroLoopVideo from "@/components/sections/HeroLoopVideo";
import GettingStarted from "@/components/sections/GettingStarted";
import FinalCTA from "@/components/sections/FinalCTA";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Demo - See Regards Kim Handle a Support Email",
  description:
    "Watch Regards Kim sort a Shopify support inbox, match a customer email to the order, and draft the reply — ready for you to review and send from Gmail.",
  path: "/demo",
});

const moments = [
  {
    time: "0:00",
    title: "The email arrives",
    body: "A customer asks where their order is. Regards Kim has already sorted it into Needs reply and tagged it as a tracking question — while the junk went straight to No reply needed.",
  },
  {
    time: "0:02",
    title: "The order is matched",
    body: "No searching. The Shopify order, fulfillment status, carrier, and tracking number are already attached to the conversation.",
  },
  {
    time: "0:04",
    title: "The reply writes itself",
    body: "A draft grounded in the real order — not a generic template. Real tracking number, real carrier, your tone.",
  },
  {
    time: "0:07",
    title: "You press send",
    body: "Review it, tweak a word if you like, and send from Gmail. Nothing ever goes out without you.",
  },
];

export default function DemoPage() {
  return (
    <main className="bg-paper">
      <section className="paper-grain relative overflow-hidden">
        <div className="section-shell relative">
          <FadeIn className="mx-auto max-w-3xl pt-12 text-center md:pt-20">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brass">Demo</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-ink md:text-6xl">
              Watch a support email answer itself.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate md:text-lg">
              This is the whole loop: a customer email arrives, Regards Kim matches the Shopify order and drafts the
              reply, and you press send. About forty seconds of your day.
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="py-8 md:py-12">
            <HeroLoopVideo />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#FFF9F3] py-16 dark:bg-[#090C14] md:py-24">
        <div className="section-shell">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
              What you just watched
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {moments.map((moment, idx) => (
              <FadeIn key={moment.title} delay={idx * 0.05}>
                <article className="h-full rounded-3xl border border-[#E3D3C6] bg-white p-7 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:border-slate/15 dark:bg-[#20283A]">
                  <span className="inline-flex rounded-full bg-[#FFF0ED] px-3 py-1 text-xs font-bold tracking-[0.1em] text-brass dark:bg-[#312D2F]">
                    {moment.time}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate md:text-base">{moment.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 text-center">
            <p className="text-base font-semibold text-ink">
              Want to see it on your own inbox? That&apos;s what the free trial is for.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary">
                Install free on Shopify
              </a>
              <Link href="/security" className="btn-secondary">
                Read Security &amp; Data first
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <GettingStarted />
      <FinalCTA />
    </main>
  );
}
