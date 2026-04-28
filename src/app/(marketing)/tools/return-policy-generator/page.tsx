import type { Metadata } from "next";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import ReturnPolicyGeneratorClient from "./ReturnPolicyGeneratorClient";

export const metadata: Metadata = {
  title: "Return & Refund Policy Generator | RegardsKim",
  description:
    "Create a clean return and refund policy for your store with this free generator for ecommerce brands.",
  alternates: {
    canonical: absoluteUrl("/tools/return-policy-generator"),
  },
  openGraph: {
    title: "Return & Refund Policy Generator | RegardsKim",
    description:
      "Generate a ready-to-copy return and refund policy based on your store rules, refund method, and exceptions.",
    url: absoluteUrl("/tools/return-policy-generator"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Return & Refund Policy Generator | RegardsKim",
    description:
      "Generate a ready-to-copy return and refund policy based on your store rules, refund method, and exceptions.",
  },
};

export default function ReturnPolicyGeneratorPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Return & Refund Policy Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/return-policy-generator"),
      description:
        "Create a store-specific return and refund policy with configurable windows, conditions, exceptions, and shipping responsibilities.",
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
          name: "Who is this return policy generator for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is designed for ecommerce and Shopify store owners who want a clearer return and refund policy they can copy, customise, and publish quickly.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customise the return conditions and exceptions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can set the return window, refund method, return conditions, shipping responsibility, and common exceptions like sale items or custom products.",
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
              Return and refund policy generator for ecommerce stores
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              Build a clear, customer-friendly return policy in a few minutes. Set your store name, return
              window, refund method, conditions, and exceptions, then copy the finished policy straight into your site.
            </p>
          </div>

          <ReturnPolicyGeneratorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-display text-2xl font-bold text-ink">Why this matters</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                A vague policy creates more support tickets, more refund friction, and more unhappy customers.
                A clear one sets expectations before the customer emails you.
              </p>
              <p>
                If you are building out your support stack, this pairs nicely with our customer service email
                templates and support cost calculator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
