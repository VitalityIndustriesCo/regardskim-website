import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import AIToneRewriterClient from "./AIToneRewriterClient";

export const metadata: Metadata = {
  title: "AI Tone Rewriter for Support Emails | RegardsKim",
  description:
    "Rewrite customer support messages to sound more friendly, professional, apologetic, concise, or empathetic.",
  alternates: {
    canonical: absoluteUrl("/tools/ai-tone-rewriter"),
  },
  openGraph: {
    title: "AI Tone Rewriter for Support Emails | RegardsKim",
    description:
      "Adjust the tone of your support emails and customer messages with this free ecommerce-focused tone rewriter.",
    url: absoluteUrl("/tools/ai-tone-rewriter"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tone Rewriter for Support Emails | RegardsKim",
    description:
      "Adjust the tone of your support emails and customer messages with this free ecommerce-focused tone rewriter.",
  },
};

export default function AIToneRewriterPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AI Tone Rewriter",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/ai-tone-rewriter"),
      description:
        "Rewrite customer support messages to match a better tone for ecommerce and Shopify support.",
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
          name: "What tones can I rewrite a message into?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can rewrite a message to be more friendly, professional, apologetic, concise, or empathetic.",
          },
        },
        {
          "@type": "Question",
          name: "Is this built for customer support messages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It is especially useful for ecommerce and customer support teams that want to improve tone without rewriting every reply from scratch.",
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
              AI tone rewriter for customer service emails
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              If your draft feels too blunt, too cold, or too wordy, rewrite it in a better tone before you hit
              send. This tool helps you make support messages sound more human and on-brand.
            </p>
          </div>

          <AIToneRewriterClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h2 className="font-display text-2xl font-bold text-ink">Why tone matters in support</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Customers often remember how a reply felt more than the exact words. A small tone shift can turn
                a tense email into a calmer conversation.
              </p>
              <p>
                For more ready-to-use support help, you can also browse our customer service email templates or
                generate first drafts with the AI email response generator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
