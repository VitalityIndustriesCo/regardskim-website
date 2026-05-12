import type { Metadata } from "next";

import FAQ from "@/components/sections/FAQ";
import GettingStarted from "@/components/sections/GettingStarted";
import StructuredData from "@/components/seo/StructuredData";
import { faqItems } from "@/lib/faq-data";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Regards Kim, including Shopify setup, Gmail connection, approvals, billing, security, and what happens after install.",
  path: "/faq",
});

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <StructuredData data={faqSchema} />
      <FAQ />
      <GettingStarted />
    </main>
  );
}
