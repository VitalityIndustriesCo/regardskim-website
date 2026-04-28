import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Hiring Support Staff",
  description:
    "Compare RegardsKim with hiring part-time or full-time customer support staff for your Shopify store.",
  path: "/compare/hiring-staff",
});

const comparisonRows = [
  {
    label: "Monthly cost",
    kim: "$49/month",
    competitor: "$2,000+/month once wages, hours, and management are included",
  },
  {
    label: "Availability",
    kim: "24/7 drafting support",
    competitor: "Depends on roster, timezone, and shift coverage",
  },
  {
    label: "Speed to start",
    kim: "Connect Shopify and inbox",
    competitor: "Hiring, onboarding, training, QA, and documentation",
  },
  {
    label: "Consistency",
    kim: "Instant and consistent across common scenarios",
    competitor: "Varies by training, experience, and turnover",
  },
  {
    label: "Best at",
    kim: "Repetitive support emails and first drafts",
    competitor: "Complex issues, relationship handling, brand nuance",
  },
  {
    label: "Where it is stronger",
    kim: "Price, 24/7 support help, no training burden",
    competitor: "Human judgment, escalation handling, broader customer relationships",
  },
];

const pros = {
  kim: [
    "Costs a tiny fraction of a support hire",
    "Starts helping immediately without training time",
    "Handles repeatable inbox work consistently at any hour",
    "A strong first step before you commit to payroll",
  ],
  competitor: [
    "Better for highly nuanced, emotional, or unusual customer situations",
    "Can build deeper customer relationships over time",
    "Useful if you need someone to own broader support operations, not just replies",
  ],
};

export default function RegardsKimVsHiringStaffPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Hiring Support Staff",
    url: absoluteUrl("/compare/hiring-staff"),
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
            RegardsKim vs Hiring Support Staff
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            This is less about software and more about timing. Hiring support staff gives you human judgment and
            flexibility, but it also adds payroll, onboarding, management, and slower ramp-up. RegardsKim gives you
            a much lighter way to absorb repetitive support work first.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-3 border-b border-slate/10 bg-mist/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 p-4">Hiring staff</div>
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
            <h2 className="font-display text-2xl font-bold text-ink">Where hiring staff is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Hiring support staff makes sense once support complexity really justifies it. A good human can navigate
            messy edge cases, calm down upset customers, and represent the brand with more nuance than software.
          </p>
          <p>
            The catch is that hiring comes with a long list of invisible costs: recruiting, onboarding, process
            creation, training, QA, management, and often churn. If support volume is growing but still mostly
            repetitive, that is a heavy move to make too early.
          </p>
          <p>
            RegardsKim is stronger in that in-between stage. It gives you instant coverage for common support emails
            at <strong>$49/month</strong>, which is often dramatically cheaper than even a part-time hire. If you want to
            put numbers behind that, try the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link>.
          </p>
          <p>
            Later on, you may still hire someone. In a lot of cases that is the best progression: let Kim remove the
            repetitive load first, then add humans once the remaining work is truly nuanced enough to need them.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">A lighter step before payroll</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If you are not ready to hire, Kim can still take a real chunk of support work off your plate.
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
