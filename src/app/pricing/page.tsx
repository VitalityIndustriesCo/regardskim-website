import StructuredData from "@/components/seo/StructuredData";
import FAQ from "@/components/sections/FAQ";
import GettingStarted from "@/components/sections/GettingStarted";
import Pricing from "@/components/sections/Pricing";
import { faqItems } from "@/lib/faq-data";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export default function PricingPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: absoluteUrl("/pricing"),
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
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
      <StructuredData data={[softwareApplicationSchema, faqSchema]} />
      <Pricing />
      <GettingStarted />
      <FAQ />
    </main>
  );
}
