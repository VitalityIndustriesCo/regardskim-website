import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import CSEmailTemplatesClient from "./CSEmailTemplatesClient";

export const metadata: Metadata = {
  title: "Customer Service Email Templates | RegardsKim",
  description:
    "Browse free customer service email templates for shipping, returns, refunds, order changes, apologies, and follow-ups.",
  alternates: {
    canonical: absoluteUrl("/tools/cs-email-templates"),
  },
  openGraph: {
    title: "Customer Service Email Templates | RegardsKim",
    description:
      "A free library of customer support email templates for common ecommerce and Shopify scenarios.",
    url: absoluteUrl("/tools/cs-email-templates"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Service Email Templates | RegardsKim",
    description:
      "A free library of customer support email templates for common ecommerce and Shopify scenarios.",
  },
};

export default function CSEmailTemplatesPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Customer Service Email Templates",
      url: absoluteUrl("/tools/cs-email-templates"),
      description:
        "A curated library of customer support email templates across shipping, returns, order changes, apologies, and follow-ups.",
      hasPart: [
        "Shipping & Tracking",
        "Returns & Refunds",
        "Order Changes",
        "Out of Stock",
        "Apologies & Compensation",
        "Follow-ups",
      ].map((category) => ({
        "@type": "CreativeWork",
        name: category,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who are these templates for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "These templates are for ecommerce and Shopify brands that want faster customer support replies for common situations like tracking questions, returns, and order changes.",
          },
        },
        {
          "@type": "Question",
          name: "Can I copy and customise the templates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each template includes placeholders so you can tailor the message to your store, order details, and tone of voice.",
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
              Customer service email templates for ecommerce brands
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              A practical swipe file of customer support templates you can actually use. Cover shipping updates,
              refunds, order changes, apologies, follow-ups, and more without starting from a blank page.
            </p>
          </div>

          <CSEmailTemplatesClient />
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
