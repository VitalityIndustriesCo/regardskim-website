"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "What does RegardsKim do?",
    a: "RegardsKim helps Shopify stores handle post-purchase customer emails. Kim prepares draft replies for order status, tracking, returns, refunds, and exchanges, so you can review and send them faster.",
  },
  {
    q: "Does Kim send emails automatically?",
    a: "Not at the moment. Kim prepares the reply and leaves it ready for your approval in Gmail, so you stay in control of what gets sent.",
  },
  {
    q: "What kinds of emails can Kim help with?",
    a: "Kim is built for post-purchase support, including order updates, tracking questions, returns, refunds, and exchanges.",
  },
  {
    q: "Does RegardsKim work with Shopify?",
    a: "Yes. RegardsKim is designed for Shopify stores and uses your store information to help prepare accurate post-purchase replies.",
  },
  {
    q: "Do I need to switch email platforms?",
    a: "No. Kim works with Gmail, so your support workflow can stay in the inbox you already use.",
  },
  {
    q: "Is this a chatbot?",
    a: "No. RegardsKim is focused on handling post-purchase support email workflow behind the scenes, not adding a chatbot to your storefront.",
  },
  {
    q: "How much does it cost?",
    a: "RegardsKim is $49 per month for one simple plan.",
  },
  {
    q: "How does this compare to hiring a VA?",
    a: "A part-time VA for inbox support often costs $200 to $500 per month, before training and oversight. RegardsKim helps with the repetitive post-purchase workload for $49/month.",
  },
  {
    q: "Will the replies still sound like my brand?",
    a: "Kim is designed to prepare clear, polished replies for your review. You can check each draft before sending and make edits as needed.",
  },
  {
    q: "Who is RegardsKim best for?",
    a: "RegardsKim is best for small to mid-sized Shopify stores that want customer support emails handled more efficiently without hiring extra admin help.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Frequently asked, neatly answered</h2>
          <p className="mt-4 text-lg text-ink-navy/80">Review every reply before it goes out. Kim prepares the response, you approve the final send.</p>
        </FadeIn>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <FadeIn key={faq.q} delay={idx * 0.02}>
                <article className="overflow-hidden rounded-2xl border border-warm-taupe/35 bg-off-white-paper">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-medium md:text-lg">{faq.q}</h3>
                    <ChevronDown
                      className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                      size={18}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-5 text-ink-navy/80 md:px-6">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
