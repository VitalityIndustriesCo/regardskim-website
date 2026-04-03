"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "What does Regards Kim do?",
    a: "Regards Kim reviews post-purchase emails, drafts thoughtful replies, and leaves everything ready for approval.",
  },
  {
    q: "Does Kim send replies automatically?",
    a: "No. Every reply stays as a draft until you review and approve it.",
  },
  {
    q: "What kinds of emails can Kim help with?",
    a: "Kim helps with order updates, tracking questions, returns, refunds, and exchanges.",
  },
  {
    q: "Is this a chatbot?",
    a: "No. Kim works behind the scenes in your inbox and prepares drafts for review.",
  },
  {
    q: "How much does it cost?",
    a: "There is one plan: $49 per month.",
  },
  {
    q: "Who is Regards Kim best for?",
    a: "Small to mid-sized Shopify stores that want cleaner support operations without adding headcount.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-forest md:text-5xl">FAQ</h2>
        </FadeIn>

        <div className="mt-10 space-y-4 md:space-y-5">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <FadeIn key={faq.q} delay={idx * 0.02}>
                <article className="overflow-hidden rounded-2xl border border-forest/15 bg-paper">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
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
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-6 text-sm text-slate md:text-base">{faq.a}</p>
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
