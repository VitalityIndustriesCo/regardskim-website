import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import ToolEmailCapture from "@/components/ui/ToolEmailCapture";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import AIEmailResponseGeneratorClient from "./AIEmailResponseGeneratorClient";

export const metadata: Metadata = {
  title: "AI Email Response Generator for Customer Support",
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
  const faqs = [
    {
      question: "What is an AI email response generator?",
      answer:
        "An AI email response generator helps turn a customer message into a draft reply. For ecommerce support, it is most useful for common situations like tracking questions, return requests, refund follow-ups, exchanges, and order changes.",
    },
    {
      question: "Does this AI email response generator use real AI?",
      answer:
        "No. This free tool uses carefully written response patterns for common ecommerce support scenarios and tones, so you can create a useful draft without a backend or account.",
    },
    {
      question: "What types of customer support emails can it help with?",
      answer:
        "It can help with shipping delays, refund requests, order status questions, exchanges, apologies, and general customer inquiries. You should still add the specific order details before sending.",
    },
    {
      question: "Can it work as an AI powered customer support email generator?",
      answer:
        "It can give you the shape of a good customer support reply, but it does not read your Shopify order data. For AI drafts that use order, tracking, and customer context, use a connected support workflow like Regards Kim.",
    },
    {
      question: "Should I use generated email responses for every customer?",
      answer:
        "Use generated responses for repeatable support moments, then edit them when the customer is upset, the policy is unclear, or the order has unusual context.",
    },
    {
      question: "How do I make generated support replies sound less generic?",
      answer:
        "Add the customer's name, the actual order detail, a clear next step, and one sentence that reflects the customer's specific concern. You can also run the draft through the AI tone rewriter before sending.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AI Email Response Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/ai-email-response-generator"),
      description:
        "Generate useful customer support email draft responses for common ecommerce and Shopify scenarios.",
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
              Free AI email response generator for customer support
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              Need to answer support emails faster without sounding robotic? Paste the customer message,
              choose the tone and scenario, and generate a polished draft you can review, edit, and send.
            </p>
          </div>

          <AIEmailResponseGeneratorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
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

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">How to use an AI email response generator</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5 text-slate">
              <li>
                <strong className="font-semibold text-ink">Choose the closest support scenario.</strong> Pick the
                situation that matches the customer&apos;s email, such as a delayed delivery, refund request, exchange, or
                order status question.
              </li>
              <li>
                <strong className="font-semibold text-ink">Paste the customer&apos;s message or summary.</strong> Include
                the key issue, but do not paste private payment details or anything the reply does not need.
              </li>
              <li>
                <strong className="font-semibold text-ink">Generate a draft in the right tone.</strong> Use a friendly
                tone for simple updates, apologetic for store mistakes, and concise when the customer just needs a direct
                answer.
              </li>
              <li>
                <strong className="font-semibold text-ink">Review the facts before sending.</strong> Add the order
                number, tracking link, refund timing, return deadline, or policy detail that makes the reply accurate.
              </li>
            </ol>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Example generated customer support replies</h2>
            <div className="mt-5 space-y-6 text-slate">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Late delivery reply</h3>
                <p className="mt-3">
                  Hi Taylor, thanks for reaching out. I checked the tracking and your order is still moving, but it
                  looks like the carrier scan is behind. I&apos;m sorry for the wait. Please give it another two business
                  days, and if the tracking still has not updated, reply here and we will help with the next step.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Refund request reply</h3>
                <p className="mt-3">
                  Hi Morgan, thanks for sending that through. Your return is within our policy window, so once the item
                  arrives back with us, we will inspect it and process the refund to your original payment method. Refunds
                  usually take a few business days to appear after they are processed.
                </p>
              </div>
              <p>
                These examples work because they acknowledge the customer, explain what was checked, and give a concrete
                next step. If the wording feels too stiff, use the{" "}
                <Link href="/tools/ai-tone-rewriter" className="font-medium text-brass hover:text-oxblood">
                  AI tone rewriter
                </Link>{" "}
                to make it warmer before sending.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Tips for better AI generated email responses</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-slate">
              <li>Use the generated reply as a draft, not a decision maker. Policy calls still belong to the store.</li>
              <li>Replace vague phrases like &quot;soon&quot; with your real shipping, refund, or returns timeline.</li>
              <li>Keep apology language proportional. A small delay needs empathy; a store error needs ownership.</li>
              <li>Save your best replies in a template library so the team answers common questions consistently.</li>
              <li>Pair this with the <Link href="/tools/return-policy-generator" className="font-medium text-brass hover:text-oxblood">return policy generator</Link> when refund wording depends on your policy, or the <Link href="/tools/cs-email-templates" className="font-medium text-brass hover:text-oxblood">customer service email templates</Link> when you need reusable replies.</li>
              <li>For a fuller system, read <Link href="/blog/automate-shopify-support-emails" className="font-medium text-brass hover:text-oxblood">how to automate Shopify support emails</Link> and <Link href="/blog/use-gmail-shopify-customer-support" className="font-medium text-brass hover:text-oxblood">how to use Gmail for Shopify customer support</Link>. Regards Kim connects draft replies with Shopify context so the answer is easier to verify.</li>
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">AI email response generator FAQ</h2>
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
