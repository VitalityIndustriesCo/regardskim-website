"use client";

import FadeIn from "@/components/ui/FadeIn";
import { Check } from "lucide-react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const inclusions = [
  "Shopify connection",
  "Gmail integration",
  "Draft replies for post-purchase support emails",
  "Help with order status and tracking questions",
  "Help with returns, refunds, and exchanges",
  "Merchant review before anything is sent",
  "One simple monthly plan",
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) count.set(49);
  }, [inView, count]);

  return (
    <section id="pricing" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Simple pricing for busy Shopify stores</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">Start small, stay in control, and let Kim handle the busywork.</p>
        </FadeIn>

        <motion.div
          ref={ref}
          className="mt-10 rounded-[2rem] border border-warm-taupe/35 bg-off-white-paper p-8 shadow-[0_16px_32px_rgba(35,53,71,0.07)] md:p-10"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sm uppercase tracking-[0.16em] text-ink-navy/60">RegardsKim</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-6xl leading-none">
              $<motion.span>{display}</motion.span>
            </span>
            <span className="mb-2 text-ink-navy/70">/month</span>
          </div>
          <p className="mt-4 text-ink-navy/80">A tidy post-purchase support desk for your Shopify store.</p>

          <motion.a whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }} href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral mt-7">
            Start with Kim
          </motion.a>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {inclusions.map((item, idx) => (
              <motion.li
                key={item}
                className="flex items-start gap-2 text-ink-navy/85"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : idx * 0.08 }}
              >
                <Check size={18} className="mt-0.5 shrink-0 text-muted-teal" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <FadeIn delay={0.1} className="mt-6 rounded-2xl border border-warm-taupe/35 bg-soft-peach p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <p><strong>Hiring a VA:</strong> $200–$500/month, plus training, management, and handoff time</p>
            <p><strong>RegardsKim:</strong> $49/month, connected to your store and inbox, with drafts ready to approve</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
