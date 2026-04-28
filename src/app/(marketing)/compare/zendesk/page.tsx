import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Zendesk",
  description:
    "Compare RegardsKim and Zendesk for Shopify support. See where Zendesk is better for complex teams and where RegardsKim wins on price, speed, and simplicity.",
  path: "/compare/zendesk",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Per-agent pricing that climbs quickly as your team grows",
  },
  {
    label: "Best for",
    kim: "Shopify stores that want practical email support help right away",
    competitor: "Businesses needing a broad enterprise-style customer service platform",
  },
  {
    label: "Setup time",
    kim: "Short setup with Shopify and inbox connection",
    competitor: "Longer rollout with views, triggers, macros, agents, and processes",
  },
  {
    label: "Daily workflow",
    kim: "Review AI drafts and keep moving",
    competitor: "Operate inside a full ticketing and agent workspace",
  },
  {
    label: "24/7 help",
    kim: "Always drafting replies in the background",
    competitor: "Depends on configured automation and human coverage",
  },
  {
    label: "Where it is stronger",
    kim: "Low cost, ease of use, Shopify email support focus",
    competitor: "Complex support operations, reporting, admin controls, channel depth",
  },
];

export default function RegardsKimVsZendeskPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Zendesk",
    url: absoluteUrl("/compare/zendesk"),
    description: "Compare RegardsKim and Zendesk for Shopify support.",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
      },
    },
  };

  return (
    <main className="bg-paper">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Comparison</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            RegardsKim vs Zendesk
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            Zendesk is one of the best-known customer support platforms in the world. RegardsKim is much
            narrower on purpose. It is built for Shopify merchants who mainly want help handling customer
            emails without adding more software overhead.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Zendesk</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 border-b border-slate/10 dark:border-slate/20 last:border-b-0 sm:grid-cols-3">
              <div className="p-4 font-medium text-ink">{row.label}</div>
              <div className="border-t border-slate/10 dark:border-slate/20 p-4 text-slate sm:border-l sm:border-t-0">{row.kim}</div>
              <div className="border-t border-slate/10 dark:border-slate/20 p-4 text-slate sm:border-l sm:border-t-0">{row.competitor}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where RegardsKim wins</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                For a small store, the biggest win is not having to become a help desk admin just to answer
                support emails well. RegardsKim is lighter, cheaper, and easier to get value from quickly.
              </p>
              <p>
                It is also a better fit when your support issues are mostly Shopify-specific. Things like
                tracking questions, returns, order edits, and refund requests benefit from store-aware drafts,
                not a generic ticket queue.
              </p>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where Zendesk is stronger</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Zendesk is stronger if you need a real service operation. It has deeper reporting, broader
                channel support, stronger admin controls, and better structure for large teams.
              </p>
              <p>
                If your business already runs with dedicated agents, escalations, SLAs, and lots of internal
                routing rules, Zendesk gives you more room to build all of that properly.
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            This comparison really comes down to complexity. Zendesk is excellent, but it is often more than a
            Shopify founder needs. You can end up paying for structure, seats, and process before you actually
            need them.
          </p>
          <p>
            If you are still mapping the category, our <Link href="/blog/best-shopify-customer-service-apps-2026" className="font-medium text-brass hover:text-oxblood">roundup of Shopify customer service apps</Link> is a good companion read.
          </p>
          <p>
            RegardsKim makes more sense if support is still close to the founder, the inbox is mostly email,
            and the goal is to reply faster without sacrificing accuracy. That is especially true when you look
            at cost. At <strong>$49/month</strong>, it is easy to justify against the hours spent manually
            answering the same kinds of questions every week. Our <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> makes that comparison concrete.
          </p>
          <p>
            So if you are building a support department, Zendesk is the stronger platform. If you are trying to
            stop support from becoming a second full-time job, RegardsKim is usually the better fit.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Keep support simple while you grow</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If you want Shopify-aware email support without the weight of a full service stack, RegardsKim is a
            strong place to start.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
