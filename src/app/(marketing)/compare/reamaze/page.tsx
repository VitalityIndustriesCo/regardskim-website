import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Reamaze",
  description:
    "Compare RegardsKim and Reamaze for ecommerce support. See where Reamaze is stronger as a help desk and where Kim wins on focus, speed, and price.",
  path: "/compare/reamaze",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Higher monthly pricing tied to help desk plans and users",
  },
  {
    label: "Best for",
    kim: "Lean Shopify stores that want email help without much setup",
    competitor: "Ecommerce teams wanting a broader support desk with more channels",
  },
  {
    label: "Setup time",
    kim: "Fast setup with Shopify and inbox",
    competitor: "More time spent on inboxes, views, chat, FAQ, and workflows",
  },
  {
    label: "Core strength",
    kim: "Simple email-first automation with Shopify context",
    competitor: "Multi-channel support, FAQ builder, and a more mature help desk layer",
  },
  {
    label: "Training needed",
    kim: "Very little",
    competitor: "More team training to use the system well",
  },
  {
    label: "Where it is stronger",
    kim: "Price, simplicity, faster time to value",
    competitor: "Multi-channel operations, FAQ tooling, help desk maturity",
  },
];

const pros = {
  kim: [
    "Cheaper and easier to justify for smaller stores",
    "Faster setup when your main pain is repetitive customer emails",
    "No need to build out a full support process before getting value",
    "Strong fit when you want drafts grounded in Shopify order context",
  ],
  competitor: [
    "Better for teams handling support across more than just email",
    "Includes features like FAQ builder and broader help desk workflows",
    "A more mature platform if you want a traditional customer support hub",
  ],
};

export default function RegardsKimVsReamazePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Reamaze",
    url: absoluteUrl("/compare/reamaze"),
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
            RegardsKim vs Reamaze
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            Reamaze is a capable ecommerce help desk with more surface area. RegardsKim takes a narrower path:
            help Shopify stores clear repetitive support email faster without needing a bigger operations setup.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-3 border-b border-slate/10 bg-mist/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 p-4">Reamaze</div>
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
            <h2 className="font-display text-2xl font-bold text-ink">Where Reamaze is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            Reamaze makes sense when you want a broader support home base with more traditional help desk tools.
            It can cover more channels and gives teams more structure as support volume grows.
          </p>
          <p>
            The tradeoff is that broader platforms bring more setup, more workflow design, and more operational
            weight. For many early-stage or founder-led stores, that is overkill if the main issue is simply too
            many repetitive emails.
          </p>
          <p>
            That is where RegardsKim is stronger. It gets to value faster, stays focused on email, and gives you
            a Shopify-aware draft instead of a bigger queue to manage. If you want to compare that against the
            cost of handling support manually, try the <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link>.
          </p>
          <p>
            In short: Reamaze is the better fit if you want a more mature help desk. RegardsKim is the better fit
            if you want fewer support hours without becoming a support-ops manager first.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Faster setup, lighter support stack</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If your main goal is to stop drowning in support email, RegardsKim is often the easier call.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
