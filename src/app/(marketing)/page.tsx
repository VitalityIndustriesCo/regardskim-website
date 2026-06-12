import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Comparison from "@/components/sections/Comparison";
import ProofBand from "@/components/sections/ProofBand";
import Languages from "@/components/sections/Languages";
import CostAnchor from "@/components/sections/CostAnchor";
import TrustAndSafety from "@/components/sections/TrustAndSafety";
import FounderNote from "@/components/sections/FounderNote";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { enHomeCopy, getLanguageAlternates } from "@/lib/i18n/home";
import { marketingMetadata, absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: enHomeCopy.metadata.title,
  description: enHomeCopy.metadata.description,
  path: "/",
  languages: {
    ...getLanguageAlternates(),
    "x-default": absoluteUrl("/"),
  },
});

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo/rk-mark.svg"),
    description: siteConfig.description,
    inLanguage: "en",
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: enHomeCopy.faq.items.map((item) => ({
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
      <Hero copy={enHomeCopy.hero} />
      <HowItWorks copy={enHomeCopy.howItWorks} />
      <Comparison copy={enHomeCopy.comparison} />
      <ProofBand copy={enHomeCopy.proofBand} />
      <Languages copy={enHomeCopy.languages} />
      <CostAnchor copy={enHomeCopy.costAnchor} />
      <TrustAndSafety copy={enHomeCopy.trustAndSafety} />
      <FounderNote copy={enHomeCopy.founderNote} />
      <Pricing copy={enHomeCopy.pricing} />
      <GettingStarted copy={enHomeCopy.gettingStarted} />
      <FAQ copy={enHomeCopy.faq} />
      <FinalCTA copy={enHomeCopy.finalCta} />
    </main>
  );
}
