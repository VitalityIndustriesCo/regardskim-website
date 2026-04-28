import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import AIEmailResponseGeneratorClient from "./AIEmailResponseGeneratorClient";

export const metadata: Metadata = {
  title: "AI Email Response Generator for Customer Support | RegardsKim",
  description:
    "Generate polished customer service email replies for shipping delays, refunds, exchanges, and more with this free template-based tool.",
  alternates: {
    canonical: absoluteUrl("/tools/ai-email-response-generator"),
  },
  openGraph: {
    title: "AI Email Response Generator for Customer Support | RegardsKim",
    description:
      "Create ready-to-send customer service email replies in the right tone for common ecommerce support scenarios.",
    url: absoluteUrl("/tools/ai-email-response-generator"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Email Response Generator for Customer Support | RegardsKim",
    description:
      "Create ready-to-send customer service email replies in the right tone for common ecommerce support scenarios.",
  },
};

export default function AIEmailResponseGeneratorPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AI Email Response Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/ai-email-response-generator"),
      description:
        "Generate useful customer support email responses for common ecommerce scenarios using structured templates.",
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
          name: "Does this tool use real AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It uses carefully written response templates for common support scenarios and tones so you can generate fast, useful draft replies without needing a backend.",
          },
        },
        {
          "@type": "Question",
          name: "What types of support emails can it help with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It helps with shipping delays, refund requests, order status questions, exchanges, and general customer inquiries.",
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
              Free AI email response generator for customer support
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              Need to answer support emails faster without sounding robotic? Paste the customer message,
              choose the tone and scenario, and generate a polished reply you can send or adapt.
            </p>
          </div>

          <AIEmailResponseGeneratorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-display text-2xl font-bold text-ink">What makes a good customer support reply?</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                The best replies acknowledge the issue clearly, set the next expectation, and sound like a real
                person. That matters even more for delayed shipping, refunds, and frustrated customers.
              </p>
              <p>
                If you want another quick support asset, pair this with our return policy generator or browse the
                customer service email templates library for more reusable replies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
