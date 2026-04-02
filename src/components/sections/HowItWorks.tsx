"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Clock3, Inbox, PencilRuler, BadgeCheck, SendHorizonal } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Clock in",
    title: "Connect your store and inbox",
    body: "Add your Shopify store and Gmail account, and Kim gets to work where your customer conversations already live.",
    icon: Clock3,
  },
  {
    label: "Sort the mail",
    title: "Kim reads incoming support emails",
    body: "From ‘Where is my order?’ to ‘Can I exchange this?’, Kim reviews post-purchase messages and checks the information she needs.",
    icon: Inbox,
  },
  {
    label: "Prepare the reply",
    title: "Replies are prepared for you",
    body: "Kim drafts clear, on-brand responses for tracking, returns, refunds, and exchange questions — ready for your review in Gmail.",
    icon: PencilRuler,
  },
  {
    label: "Sign off",
    title: "You review and approve",
    body: "Nothing goes out without your say-so. You stay in control, while Kim does the time-consuming prep work.",
    icon: BadgeCheck,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setActive((a) => (a < steps.length - 1 ? a + 1 : a));
    }, 650);
    return () => window.clearInterval(id);
  }, [inView, prefersReducedMotion]);

  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">How Kim keeps the inbox moving</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">
            Kim is built for the emails that pile up after the sale: order updates, tracking questions, returns, refunds, and exchanges. She reads details, prepares the reply, then leaves it ready for your approval.
          </p>
        </FadeIn>

        <div ref={ref} className="relative mt-12">
          <div className="absolute left-4 right-4 top-6 hidden h-1 rounded-full bg-warm-taupe/25 md:block" />
          <motion.div
            className="absolute left-4 top-6 hidden h-1 rounded-full bg-warm-coral md:block"
            initial={{ width: 0 }}
            animate={{ width: inView ? "calc(100% - 2rem)" : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 2.2, ease: "easeOut" }}
          />

          <motion.div
            className="absolute top-2 hidden text-warm-coral md:block"
            initial={{ left: "1rem", opacity: 0 }}
            animate={inView ? { left: "calc(100% - 2rem)", opacity: 1 } : { left: "1rem", opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 2.2, ease: "easeOut" }}
          >
            <SendHorizonal size={18} />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const show = prefersReducedMotion ? inView : active >= index;
              return (
                <motion.article
                  key={step.label}
                  className="h-full rounded-3xl border border-warm-taupe/35 bg-off-white-paper p-6 shadow-[0_8px_24px_rgba(35,53,71,0.05)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.3 }}
                >
                  <p className="mb-4 inline-flex rounded-full bg-soft-peach px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-navy/70">
                    {step.label}
                  </p>
                  <motion.div
                    className="mb-4 w-fit rounded-xl bg-cream p-2.5 text-muted-teal"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={show ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 14, delay: prefersReducedMotion ? 0 : index * 0.3 + 0.05 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <h3 className="font-display text-2xl tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-ink-navy/80">{step.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <FadeIn>
          <p className="mt-10 text-center font-medium text-ink-navy/80">Less inbox time. More time running the store.</p>
        </FadeIn>
      </div>
    </section>
  );
}
