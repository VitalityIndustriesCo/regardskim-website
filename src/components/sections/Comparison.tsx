"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const oldWay = [
  "Check the inbox between everything else",
  "Re-answer the same post-purchase questions by hand",
  "Lose time finding order details before replying",
  "Let support pile up on busy days",
  "Hire help earlier than you want to",
];

const kimWay = [
  "Incoming support is reviewed promptly",
  "Repetitive replies are prepared for you",
  "The key details are pulled into the workflow",
  "The inbox feels more orderly day to day",
  "You keep support moving for $49/month",
];

export default function Comparison() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            The old way vs the Kim way
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate">
            Less chasing. Less context-switching. More replies ready when you need them.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.article
            initial={{ x: prefersReducedMotion ? 0 : -28, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-oxblood/25 bg-paper p-7"
          >
            <h3 className="font-display text-3xl text-oxblood">The old way</h3>
            <ul className="mt-5 space-y-3 text-slate">
              {oldWay.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ x: prefersReducedMotion ? 0 : 28, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-3xl border border-forest/20 bg-mist p-7"
          >
            <h3 className="font-display text-3xl text-forest">The Kim way</h3>
            <ul className="mt-5 space-y-3 text-slate">
              {kimWay.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
