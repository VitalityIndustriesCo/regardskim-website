"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "What does Regards Kim do?",
    a: "Regards Kim helps Shopify merchants handle post-purchase support emails. Kim reviews incoming messages, prepares thoughtful draft replies, and leaves them ready for approval.",
  },
  {
    q: "What kinds of emails can Kim help with?",
    a: "Kim is focused on post-purchase support: order updates, tracking questions, returns, refunds, and exchanges.",
  },
  {
    q: "Does Kim send replies automatically?",
    a: "No. Kim prepares the reply for your review in Gmail. You approve what gets sent.",
  },
  {
    q: "Does Regards Kim work with Shopify?",
    a: "Yes. Regards Kim is designed for Shopify stores and uses store context to help prepare accurate replies.",
  },
  {
    q: "Do I need to change email platforms?",
    a: "No. Kim works with Gmail, so your team can stay in the inbox you already use.",
  },
  {
    q: "Is this a chatbot?",
    a: "No. Regards Kim is built to help with the inbox behind the scenes. It prepares support replies for review rather than adding a chat widget to your storefront.",
  },
  {
    q: "Will replies still sound like my brand?",
    a: "That is the goal. Kim prepares clear, thoughtful replies for your review, so you can keep your tone consistent and make edits before sending.",
  },
  {
    q: "How much does Regards Kim cost?",
    a: "There is one simple plan: $49 per month.",
  },
  {
    q: "How does this compare to hiring a VA?",
    a: "A VA can be helpful, but it also comes with cost, training, and management. Regards Kim helps with repetitive inbox load for $49/month, often far less than the $200 to $500 merchants commonly spend on part-time inbox support.",
  },
  {
    q: "Who is Regards Kim best suited to?",
    a: "Regards Kim is ideal for small to medium Shopify stores that want customer support to feel more organised without adding full-time headcount.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            Frequently asked, neatly answered
          </h2>
        </FadeIn>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <FadeIn key={faq.q} delay={idx * 0.02}>
                <article
                  className={`overflow-hidden rounded-2xl border bg-paper transition-all duration-300 ${
                    isOpen
                      ? "border-forest/30 shadow-[0_0_0_1px_rgba(32,53,43,0.18),0_10px_22px_rgba(32,53,43,0.12)]"
                      : "border-forest/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-medium md:text-lg">{faq.q}</h3>
                    <ChevronDown className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} size={18} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-slate md:px-6">{faq.a}</p>
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
