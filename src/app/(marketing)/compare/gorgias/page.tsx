import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Gorgias",
  description:
    "An honest look at RegardsKim vs Gorgias for Shopify support, including price, setup time, automation, and where each tool fits best.",
  path: "/compare/gorgias",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Typically much higher once you add seats and automation",
  },
  {
    label: "Best for",
    kim: "Shopify stores that want fast email support help without a big setup",
    competitor: "Larger support teams managing multiple channels and agents",
  },
  {
    label: "Setup time",
    kim: "Quick Shopify + inbox connection",
    competitor: "More configuration, workflows, macros, routing, and training",
  },
  {
    label: "Support style",
    kim: "Drafts accurate replies using Shopify context",
    competitor: "Full help desk built around tickets and team workflows",
  },
  {
    label: "24/7 coverage",
    kim: "Yes, drafts keep moving even when you are offline",
    competitor: "Possible, but usually depends on team coverage and setup",
  },
  {
    label: "Where it is stronger",
    kim: "Price, simplicity, speed to value",
    competitor: "Team management, omnichannel support, advanced support ops",
  },
];

const pros = {
  kim: [
    "Much lower monthly cost for small stores",
    "Fast to set up if your main pain is customer emails",
    "Built around Shopify support questions like tracking, returns, and order changes",
    "Useful for founders who still want approval before replies go out",
  ],
  competitor: [
    "Better for bigger support teams with multiple agents",
    "Stronger ticketing, routing, and multi-channel workflows",
    "More mature if you need a full support platform, not just better email handling",
  ],
};

export default function RegardsKimVsGorgiasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Gorgias",
    url: absoluteUrl("/compare/gorgias"),
    description: metadata.description,
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
    <main className="bg-paper dark:bg-[#151C2C]">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Comparison</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            RegardsKim vs Gorgias
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            If you run a Shopify store, these two tools solve different versions of the same problem.
            Gorgias is a full support platform. RegardsKim is a simpler, lower-cost way to handle the
            repetitive customer emails that usually eat your day.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Gorgias</div>
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
            <ul className="mt-5 space-y-3 text-slate">
              {pros.kim.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where Gorgias is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Here is the honest version: if you have three support agents, live chat, social DMs, phone, and
            a real ticketing operation, Gorgias probably makes more sense. It was built for that world.
          </p>
          <p>
            If you want more context on the tool landscape first, our <Link href="/blog/best-shopify-customer-service-apps-2026" className="font-medium text-brass hover:text-oxblood">best Shopify customer service apps guide</Link> gives the broader picture.
          </p>
          <p>
            But a lot of Shopify stores are not there. They are founder-led, lean, and mostly dealing with
            email questions like tracking, returns, refunds, and product follow-ups. In that setup, Gorgias
            can feel like buying a whole support department when what you really need is help clearing the
            inbox without losing quality.
          </p>
          <p>
            RegardsKim is stronger when you want speed, simplicity, and a price that makes sense early. At
            <strong> $49/month</strong>, it is often cheaper than one missed hour of founder time each week.
            It plugs into your Shopify store, uses real order and tracking context, and drafts replies you can
            approve fast. If you want to sanity-check that math for your own store, try the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link>.
          </p>
          <p>
            That does not make it a universal winner. It just makes it a better fit for stores that do not
            need the weight of a full help desk yet.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Best for small Shopify teams</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If your biggest support problem is repetitive email, not managing a full team, RegardsKim is the
            lighter and cheaper option.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
