"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const faqs = [
  {
    q: "What does Regards Kim do?",
    a: "Kim connects to your Shopify store and email, reads your customer messages, and drafts helpful replies with the right order details. You review and send \u2014 usually takes a few minutes a day.",
  },
  {
    q: "Does Kim send replies automatically?",
    a: "No \u2014 every reply is a draft until you send it. Most merchants review their queue in a few minutes each morning.",
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
    q: "Does our agent have to be called Kim?",
    a: "Nope. You can change the sign-off name in your settings so replies go out under your brand or team name.",
  },
  {
    q: "How much does it cost?",
    a: "There is one plan: $49 per month.",
  },
  {
    q: "Who is Regards Kim best for?",
    a: "Store owners spending hours on customer emails every week \u2014 or paying someone else to. If your inbox is eating into time you should be spending on your business, Kim\u2019s for you.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-forest md:text-5xl">FAQ</h2>
        </FadeIn>

        <div className="mt-10 space-y-4 md:space-y-5">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <FadeIn key={faq.q} delay={idx * 0.02}>
                <article className="overflow-hidden rounded-2xl border border-forest/12 bg-paper">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-medium text-forest md:text-lg">{faq.q}</h3>
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
