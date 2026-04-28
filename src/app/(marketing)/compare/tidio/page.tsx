import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "RegardsKim vs Tidio",
  description:
    "Compare RegardsKim and Tidio for Shopify support. See where Tidio is stronger on live chat and where Kim wins on email-first support, simplicity, and price.",
  path: "/compare/tidio",
});

const comparisonRows = [
  {
    label: "Starting price",
    kim: "$49/month",
    competitor: "Varies by plan, seats, and chat features",
  },
  {
    label: "Best for",
    kim: "Shopify stores that mainly want help with support emails",
    competitor: "Stores prioritising live chat, chatbots, and multi-channel messaging",
  },
  {
    label: "Setup time",
    kim: "Quick Shopify + inbox connection",
    competitor: "More setup around chat flows, channels, and widget behaviour",
  },
  {
    label: "Core strength",
    kim: "Email-first support with Shopify order awareness",
    competitor: "Live chat, chatbot builder, and on-site messaging",
  },
  {
    label: "Daily workflow",
    kim: "Review AI-generated email drafts",
    competitor: "Manage chats, bot flows, and messages across channels",
  },
  {
    label: "Where it is stronger",
    kim: "Cheaper, simpler, more focused on repetitive support email",
    competitor: "Live chat, chatbot automation, real-time multi-channel coverage",
  },
];

const pros = {
  kim: [
    "Better fit if most support demand comes through email rather than live chat",
    "Shopify-aware drafting makes tracking, refund, and order-edit replies easier",
    "Simpler setup and less support-software overhead for small teams",
    "More affordable if you do not need a full chat stack",
  ],
  competitor: [
    "Stronger for stores that care about live chat on the storefront",
    "Includes chatbot builder and more proactive website messaging options",
    "Better if your support operation spans chat, email, and other customer channels",
  ],
};

export default function RegardsKimVsTidioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RegardsKim vs Tidio",
    url: absoluteUrl("/compare/tidio"),
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
            RegardsKim vs Tidio
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
            These tools overlap a bit, but they are built with different priorities. Tidio leans hard into live
            chat and chatbot experiences. RegardsKim is more focused: it helps Shopify stores answer repetitive
            support emails faster with store-aware drafts.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-3 border-b border-slate/10 dark:border-slate/20 bg-mist/40 dark:bg-[#1B2436]/40 text-sm font-semibold text-ink">
            <div className="p-4">Category</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">RegardsKim</div>
            <div className="border-l border-slate/10 dark:border-slate/20 p-4">Tidio</div>
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
            <h2 className="font-display text-2xl font-bold text-ink">Where Tidio is stronger</h2>
            <ul className="mt-5 space-y-3 text-slate">
              {pros.competitor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-slate">
          <p>
            If your store gets most customer questions through a chat widget, Tidio is naturally going to look
            more compelling. It is built for real-time conversations, chatbot flows, and keeping customers engaged
            while they are still on the site.
          </p>
          <p>
            But a lot of smaller Shopify stores do not actually have a live chat problem. They have an inbox
            problem. The same tracking, refund, exchange, and order-status emails show up every day, and the
            founder ends up answering them manually. That is the exact lane where RegardsKim is stronger.
          </p>
          <p>
            Regards Kim stays focused on email, uses Shopify order context, and keeps the setup lighter. If you want help
            judging whether the savings justify it, our <Link href="/tools/support-cost-calculator" className="font-medium text-brass hover:text-oxblood">support cost calculator</Link> makes the tradeoff easier to see.
          </p>
          <p>
            So the short version is this: choose Tidio if live chat is central to your support motion. Choose
            RegardsKim if you mainly want faster, better email handling without adding a bigger support stack.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
          <h2 className="font-display text-3xl font-bold text-ink">Best when email is the real bottleneck</h2>
          <p className="mt-4 text-lg leading-8 text-slate">
            If your inbox is the thing draining time, RegardsKim is the simpler and more focused option.
          </p>
          <Link href="/#install" className="btn-primary mt-8 inline-flex">
            Install Regards Kim on Shopify
          </Link>
        </div>
      </section>

    </main>
  );
}
