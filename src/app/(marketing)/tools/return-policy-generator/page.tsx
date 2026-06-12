import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import ToolEmailCapture from "@/components/ui/ToolEmailCapture";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import ReturnPolicyGeneratorClient from "./ReturnPolicyGeneratorClient";

export const metadata: Metadata = {
  title: "Return & Refund Policy Generator",
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
  const faqs = [
    {
      question: "Who is this return policy generator for?",
      answer:
        "It is designed for ecommerce and Shopify store owners who want a clearer return and refund policy they can copy, customise, and publish quickly.",
    },
    {
      question: "Can I use it as a shipping and return policy generator?",
      answer:
        "It focuses on returns and refunds, but it includes the most important shipping-related return details: who pays return shipping, how customers start a return, and what happens when an item arrives damaged or incorrect.",
    },
    {
      question: "What should an ecommerce return policy include?",
      answer:
        "A useful ecommerce return policy should include the return window, item condition rules, refund method, exchanges, return shipping responsibility, exceptions, damaged item process, and how customers contact support.",
    },
    {
      question: "Can I customise the return conditions and exceptions?",
      answer:
        "Yes. You can set the return window, refund method, return conditions, shipping responsibility, and common exceptions like sale items, final sale products, custom items, or hygiene-sensitive goods.",
    },
    {
      question: "Is this returns policy generator legal advice?",
      answer:
        "No. It creates a practical policy draft for your store, but it is not legal advice. Check your local consumer law obligations before publishing, especially if you sell internationally.",
    },
    {
      question: "Where should I publish my return policy?",
      answer:
        "Publish it on a dedicated policy page, link it from your footer, include it near checkout where relevant, and give your support team the same wording so replies match what customers can read on your site.",
    },
  ];

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
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
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
              window, refund method, conditions, and exceptions, then copy the finished policy into your site and use it as context for better AI support drafts.
            </p>
          </div>

          <ReturnPolicyGeneratorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
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

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">How to use a return policy generator for ecommerce</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5 text-slate">
              <li>
                <strong className="font-semibold text-ink">Start with your real operating rules.</strong> Choose a return
                window, refund method, exchange approach, and return shipping rule that your store can actually honour.
              </li>
              <li>
                <strong className="font-semibold text-ink">List the products that need exceptions.</strong> Call out final
                sale items, personalised products, opened goods, or any category where normal returns do not apply.
              </li>
              <li>
                <strong className="font-semibold text-ink">Generate the policy and read it like a customer.</strong> Look
                for confusing language around deadlines, inspection, refund timing, and who pays for shipping.
              </li>
              <li>
                <strong className="font-semibold text-ink">Publish it where support can point customers.</strong> Add the
                policy to your site, footer, help page, and support macros so customers hear the same answer everywhere.
              </li>
            </ol>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">What a good return and refund policy must cover</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                A good ecommerce return policy is specific enough to prevent misunderstandings, but plain enough that a
                customer can understand it without contacting support. At minimum, cover these points:
              </p>
              <ul className="list-disc space-y-3 pl-5">
                <li>The return window, including whether it starts from purchase date or delivery date.</li>
                <li>The condition items must be in, such as unused, unworn, unopened, or in original packaging.</li>
                <li>Whether customers receive a refund, exchange, replacement, store credit, or a mix of options.</li>
                <li>Who pays return shipping, and whether the answer changes for damaged, incorrect, or change-of-mind returns.</li>
                <li>Exceptions for sale items, custom products, gift cards, intimate items, or other products that need special handling.</li>
                <li>The contact process, including photos, order numbers, return authorisation, and expected response time.</li>
              </ul>
              <p>
                Once the policy is clear, support replies become easier. Your team can link to the policy instead of
                rewriting the same explanation in every refund email.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Return policy tips for Shopify stores</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-slate">
              <li>Use the same return window in your policy, product pages, checkout messaging, and email templates.</li>
              <li>Be clear about damaged or incorrect items. Those should not read like ordinary change-of-mind returns.</li>
              <li>Keep refund timing realistic by separating &quot;we process the refund&quot; from &quot;your bank shows the refund&quot;.</li>
              <li>Link the policy from support replies so customers can check the full wording themselves.</li>
              <li>Use the <Link href="/tools/ai-email-response-generator" className="font-medium text-brass hover:text-oxblood">AI email response generator</Link> for refund replies and the <Link href="/tools/cs-email-templates" className="font-medium text-brass hover:text-oxblood">customer service email templates</Link> for reusable return wording.</li>
              <li>For more context, read our guide to <Link href="/blog/shopify-returns-emails-reply-faster" className="font-medium text-brass hover:text-oxblood">replying faster to Shopify returns emails</Link> or <Link href="/blog/customer-service-email-templates-sound-human" className="font-medium text-brass hover:text-oxblood">support templates that still sound human</Link>. Regards Kim can use your store policy as context when drafting replies.</li>
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Return policy generator FAQ</h2>
            <div className="mt-5 space-y-5 text-slate">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-display text-lg font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-shell pb-4">
        <ToolEmailCapture />
      </div>
      <FinalCTA />
    </main>
  );
}
