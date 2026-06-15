import type { Metadata } from "next";
import Link from "next/link";

import FadeIn from "@/components/ui/FadeIn";
import HeroLoopVideo from "@/components/sections/HeroLoopVideo";
import GettingStarted from "@/components/sections/GettingStarted";
import FinalCTA from "@/components/sections/FinalCTA";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Demo - Shopify Support Email Drafted From Order Context",
  description:
    "Watch Regards Kim match a customer email to the Shopify order, draft from real order context, and leave the reply ready for you to review and send from Gmail.",
  path: "/demo",
});

const moments = [
  {
    time: "0:00",
    title: "The priority queue opens",
    body: "Regards Kim shows the customer emails that need attention first, with separate views for messages that can wait and shipping address issues.",
  },
  {
    time: "0:24",
    title: "Store notifications are cleared out",
    body: "Automatic store emails are filtered away so the inbox stays focused on real customer support work.",
  },
  {
    time: "0:42",
    title: "The order context is already attached",
    body: "Open a customer email and the Shopify order, customer details, fulfillment state, and tracking context are there beside the conversation.",
  },
  {
    time: "1:03",
    title: "Replies stay merchant-approved",
    body: "Suggest Reply drafts from the real order, saved replies fill reusable answers with placeholders, and address confirmations can be sent for flagged orders.",
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
              Watch a Shopify support email become a ready-to-review reply.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate md:text-lg">
              This is the whole loop: a customer email arrives in Gmail, Regards Kim matches the Shopify order,
              you draft from real store context, and you decide what gets sent.
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="py-8 md:py-12">
            <HeroLoopVideo
              ariaLabel="Regards Kim full product demo showing priority buckets, automatic notification filtering, order context, AI reply suggestions, saved replies, and address issue workflows."
              autoPlay={false}
              controls
              loop={false}
              muted={false}
              mp4Src="/media/regards-kim-demo.mp4"
              webmSrc=""
            />
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
              Want to see it with your own Shopify orders and Gmail inbox? That&apos;s what the free trial is for.
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
