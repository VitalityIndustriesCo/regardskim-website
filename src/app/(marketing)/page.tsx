import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Comparison from "@/components/sections/Comparison";
import TrustAndSafety from "@/components/sections/TrustAndSafety";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { faqItems } from "@/lib/faq-data";
import { marketingMetadata, absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Regards Kim - Shopify Email Support With Human Approval",
  description:
    "Regards Kim helps Shopify stores triage Gmail support emails, gather Shopify order context, and draft replies for a human to review before sending.",
  path: "/",
});

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo/rk-mark.svg"),
    description: siteConfig.description,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
    },
  };

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
      <StructuredData data={[organizationSchema, softwareApplicationSchema, faqSchema]} />
      <Hero />
      <HowItWorks />
      <Benefits />
      <TrustAndSafety />
      <Comparison />
      <Pricing />
      <GettingStarted />
      <FAQ />
    </main>
  );
}
