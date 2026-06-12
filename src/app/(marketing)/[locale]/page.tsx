import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { getHomeCopy, getLanguageAlternates, isLocale, locales } from "@/lib/i18n/home";
import { absoluteUrl, marketingMetadata, siteConfig } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
    if (!isLocale(locale)) {
      return {};
    }

    const copy = getHomeCopy(locale);
    const path = `/${locale}`;

    return marketingMetadata({
      title: copy.metadata.title,
      description: copy.metadata.description,
      path,
      locale: copy.metadata.ogLocale,
      languages: {
        ...getLanguageAlternates(),
        "x-default": absoluteUrl("/"),
      },
    });
  });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getHomeCopy(locale);
  const language = locale === "pt-br" ? "pt-BR" : locale === "zh-cn" ? "zh-CN" : locale;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo/rk-mark.svg"),
    description: siteConfig.description,
    inLanguage: language,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: language,
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: language,
    mainEntity: copy.faq.items.map((item) => ({
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
      <Hero copy={copy.hero} />
      <HowItWorks copy={copy.howItWorks} />
      <Comparison copy={copy.comparison} />
      <ProofBand copy={copy.proofBand} />
      <Languages copy={copy.languages} />
      <CostAnchor copy={copy.costAnchor} />
      <TrustAndSafety copy={copy.trustAndSafety} />
      <FounderNote copy={copy.founderNote} />
      <Pricing copy={copy.pricing} />
      <GettingStarted copy={copy.gettingStarted} />
      <FAQ copy={copy.faq} />
      <FinalCTA copy={copy.finalCta} />
    </main>
  );
}
