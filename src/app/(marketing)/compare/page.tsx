import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "How RegardsKim Compares",
  description:
    "Explore RegardsKim comparison pages for Gorgias, Zendesk, and hiring a virtual assistant, plus guides to pick the right support setup.",
  path: "/compare",
});

const comparisonPages = [
  {
    href: "/compare/gorgias",
    title: "RegardsKim vs Gorgias",
    description:
      "Best if you want a clear look at price, setup time, and whether you really need a full ecommerce help desk yet.",
  },
  {
    href: "/compare/zendesk",
    title: "RegardsKim vs Zendesk",
    description:
      "Useful when you are weighing simple Shopify email support against a broader, more operational service platform.",
  },
  {
    href: "/compare/tidio",
    title: "RegardsKim vs Tidio",
    description:
      "A clear breakdown of email-first support versus live chat and chatbot-heavy customer service.",
  },
  {
    href: "/compare/reamaze",
    title: "RegardsKim vs Reamaze",
    description:
      "Helpful if you are deciding between lightweight email automation and a more mature ecommerce help desk.",
  },
  {
    href: "/compare/richpanel",
    title: "RegardsKim vs Richpanel",
    description:
      "Best for comparing pure inbox relief against a self-service portal and customer dashboard approach.",
  },
  {
    href: "/compare/freshdesk",
    title: "RegardsKim vs Freshdesk",
    description:
      "A practical look at Shopify-native support help versus broader enterprise service software.",
  },
  {
    href: "/compare/hiring-staff",
    title: "RegardsKim vs Hiring Support Staff",
    description:
      "Useful when you are deciding whether to hire support people now or remove repetitive work first.",
  },
  {
    href: "/compare/va",
    title: "RegardsKim vs Hiring a Virtual Assistant",
    description:
      "A practical breakdown of AI versus a VA on cost, speed, judgment, and when each option makes sense.",
  },
  {
    href: "/compare/diy",
    title: "RegardsKim vs Doing It Yourself",
    description:
      "A reality check on the hidden cost of founder-led support compared with a lightweight automation layer.",
  },
];

const supportingLinks = [
  {
    href: "/blog/best-shopify-customer-service-apps-2026",
    label: "Best Shopify Customer Service Apps in 2026",
  },
  {
    href: "/blog/true-cost-of-shopify-customer-support",
    label: "The True Cost of Customer Support for Shopify Stores",
  },
  {
    href: "/tools/support-cost-calculator",
    label: "Shopify Support Cost Calculator",
  },
];

export default function CompareHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "How RegardsKim Compares",
    url: absoluteUrl("/compare"),
    description:
      "Comparison hub for RegardsKim against help desks, live chat tools, hiring options, and the DIY support approach.",
    hasPart: comparisonPages.map((page) => ({
      "@type": "WebPage",
      name: page.title,
      url: absoluteUrl(page.href),
      description: page.description,
    })),
  };

  return (
    <main className="bg-paper">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Comparison hub</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            How RegardsKim Compares
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate">
            If you are choosing between Kim, a help desk, or hiring support, start here. These pages break down
            the tradeoffs without pretending every store needs the same setup.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {comparisonPages.map((page) => (
            <article
              key={page.href}
              className="rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-1"
            >
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Comparison</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink">{page.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate">{page.description}</p>
              <Link href={page.href} className="mt-6 inline-flex text-sm font-semibold text-brass hover:text-oxblood">
                Read comparison →
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-brass/20 bg-white p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">Need more context before you choose?</h2>
              <p className="mt-4 text-lg leading-8 text-slate">
                Pair the comparison pages with a few deeper resources on support cost, automation, and the tools
                Shopify founders usually compare first.
              </p>
            </div>
            <div className="space-y-3">
              {supportingLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-2xl border border-slate/10 bg-mist/50 px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-brass/30 hover:bg-[#FFF4E8]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
