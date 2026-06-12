import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Comparison from "@/components/sections/Comparison";
import ProofBand from "@/components/sections/ProofBand";
import CostAnchor from "@/components/sections/CostAnchor";
import TrustAndSafety from "@/components/sections/TrustAndSafety";
import FounderNote from "@/components/sections/FounderNote";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faqItems } from "@/lib/faq-data";
import { marketingMetadata, absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Regards Kim - Your Shopify Support Inbox, Already Answered",
  description:
    "Regards Kim reads every customer email, pulls the Shopify order context, and drafts the reply. You review and press send from Gmail. No auto-sending, ever.",
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
      <Comparison />
      <ProofBand />
      <CostAnchor />
      <TrustAndSafety />
      <FounderNote />
      <Pricing />
      <GettingStarted />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
