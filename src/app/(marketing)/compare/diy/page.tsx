import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Doing It Yourself",
  description:
    "Compare RegardsKim with the DIY approach to Shopify customer support, where the founder handles the inbox manually.",
  path: "/compare/diy",
});

const comparisonRows = [
  {
    label: "Monthly cost",
    kim: "$49/month",
    competitor: "$0 in software, but 10-15+ founder hours per week is common",
  },
  {
    label: "Availability",
    kim: "24/7 drafting support",
    competitor: "Only when you are online and have the energy for it",
  },
  {
    label: "Consistency",
    kim: "Consistent tone and process across common requests",
    competitor: "Varies with fatigue, time pressure, and inbox backlog",
  },
  {
    label: "Best at",
    kim: "Saving time on repetitive support work",
    competitor: "Total control and personal founder touch",
  },
  {
    label: "Burnout risk",
    kim: "Lower",
    competitor: "High once support volume grows",
  },
  {
    label: "Where it is stronger",
    kim: "Time savings, 24/7 help, reduced support drag",
    competitor: "Zero software spend, total control, personal customer connection",
  },
];

const pros = {
  kim: [
    "Wins back founder time every week",
    "Helps keep replies fast and consistent even when the inbox spikes",
    "Reduces the chance that support becomes a constant background drain",
    "Still lets you approve replies rather than giving up control entirely",
  ],
  competitor: [
    "Costs nothing extra in software",
    "Lets the founder keep a direct pulse on customer sentiment",
    "Can feel more personal in the very earliest stage",
  ],
};

export default function RegardsKimVsDIYPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Doing It Yourself",
    url: absoluteUrl("/compare/diy"),
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
            RegardsKim vs Doing It Yourself
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            The default support setup for a lot of Shopify stores is simple: the founder just handles the inbox.
            That works for a while. Then it slowly becomes one of the most expensive invisible jobs in the business.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-3 border-b border-slate/10 bg-mist/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 p-4">Do it yourself</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 border-b border-slate/10 last:border-b-0 sm:grid-cols-3">
              <div className="p-4 font-medium text-ink">{row.label}</div>
              <div className="border-t border-slate/10 p-4 text-slate sm:border-l sm:border-t-0">{row.kim}</div>
              <div className="border-t border-slate/10 p-4 text-slate sm:border-l sm:border-t-0">{row.competitor}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-brass/20 bg-white p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where RegardsKim wins</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.kim.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-display text-2xl font-bold text-ink">Where DIY is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Doing support yourself feels free because no invoice shows up for it. But the cost leaks out through
            your time, attention, and the opportunity cost of everything else you could be doing instead.
          </p>
          <p>
            It is also the kind of job that expands quietly. Five emails becomes fifteen. A few check-ins on your
            phone becomes a constant mental tab you never really close. That is where burnout creeps in.
          </p>
          <p>
            RegardsKim is built for that exact moment. It keeps the founder in control, but removes a lot of the
            repetitive drafting work so support stops eating the day. If you want to quantify what DIY support is
            really costing you, the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> is a useful gut check.
          </p>
          <p>
            DIY still wins when you want maximum control and every single customer interaction matters personally.
            But once the inbox starts pulling you away from growth work, RegardsKim is usually the better trade.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Keep the control, lose the drag</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If you are still doing support yourself, Kim helps without taking the inbox fully out of your hands.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Kim on Shopify
          </Link>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
