import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import ToolEmailCapture from "@/components/ui/ToolEmailCapture";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import AIToneRewriterClient from "./AIToneRewriterClient";

export const metadata: Metadata = {
  title: "AI Tone Rewriter for Support Emails",
  description:
    "Rewrite customer support drafts to sound more friendly, professional, apologetic, concise, or empathetic.",
  alternates: {
    canonical: absoluteUrl("/tools/ai-tone-rewriter"),
  },
  openGraph: {
    title: "AI Tone Rewriter for Support Emails | RegardsKim",
    description:
      "Adjust the tone of your support email drafts and customer messages with this free ecommerce-focused tone rewriter.",
    url: absoluteUrl("/tools/ai-tone-rewriter"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tone Rewriter for Support Emails | RegardsKim",
    description:
      "Adjust the tone of your support email drafts and customer messages with this free ecommerce-focused tone rewriter.",
  },
};

export default function AIToneRewriterPage() {
  const faqs = [
    {
      question: "What is an AI tone rewriter for customer service emails?",
      answer:
        "An AI tone rewriter helps you take an existing draft and adjust how it sounds. For ecommerce support, that usually means making a reply warmer, clearer, more apologetic, more concise, or more professional before it reaches the customer.",
    },
    {
      question: "Can this work as an email tone checker?",
      answer:
        "Yes. Paste your draft, choose the tone you want, and compare the rewrite with the original. It is a practical way to spot wording that may sound too blunt, too defensive, or too vague.",
    },
    {
      question: "What tones can I rewrite a message into?",
      answer:
        "You can rewrite a message to be more friendly, professional, apologetic, concise, or empathetic. Those tones cover most everyday ecommerce replies, from tracking questions to refund follow-ups.",
    },
    {
      question: "Is this AI tone changer built for Shopify support?",
      answer:
        "It is written for ecommerce and Shopify-style support conversations. The examples and wording are meant for real customer emails about orders, returns, delivery delays, exchanges, and store policies.",
    },
    {
      question: "Should I send the rewritten email without editing it?",
      answer:
        "No. Treat the rewritten draft as a better starting point. Check order details, policy promises, delivery dates, refund amounts, and anything else that depends on your store before sending.",
    },
    {
      question: "How is this different from an AI tone generator?",
      answer:
        "A tone generator often writes a message from scratch. This tool starts with words you already have, then changes the tone while keeping the original intent, which is useful when the facts are already correct.",
    },
  ];

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
              AI tone rewriter for customer service emails
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              If your reply feels too blunt, too cold, or too wordy, rewrite it in a better tone before you hit
              send. This tool helps you make support drafts sound more human and on-brand.
            </p>
          </div>

          <AIToneRewriterClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Why tone matters in support</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Customers often remember how a reply felt more than the exact words. A small tone shift can turn
                a tense email into a calmer conversation.
              </p>
              <p>
                For more ready-to-use support help, you can also browse our customer service email templates or
                use the AI email response generator for a starting point.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">How to use an AI tone rewriter for support emails</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5 text-slate">
              <li>
                <strong className="font-semibold text-ink">Paste the reply you were about to send.</strong> Start with
                the real draft, even if it feels rough. The tool works best when the facts are already there.
              </li>
              <li>
                <strong className="font-semibold text-ink">Choose the tone the customer needs.</strong> Friendly is
                good for routine updates, apologetic suits mistakes or delays, and concise helps when the original is
                too long.
              </li>
              <li>
                <strong className="font-semibold text-ink">Compare the rewrite with your original.</strong> Keep the
                clearer phrasing, but make sure the promise, policy, and timeline are still accurate.
              </li>
              <li>
                <strong className="font-semibold text-ink">Add the order-specific details.</strong> Insert tracking
                links, refund amounts, return deadlines, or the customer&apos;s name before sending from your inbox.
              </li>
            </ol>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Customer service tone examples</h2>
            <div className="mt-5 space-y-6 text-slate">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Shipping delay</h3>
                <p className="mt-3">
                  <strong className="font-semibold text-ink">Before:</strong> Your order is delayed. The carrier has
                  not updated tracking yet. Please wait a few more days.
                </p>
                <p className="mt-2">
                  <strong className="font-semibold text-ink">After:</strong> I&apos;m sorry your order has not moved
                  yet. I can see the carrier has the parcel, but tracking has not refreshed. Please give it another
                  two business days, and if it still has not updated, reply here and we will help with the next step.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Return request</h3>
                <p className="mt-3">
                  <strong className="font-semibold text-ink">Before:</strong> We do not accept returns after 30 days,
                  so we cannot refund this order.
                </p>
                <p className="mt-2">
                  <strong className="font-semibold text-ink">After:</strong> Thanks for checking with us. This order
                  is outside our 30-day return window, so we are not able to offer a refund on this one. I know that is
                  not the answer you were hoping for, but I wanted to explain it clearly.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Wrong address</h3>
                <p className="mt-3">
                  <strong className="font-semibold text-ink">Before:</strong> You entered the wrong address and it has
                  already shipped.
                </p>
                <p className="mt-2">
                  <strong className="font-semibold text-ink">After:</strong> I checked the order and it has already
                  shipped, so we cannot change the address from our side now. The best next step is to contact the
                  carrier with the tracking number and ask if they can redirect the parcel.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Tips for better ecommerce email tone</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-slate">
              <li>Lead with the customer&apos;s issue before explaining your store policy.</li>
              <li>Use plain wording for refunds, exchanges, and shipping timelines. Clever wording usually makes support slower.</li>
              <li>Do not over-apologise when the store has done nothing wrong. Acknowledge the frustration, then give the next step.</li>
              <li>Keep policy language consistent with your published return policy and saved support templates.</li>
              <li>Use the <Link href="/tools/ai-email-response-generator" className="font-medium text-brass hover:text-oxblood">AI email response generator</Link> when you need a full draft, and the <Link href="/tools/cs-email-templates" className="font-medium text-brass hover:text-oxblood">customer service email templates</Link> when you want reusable wording.</li>
              <li>For a bigger support system, read our guide to <Link href="/blog/customer-service-email-templates-sound-human" className="font-medium text-brass hover:text-oxblood">templates that still sound human</Link> or the guide to <Link href="/blog/automate-shopify-support-emails" className="font-medium text-brass hover:text-oxblood">automating Shopify support emails</Link>. Regards Kim can then draft replies with Shopify context inside your support workflow.</li>
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">AI tone rewriter FAQ</h2>
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
