import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Richpanel",
  description:
    "Compare RegardsKim and Richpanel for ecommerce support. See where Richpanel is stronger on self-service portals and where RegardsKim wins on Shopify-aware email replies auto-drafted from order data.",
  path: "/compare/richpanel",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Higher pricing tied to support platform features",
  },
  {
    label: "Best for",
    kim: "Stores that want email replies auto-drafted from Shopify order context",
    competitor: "Brands investing in self-service and a customer portal experience",
  },
  {
    label: "Setup time",
    kim: "Quick setup with Shopify and inbox",
    competitor: "More time configuring portal flows, self-service, and support operations",
  },
  {
    label: "Core strength",
    kim: "Email replies auto-drafted from Shopify order, tracking, and policy context",
    competitor: "Self-service portal and customer-facing dashboard experience",
  },
  {
    label: "Complexity",
    kim: "Simple and lightweight",
    competitor: "Broader and more system-heavy",
  },
  {
    label: "Where it is stronger",
    kim: "Price, Shopify order context, approve-first email replies",
    competitor: "Self-service experiences and customer portal tooling",
  },
];

const pros = {
  kim: [
    "Auto-drafts replies from real Shopify order and tracking data, not generic templates",
    "Keeps Gmail in place and the workflow lightweight for small teams",
    "Good fit when tracking, returns, refunds, and order changes dominate the inbox",
    "No customer portal needed — value starts with the first matched email",
  ],
  competitor: [
    "Better if reducing tickets through self-service is a major goal",
    "Customer-facing dashboard and portal can improve the post-purchase experience",
    "More platform depth if you want customers to solve more themselves",
  ],
};

export default function RegardsKimVsRichpanelPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Richpanel",
    url: absoluteUrl("/compare/richpanel"),
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
    <main className="bg-paper">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Comparison</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            RegardsKim vs Richpanel
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            Richpanel is more ambitious as a support platform. RegardsKim is deliberately narrower. It focuses on
            helping Shopify stores draft email replies from real order context without forcing a bigger support
            system around the problem.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_10px_26px_rgba(35,53,71,0.16),0_2px_6px_rgba(35,53,71,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Richpanel</div>
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
          <article className="rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_10px_26px_rgba(35,53,71,0.15),0_2px_6px_rgba(35,53,71,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where RegardsKim wins</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.kim.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where Richpanel is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Richpanel is attractive if your support strategy is moving toward self-service. Giving customers a
            portal to check status, manage issues, and avoid sending tickets at all can be powerful at scale.
          </p>
          <p>
            But if you are still in the stage where the founder or a small team is mostly battling the inbox,
            that extra system can feel like more machinery than you need. A customer portal is useful, but it is
            not always the fastest path to relief.
          </p>
          <p>
            RegardsKim is stronger when you want the simplest solution to the most common problem: too many repeat
            support emails. It is cheaper, faster to set up, and focused on giving you Shopify context and AI
            helpers in the inbox. Our <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> is a quick way to compare that against the time you are already spending.
          </p>
          <p>
            So if your roadmap includes heavy self-service, Richpanel has the edge. If you want immediate help on
            email without a more complex support platform, RegardsKim is the cleaner fit.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_10px_26px_rgba(35,53,71,0.15),0_2px_6px_rgba(35,53,71,0.08)]">
          <h2 className="font-display text-3xl font-bold text-ink">Simple beats sprawling for many stores</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If your support pain is mostly email, RegardsKim gets to the point faster.
          </p>
          <Link href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
