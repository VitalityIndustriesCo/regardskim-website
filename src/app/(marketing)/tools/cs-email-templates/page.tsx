import type { Metadata } from "next";
import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import ToolEmailCapture from "@/components/ui/ToolEmailCapture";
import { absoluteUrl, siteConfig } from "@/lib/seo";

import CSEmailTemplatesClient from "./CSEmailTemplatesClient";

export const metadata: Metadata = {
  title: "Customer Service Email Templates",
  description:
    "Browse free customer service email templates for shipping, returns, refunds, order changes, apologies, follow-ups, and AI drafting prompts.",
  alternates: {
    canonical: absoluteUrl("/tools/cs-email-templates"),
  },
  openGraph: {
    title: "Customer Service Email Templates | RegardsKim",
    description:
      "A free library of customer support email templates for common ecommerce and Shopify scenarios.",
    url: absoluteUrl("/tools/cs-email-templates"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Service Email Templates | RegardsKim",
    description:
      "A free library of customer support email templates for common ecommerce and Shopify scenarios.",
  },
};

export default function CSEmailTemplatesPage() {
  const faqs = [
    {
      question: "Who are these customer service email templates for?",
      answer:
        "These templates are for ecommerce and Shopify brands that want faster customer support replies for common situations like tracking questions, returns, refunds, order changes, apologies, and follow-ups.",
    },
    {
      question: "Can I copy and customise the templates?",
      answer:
        "Yes. Each template includes placeholders so you can tailor the message to your store, order details, customer name, policy wording, and preferred tone of voice.",
    },
    {
      question: "When should I use a customer service email template instead of writing fresh?",
      answer:
        "Use a template when the question is repeatable and the answer follows a known process. Write fresh when the customer is upset, the policy is unclear, or the order needs careful judgement.",
    },
    {
      question: "Are these templates useful for Shopify customer support?",
      answer:
        "Yes. They are written around ecommerce support moments Shopify stores handle often, including tracking, returns, refunds, address changes, cancellations, damaged items, and stock issues.",
    },
    {
      question: "How do I stop support templates sounding robotic?",
      answer:
        "Add the customer's specific order detail, keep the first sentence human, remove filler, and use a tone that matches the situation. A template should make the answer faster, not less personal.",
    },
    {
      question: "Can I use these templates with AI support tools?",
      answer:
        "Yes. Templates make good source material for AI drafting because they define your preferred wording and support process. Regards Kim can help turn store context and support patterns into draft replies.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Customer Service Email Templates",
      url: absoluteUrl("/tools/cs-email-templates"),
      description:
        "A curated library of customer support email templates across shipping, returns, order changes, apologies, and follow-ups.",
      hasPart: [
        "Shipping & Tracking",
        "Returns & Refunds",
        "Order Changes",
        "Out of Stock",
        "Apologies & Compensation",
        "Follow-ups",
      ].map((category) => ({
        "@type": "CreativeWork",
        name: category,
      })),
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
              Customer service email templates for ecommerce brands
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate">
              A practical swipe file of customer support templates you can actually use. Cover shipping updates,
              refunds, order changes, apologies, follow-ups, and more without starting from a blank page or a generic AI prompt.
            </p>
          </div>

          <CSEmailTemplatesClient />

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Why templates matter in ecommerce support</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Good templates keep common replies consistent without making every email sound copied and pasted. They
                are especially useful when customers ask the same questions about tracking, returns, refunds, discounts,
                address changes, and damaged items.
              </p>
              <p>
                The goal is not to remove judgement from support. The goal is to stop rewriting the same basic answer
                every day, so the team has more time for the emails that actually need thought.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">How to use customer service email templates</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5 text-slate">
              <li>
                <strong className="font-semibold text-ink">Pick the closest template category.</strong> Start with the
                customer&apos;s real issue: shipping, tracking, returns, refunds, order changes, apologies, or follow-ups.
              </li>
              <li>
                <strong className="font-semibold text-ink">Replace every placeholder.</strong> Add the customer&apos;s
                name, order number, product, timeline, tracking link, policy link, and the next step your store can
                actually take.
              </li>
              <li>
                <strong className="font-semibold text-ink">Adjust the tone to match the moment.</strong> A refund denial
                should sound different from a tracking update. Use warmer wording when the customer is frustrated.
              </li>
              <li>
                <strong className="font-semibold text-ink">Save the final version if it works well.</strong> Your best
                edited replies become better templates for the next support email.
              </li>
            </ol>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">When to use templates vs writing fresh</h2>
            <div className="mt-5 space-y-4 text-slate">
              <p>
                Use a template when the support answer follows a known process. Tracking updates, return instructions,
                exchange steps, refund timelines, cancellation confirmations, and basic apology emails are all good
                template candidates.
              </p>
              <p>
                Write fresh when the customer has a complicated order history, the issue involves a store mistake, the
                customer is angry, or your policy does not clearly cover the situation. In those cases, a template can
                still help with structure, but the final wording should show that a real person read the email.
              </p>
              <p>
                A useful middle ground is to start with a template, add the real Shopify order context, then use the{" "}
                <Link href="/tools/ai-tone-rewriter" className="font-medium text-brass hover:text-oxblood">
                  AI tone rewriter
                </Link>{" "}
                if the reply sounds too cold or too long.
              </p>
              <p>
                This is also where many small teams get the most value from templates. The first draft gives the reply a
                reliable structure, while the final edit adds the detail that proves the customer&apos;s actual order was
                checked.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Tips for better support email templates</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-slate">
              <li>Start with the customer&apos;s problem before explaining internal process or policy.</li>
              <li>Keep placeholders obvious so no one accidentally sends a draft with missing details.</li>
              <li>Write one template per situation. A broad all-purpose reply usually becomes vague.</li>
              <li>Review templates after busy seasons, carrier delays, or policy changes so the wording stays accurate.</li>
              <li>Use the <Link href="/tools/ai-email-response-generator" className="font-medium text-brass hover:text-oxblood">AI email response generator</Link> for quick drafts and the <Link href="/tools/return-policy-generator" className="font-medium text-brass hover:text-oxblood">return policy generator</Link> if your returns wording needs cleanup.</li>
              <li>For a bigger support workflow, read <Link href="/blog/customer-service-email-templates-sound-human" className="font-medium text-brass hover:text-oxblood">how to make templates sound human</Link> and <Link href="/blog/ecommerce-customer-service-best-practices-small-shopify-teams" className="font-medium text-brass hover:text-oxblood">customer service best practices for small Shopify teams</Link>. Regards Kim helps bring these patterns into AI-drafted replies with Shopify context.</li>
            </ul>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-slate/10 bg-white p-8 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]">
            <h2 className="font-display text-2xl font-bold text-ink">Customer service email templates FAQ</h2>
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
