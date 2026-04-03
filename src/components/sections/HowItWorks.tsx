"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Inbox, PencilLine, BadgeCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const steps = [
  {
    label: "Triage",
    title: "Kim reviews the inbox",
    body: "Incoming post-purchase emails are reviewed so the important details are pulled forward quickly.",
    icon: Inbox,
  },
  {
    label: "Draft",
    title: "Thoughtful replies are prepared",
    body: "For order updates, tracking questions, returns, refunds, and exchanges, Kim drafts a clear response in your tone.",
    icon: PencilLine,
  },
  {
    label: "Approve",
    title: "You review before anything goes out",
    body: "Every reply is left ready for approval in Gmail, so you keep the final say without doing the first pass yourself.",
    icon: BadgeCheck,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    setActive(0);
    const first = window.setTimeout(() => setActive(1), 550);
    const second = window.setTimeout(() => setActive(2), 1200);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [inView, prefersReducedMotion]);

  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            How Kim keeps the inbox moving
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate">
            Kim is built for the emails that arrive after the order is placed. She reviews the
            message, checks the details, prepares the reply, and leaves it ready for you to
            approve.
          </p>
        </FadeIn>

        <div ref={ref} className="relative mt-12">
          <div className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-brass/35 md:block" />
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const show = prefersReducedMotion ? inView : active >= idx;
              return (
                <motion.article
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="relative rounded-3xl border border-forest/15 bg-paper p-7 shadow-[0_10px_24px_rgba(32,53,43,0.08)]"
                >
                  <span className="mb-4 inline-flex rounded-full bg-mist px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate">
                    {step.label}
                  </span>
                  <div className="mb-4 w-fit rounded-xl bg-cream p-2.5 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-forest">{step.title}</h3>
                  <p className="mt-3 text-slate">{step.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <FadeIn>
          <p className="mt-10 text-center font-medium text-slate">
            Handled, ready, reviewed, and waiting for your approval.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
