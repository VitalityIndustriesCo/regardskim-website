import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Comparison from "@/components/sections/Comparison";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { faqItems } from "@/lib/faq-data";
import { marketingMetadata, absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Regards Kim — AI email customer support for Shopify stores",
  description:
    "AI email customer support for Shopify stores. Regards Kim drafts accurate replies for tracking, returns, refunds, and order questions using live store data.",
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
      <Comparison />
      <Pricing />
      <GettingStarted />
      <FAQ />
    </main>
  );
}
