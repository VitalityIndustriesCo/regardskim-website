"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { useRef } from "react";

const usualWay = [
  "Founder checks inbox between everything else",
  "Repetitive replies eat hours each week",
  "Hiring help gets expensive fast",
  "Response quality varies when things get busy",
];

const withKim = [
  "Incoming post-purchase emails are organised",
  "Replies are prepared for review",
  "Support stays prompt and polished",
  "The workload drops without extra payroll",
];

export default function Comparison() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="paper-grain py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">A smarter way to handle support after the sale</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">
            Kim helps with the repetitive post-purchase work that usually ends up on a founder, ops lead, or VA.
          </p>
        </FadeIn>

        <div ref={ref} className="mt-8 rounded-2xl border border-warm-taupe/30 bg-off-white-paper p-5 md:p-6">
          <p className="text-sm text-ink-navy/70">Typical support setup:</p>
          <div className="mt-2 flex items-end gap-3">
            <div className="relative text-2xl font-semibold text-ink-navy/80 md:text-3xl">
              $200-500/month
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-warm-coral"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.4 }}
              />
            </div>
            <motion.p
              className="text-3xl font-display text-warm-coral md:text-5xl"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 15, delay: prefersReducedMotion ? 0 : 0.9 }}
            >
              $49/month
            </motion.p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.article
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            className="rounded-3xl border border-warm-taupe/35 bg-off-white-paper p-7"
          >
            <h3 className="font-display text-2xl tracking-tight">The usual way</h3>
            <ul className="mt-5 space-y-3 text-ink-navy/80">
              {usualWay.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.08 }}
            className="rounded-3xl border border-warm-coral/35 bg-soft-peach p-7 shadow-[0_10px_24px_rgba(233,124,107,0.14)]"
          >
            <h3 className="font-display text-2xl tracking-tight">With Kim</h3>
            <ul className="mt-5 space-y-3 text-ink-navy/85">
              {withKim.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
