import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Freshdesk",
  description:
    "Compare RegardsKim and Freshdesk for Shopify support. See where Freshdesk is stronger for enterprise service teams and where Kim wins on Shopify-native email support.",
  path: "/compare/freshdesk",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Per-agent pricing with broader enterprise support features",
  },
  {
    label: "Best for",
    kim: "Shopify brands that want simpler email support help",
    competitor: "Teams needing enterprise-style ticketing and multi-channel service",
  },
  {
    label: "Setup time",
    kim: "Quick Shopify + inbox connection",
    competitor: "More setup for agents, automations, channels, and service workflows",
  },
  {
    label: "Core strength",
    kim: "Shopify-native email support automation",
    competitor: "Enterprise ticketing, phone support, and broad customer service tooling",
  },
  {
    label: "Shopify fit",
    kim: "Purpose-built for Shopify support flows",
    competitor: "General support platform rather than Shopify-specific",
  },
  {
    label: "Where it is stronger",
    kim: "Price, Shopify focus, simple setup",
    competitor: "Enterprise features, multi-channel service, phone support",
  },
];

const pros = {
  kim: [
    "Built around Shopify support questions instead of generic ticket workflows",
    "Much easier to set up if your support is mostly email",
    "Lower cost for small stores and lean teams",
    "No need to manage a full enterprise-style service desk",
  ],
  competitor: [
    "Better if you need advanced ticketing, phone support, and admin controls",
    "More suitable for larger teams working across multiple customer channels",
    "Stronger fit for formal service operations with deeper reporting needs",
  ],
};

export default function RegardsKimVsFreshdeskPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Freshdesk",
    url: absoluteUrl("/compare/freshdesk"),
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
            RegardsKim vs Freshdesk
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            Freshdesk is a broad customer service platform. RegardsKim is much more focused. It is designed for
            Shopify merchants who want faster, more accurate email support without the complexity of a full service desk.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Freshdesk</div>
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
            <h2 className="font-display text-2xl font-bold text-ink">Where Freshdesk is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Freshdesk is built for organisations that need a formal service layer: agents, queues, channels,
            ticket rules, reporting, and often phone support too. If that is your world, it has a lot going for it.
          </p>
          <p>
            The problem is that many Shopify merchants do not actually need enterprise service software. They need
            help answering the same types of customer emails quickly and accurately without creating more operational
            drag.
          </p>
          <p>
            RegardsKim fits that use case better. It plugs into Shopify, understands order context, and focuses on
            the inbox. That makes it easier to adopt, easier to justify, and easier to keep using. If you want to
            pressure-test the economics, the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> is a good place to start.
          </p>
          <p>
            So the honest answer is simple: Freshdesk is stronger for enterprise-style support operations. RegardsKim
            is stronger for Shopify stores that want support help without enterprise overhead.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Shopify-native beats generic for many teams</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If your support world revolves around Shopify orders and customer emails, Regards Kim is the more focused fit.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
