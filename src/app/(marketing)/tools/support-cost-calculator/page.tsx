import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import SupportCostCalculatorClient from "./SupportCostCalculatorClient";

export const metadata: Metadata = {
  title: "Shopify Support Cost Calculator | RegardsKim",
  description:
    "Estimate how much customer support is costing your Shopify store each month, then compare it with RegardsKim at $49/month.",
  alternates: {
    canonical: absoluteUrl("/tools/support-cost-calculator"),
  },
  openGraph: {
    title: "Shopify Support Cost Calculator | RegardsKim",
    description:
      "Estimate your monthly and yearly support cost, then compare it with RegardsKim at $49/month.",
    url: absoluteUrl("/tools/support-cost-calculator"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Support Cost Calculator | RegardsKim",
    description:
      "Estimate your monthly and yearly support cost, then compare it with RegardsKim at $49/month.",
  },
};

export default function SupportCostCalculatorPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Shopify Support Cost Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/support-cost-calculator"),
      description:
        "Estimate how much customer support is costing your Shopify store and compare it with RegardsKim at $49/month.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the support cost calculator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It estimates your monthly support cost using your weekly support hours and hourly rate, then compares that cost with RegardsKim at $49 per month.",
          },
        },
        {
          "@type": "Question",
          name: "What should I use for hourly rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use your own time value, your support hire cost, or what you would pay a VA to handle customer emails each hour.",
          },
        },
      ],
    },
  ];

  return (
    <main className="bg-paper">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Free tool</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
              How much is customer support costing your Shopify store?
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              If support is chewing through founder time or VA hours, the real cost adds up fast. Use this
              calculator to estimate your monthly support cost and compare it with Regards Kim at $49/month.
            </p>
          </div>

          <SupportCostCalculatorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">What to do with this number</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                If the cost feels higher than expected, that is normal. Support looks cheap when it is hidden in
                founder time.
              </p>
              <p>
                A good next step is to pair this with our guides on{" "}
                <Link href="/blog/automate-shopify-support-emails" className="font-medium text-brass hover:text-oxblood">
                  automating Shopify support emails
                </Link>{" "}
                and{" "}
                <Link href="/compare/va" className="font-medium text-brass hover:text-oxblood">
                  comparing AI with hiring a VA
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
