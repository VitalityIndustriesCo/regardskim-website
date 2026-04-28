"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { faqItems } from "@/lib/faq-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-5xl">FAQ</h2>
        </FadeIn>

        <div className="mt-10 space-y-4 md:space-y-5">
          {faqItems.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <FadeIn key={faq.question} delay={idx * 0.02}>
                <article className="overflow-hidden rounded-2xl border border-slate/12 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-[#20283A]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-medium text-ink md:text-lg">{faq.question}</h3>
                    <ChevronDown className={`shrink-0 text-slate transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} size={18} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-6 text-sm text-slate md:text-base">{faq.answer}</p>
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
