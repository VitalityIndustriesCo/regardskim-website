import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import ToolEmailCapture from "@/components/ui/ToolEmailCapture";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import SupportCostCalculatorClient from "./SupportCostCalculatorClient";

export const metadata: Metadata = {
  title: "Shopify Support Cost Calculator",
  description:
    "Estimate how much customer support is costing your Shopify store each month, then compare it with RegardsKim at $49/month.",
  alternates: {
    canonical: absoluteUrl("/tools/support-cost-calculator"),
  },
  openGraph: {
    title: "Shopify Support Cost Calculator | RegardsKim",
    description:
      "Estimate your monthly and yearly support cost, then compare it with RegardsKim at $49/month.",
    url: absoluteUrl("/tools/support-cost-calculator"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Support Cost Calculator | RegardsKim",
    description:
      "Estimate your monthly and yearly support cost, then compare it with RegardsKim at $49/month.",
  },
};

export default function SupportCostCalculatorPage() {
  const faqs = [
    {
      question: "How does the Shopify support cost calculator work?",
      answer:
        "It estimates your monthly support cost using your weekly support hours and hourly rate, then compares that cost with RegardsKim at $49 per month.",
    },
    {
      question: "What should I use for hourly rate?",
      answer:
        "Use your own time value, your support hire cost, or what you would pay a VA to handle customer emails each hour. If you are the founder, use the rate that reflects what your time could be worth elsewhere.",
    },
    {
      question: "Does this include the full cost of customer support?",
      answer:
        "It focuses on labour time, which is the cost many Shopify stores underestimate. It does not include helpdesk software, refunds, reships, discount codes, or the cost of unhappy customers.",
    },
    {
      question: "What support tasks should I include in the estimate?",
      answer:
        "Include time spent answering emails, checking Shopify orders, looking up tracking, handling returns, editing addresses, replying to refund questions, and following up with carriers or warehouses.",
    },
    {
      question: "When is support automation cheaper than hiring a VA?",
      answer:
        "Automation usually becomes attractive when repeat support questions take several hours a week and the answers depend on Shopify order context. A VA may still be better for judgement-heavy edge cases.",
    },
    {
      question: "Can this calculator help with general Shopify support cost queries?",
      answer:
        "Yes. It gives a simple baseline for what support time costs each month, which makes it easier to compare founder time, VA support, helpdesk tools, and AI-assisted workflows.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Shopify Support Cost Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl("/tools/support-cost-calculator"),
      description:
        "Estimate how much customer support is costing your Shopify store and compare it with RegardsKim at $49/month.",
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
              How much is customer support costing your Shopify store?
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              If support is chewing through founder time or VA hours, the real cost adds up fast. Use this
              calculator to estimate your monthly support cost and compare it with AI-drafted Shopify support replies in Regards Kim at $49/month.
            </p>
          </div>

          <SupportCostCalculatorClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">What to do with this number</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                If the cost feels higher than expected, that is normal. Support looks cheap when it is hidden in
                founder time.
              </p>
              <p>
                A good next step is to pair this with our guides on{" "}
                <Link href="/blog/automate-shopify-support-emails" className="font-medium text-brass hover:text-oxblood">
                  using AI in Shopify support emails
                </Link>{" "}
                and{" "}
                <Link href="/compare/va" className="font-medium text-brass hover:text-oxblood">
                  comparing AI with hiring a VA
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">How to use a Shopify support cost calculator</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5 text-slate">
              <li>
                <strong className="font-semibold text-ink">Estimate your weekly support hours.</strong> Include inbox
                time, order lookups, tracking checks, returns, refunds, address edits, and follow-up messages.
              </li>
              <li>
                <strong className="font-semibold text-ink">Choose a realistic hourly rate.</strong> Use founder time,
                staff cost, or the VA rate you would pay to handle the same support work.
              </li>
              <li>
                <strong className="font-semibold text-ink">Review the monthly and yearly cost.</strong> The yearly view
                is often the useful one because small weekly support habits become expensive over a full season.
              </li>
              <li>
                <strong className="font-semibold text-ink">Compare the work, not just the price.</strong> Some emails
                need judgement, but repeat questions about tracking, returns, and basic order status are good candidates
                for a faster workflow.
              </li>
            </ol>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Worked support cost example</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Say a Shopify founder spends 8 hours a week answering support emails. If that time is worth $40 an
                hour, support is costing $320 a week before any software, reships, or discounts. Across a month, that is
                roughly $1,386 in labour time. Across a year, it is more than $16,600.
              </p>
              <p>
                If the same store hires a VA for $12 an hour and support still takes 8 hours a week, the labour cost is
                about $416 a month. That may be worth it for judgement-heavy replies, but it is expensive if most emails
                are repeat questions like &quot;Where is my order?&quot;, &quot;Can I return this?&quot;, or &quot;Can you change my address?&quot;
              </p>
              <p>
                The point is not that every support task should be automated. It is to make the hidden cost visible so
                you can decide which replies deserve human attention and which ones need a faster, Shopify-aware draft.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Tips for lowering Shopify support costs</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-slate">
              <li>Separate repeat questions from judgement-heavy cases. They should not cost the same amount of time.</li>
              <li>Use clearer tracking emails and order status messaging to reduce &quot;Where is my order?&quot; volume.</li>
              <li>Keep return policy wording easy to find so refund and return emails need less back-and-forth.</li>
              <li>Turn your best replies into templates, then improve the tone instead of rewriting from scratch.</li>
              <li>Use the <Link href="/tools/return-policy-generator" className="font-medium text-brass hover:text-oxblood">return policy generator</Link>, <Link href="/tools/ai-email-response-generator" className="font-medium text-brass hover:text-oxblood">AI email response generator</Link>, and <Link href="/tools/ai-tone-rewriter" className="font-medium text-brass hover:text-oxblood">AI tone rewriter</Link> to tighten common support work.</li>
              <li>Read the <Link href="/blog/true-cost-of-shopify-customer-support" className="font-medium text-brass hover:text-oxblood">true cost of Shopify customer support</Link> and <Link href="/blog/ai-vs-virtual-assistant-ecommerce-support" className="font-medium text-brass hover:text-oxblood">AI vs VA support comparison</Link> for the bigger decision. Regards Kim is built for stores that want faster Shopify-aware replies without handing every email to a person.</li>
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Support cost calculator FAQ</h2>
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
