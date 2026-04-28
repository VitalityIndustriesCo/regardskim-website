import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Hiring a Virtual Assistant",
  description:
    "Compare RegardsKim with hiring a virtual assistant for Shopify support. See the tradeoffs on price, coverage, training, and flexibility.",
  path: "/compare/va",
});

const comparisonRows = [
  {
    label: "Monthly cost",
    kim: "$49/month",
    competitor: "Usually hundreds to thousands per month depending on hours and experience",
  },
  {
    label: "Setup",
    kim: "Connect Shopify and inbox",
    competitor: "Recruiting, onboarding, training, documentation, supervision",
  },
  {
    label: "Availability",
    kim: "Always on",
    competitor: "Depends on shifts, timezone, and contracted hours",
  },
  {
    label: "Consistency",
    kim: "Same process every time, based on store data and policies",
    competitor: "Depends on training quality and the person you hire",
  },
  {
    label: "Best at",
    kim: "Repeatable support emails and fast drafting",
    competitor: "Nuanced human judgment, relationship handling, edge cases",
  },
  {
    label: "Where it is stronger",
    kim: "Price, speed, 24/7 support help",
    competitor: "Human empathy, custom judgment, cross-functional help",
  },
];

export default function RegardsKimVsVirtualAssistantPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Hiring a Virtual Assistant",
    url: absoluteUrl("/compare/va"),
    description: "Compare RegardsKim with hiring a virtual assistant for Shopify support.",
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
            RegardsKim vs Hiring a Virtual Assistant
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            This one is more personal than software comparisons. A good virtual assistant can be amazing. But
            hiring one costs real money, takes real management, and still does not give you round-the-clock
            coverage by default.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Virtual assistant</div>
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
                The obvious win is price. At <strong>$49/month</strong>, RegardsKim costs a fraction of even a
                part-time VA. It also starts working right away. No hiring cycle. No training month. No process
                docs before you get relief.
              </p>
              <p>
                It is especially strong for repetitive questions that do not need a full human brain every time:
                tracking updates, return steps, refund policy questions, product follow-ups, and order edits.
              </p>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where a VA is stronger</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                A real person is better when support spills into judgment, relationship management, exceptions,
                and messy edge cases. A great VA can notice tone, improvise, and help with things beyond support
                too.
              </p>
              <p>
                If you want someone who can manage inboxes, chase suppliers, update spreadsheets, and handle odd
                tasks across the business, a VA gives you flexibility software does not.
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            The biggest hidden cost with a VA is not just wages. It is management. You need to hire carefully,
            document your policies, train them on your products, review their work, and stay available when they
            hit an exception. That can absolutely be worth it. But it is not friction-free.
          </p>
          <p>
            If you want to put rough numbers behind that choice, run your store through the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> first.
          </p>
          <p>
            For many Shopify stores, there is a stage before a VA makes sense. That stage is when support volume
            is real, but most of it is still predictable. In that zone, RegardsKim is often the better move.
            It gives you faster replies, better consistency, and 24/7 coverage without adding another salary.
          </p>
          <p>
            Later on, you may still hire a VA. In fact, the two can work well together. Let Regards Kim handle the
            repetitive first draft work, and let a human step in for the sensitive or complicated conversations.
            We unpack that sequence more in our guide to <Link href="/blog/ai-vs-virtual-assistant-ecommerce-support" className="font-medium text-brass hover:text-oxblood">AI vs virtual assistant for ecommerce support</Link>.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Get support help before you hire</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If you are not ready for the cost and management of a VA, RegardsKim gives you a much lighter way to
            keep customer support under control.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
