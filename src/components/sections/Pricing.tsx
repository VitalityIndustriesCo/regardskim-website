"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const inclusions = [
  "Shopify connection",
  "Gmail integration",
  "Draft replies prepared for review",
  "Help with order updates and tracking emails",
  "Help with returns, refunds, and exchanges",
  "Approval before anything is sent",
  "One simple monthly plan",
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

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
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            Simple pricing for busy Shopify stores
          </h2>
        </FadeIn>

        <div ref={ref} className="mt-10 rounded-[2rem] border border-forest/15 bg-paper p-8 shadow-[0_16px_30px_rgba(32,53,43,0.09)] md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-slate">Regards Kim</p>
          <div className="mt-3 flex items-end gap-2 text-forest">
            <span className="font-display text-6xl leading-none">
              $<motion.span>{display}</motion.span>
            </span>
            <span className="mb-2 text-slate">/month</span>
          </div>
          <p className="mt-4 max-w-2xl text-slate">
            One straightforward plan for post-purchase support that is reviewed and ready.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
              See Kim in action
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              Get started
            </a>
          </div>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {inclusions.map((item, idx) => (
              <motion.li
                key={item}
                className="flex items-start gap-2 text-slate"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <Check size={18} className="mt-0.5 shrink-0 text-brass" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <FadeIn delay={0.08} className="mt-6 rounded-2xl border border-brass/25 bg-mist p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <p>
              <strong>Hiring a VA:</strong> $200 to $500/month, plus training, oversight, and
              handoff time
            </p>
            <p>
              <strong>Regards Kim:</strong> $49/month, connected to Shopify and Gmail, with replies
              ready for approval
            </p>
          </div>
          <p className="mt-3 text-slate">Start with a calmer inbox before you start hiring around it.</p>
        </FadeIn>
      </div>
    </section>
  );
}
