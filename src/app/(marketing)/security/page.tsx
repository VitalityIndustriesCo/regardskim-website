import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";

import StructuredData from "@/components/seo/StructuredData";
import FinalCTA from "@/components/sections/FinalCTA";
import { absoluteUrl, marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Security & Data",
  description:
    "How Regards Kim handles Gmail access, Shopify permissions, customer communications, AI drafts, and human approval for Shopify support teams.",
  path: "/security",
});

const principles = [
  {
    title: "Humans approve replies",
    body: "Regards Kim can draft and improve support replies, but it does not send customer emails without a person reviewing and choosing to send.",
    icon: UserCheck,
  },
  {
    title: "Context is used for support",
    body: "Customer emails, Shopify order details, tracking, and policy links are used to help the merchant handle support more accurately.",
    icon: CheckCircle2,
  },
  {
    title: "No selling customer data",
    body: "Regards Kim is a support workflow for the merchant. Customer communication data is not sold.",
    icon: LockKeyhole,
  },
  {
    title: "Designed for safer drafting",
    body: "The product keeps source context close to the draft so the person replying can check facts before anything reaches the customer.",
    icon: ShieldCheck,
  },
];

const trustFacts: { title: string; body: string; href?: string; linkLabel?: string }[] = [
  {
    title: "Google-verified Gmail access",
    body: "Regards Kim's Gmail access has passed Google's OAuth App Verification — an independent review of how the app requests, uses, and protects Gmail data.",
  },
  {
    title: "Listed on the Shopify App Store",
    body: "The app is distributed and billed through Shopify. You never hand us a credit card, and you can uninstall from your Shopify admin at any time.",
  },
  {
    title: "60-day email retention",
    body: "Processed email data is retained for 60 days to power your support workflow, then removed. We keep what the inbox needs, not an archive of your customers' lives.",
  },
  {
    title: "Incident response policy",
    body: "We maintain a written security incident response policy covering detection, containment, and merchant notification.",
    href: "/security-incident-response-policy.md",
    linkLabel: "Read the policy",
  },
];

const sections = [
  {
    title: "What Regards Kim connects to",
    items: [
      "Your Shopify store, so customer emails can be matched to relevant order and customer context.",
      "Your Gmail support inbox, so customer emails can be sorted and handled where your team already works.",
      "Your store policies, so drafts can reference your actual returns, shipping, and support rules instead of guessing.",
    ],
  },
  {
    title: "What Regards Kim does with that access",
    items: [
      "Sorts support emails into practical ecommerce buckets such as tracking, returns, refunds, order changes, sales, and escalations.",
      "Shows Shopify order, customer, delivery, tracking, and policy context near the email.",
      "Prepares draft replies, saved-reply helpers, tracking links, and policy links for human review.",
    ],
  },
  {
    title: "What Regards Kim does not do",
    items: [
      "It does not automatically send customer replies behind your back.",
      "It does not replace your support team or remove the person responsible for customer care.",
      "It does not sell customer communication data.",
      "It does not train general AI models on your customer emails.",
    ],
  },
];

export default function SecurityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Security & Data - Regards Kim",
    url: absoluteUrl("/security"),
    description: metadata.description,
  };

  return (
    <main className="bg-paper">
      <StructuredData data={schema} />

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Security & Data</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            AI support help, without giving up control of customer conversations.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate">
            Regards Kim is built for Shopify merchants who want faster support replies while keeping a human responsible
            for what customers actually receive.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className="rounded-3xl border border-slate/10 bg-white p-6 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brass/10 text-brass">
                  <Icon size={22} />
                </div>
                <h2 className="font-display text-xl font-bold text-ink">{principle.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate">{principle.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold text-ink md:text-4xl">Independent checks, in plain English</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {trustFacts.map((fact) => (
              <article key={fact.title} className="rounded-3xl border border-brass/20 bg-white p-6 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A]">
                <h3 className="font-display text-xl font-bold text-ink">{fact.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate">{fact.body}</p>
                {fact.href ? (
                  <a href={fact.href} className="mt-3 inline-block text-sm font-semibold text-brass hover:underline">
                    {fact.linkLabel} →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-slate/10 bg-white p-7 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A] md:p-8">
              <h2 className="font-display text-3xl font-bold text-ink">{section.title}</h2>
              <ul className="mt-5 space-y-3 text-base leading-8 text-slate">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-brass/20 bg-white p-7 shadow-[0_10px_26px_rgba(35,53,71,0.15),0_2px_6px_rgba(35,53,71,0.08)] dark:bg-[#20283A] md:p-8">
          <h2 className="font-display text-3xl font-bold text-ink">Plain-English install expectation</h2>
          <p className="mt-4 text-base leading-8 text-slate">
            After installing, you connect Gmail and confirm the policy links Regards Kim should use. The app then helps
            organise incoming support work and prepare replies. Your current support workflow stays familiar: you still
            review the message, adjust the answer if needed, and send only when you are comfortable.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate">
            For the formal legal wording, read the <Link href="/privacy" className="font-semibold text-brass hover:text-oxblood">Privacy Policy</Link> and <Link href="/terms" className="font-semibold text-brass hover:text-oxblood">Terms of Service</Link>.
          </p>
        </section>
      </section>

      <FinalCTA />
    </main>
  );
}
