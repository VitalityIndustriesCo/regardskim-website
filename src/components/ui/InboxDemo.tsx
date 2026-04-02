"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

type DemoEmail = {
  id: number;
  subject: string;
  from: string;
  body: string;
};

const emails: DemoEmail[] = [
  { id: 1, subject: "Where is my order?", from: "Sarah M.", body: "Order #4821 still says in transit." },
  { id: 2, subject: "Can I return this?", from: "James T.", body: "Need to swap for a different size." },
  { id: 3, subject: "Tracking hasn't moved", from: "Priya K.", body: "Any update on ETA to Sydney?" },
  { id: 4, subject: "Wrong item received", from: "Eli R.", body: "Can I exchange this for the right one?" },
];

export default function InboxDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => setLoop((v) => v + 1), 8000);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const itemDelay = prefersReducedMotion ? 0 : 0.45;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-warm-taupe/40 bg-soft-peach p-4 shadow-[0_18px_40px_rgba(35,53,71,0.08)] sm:p-6">
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-warm-coral/20 blur-xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={loop}
          className="grid min-h-[350px] gap-4 md:grid-cols-[1.15fr_0.85fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="rounded-2xl border border-warm-taupe/35 bg-off-white-paper p-4"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-navy/60">Inbox</p>
              <span className="rounded-full bg-cream px-2 py-1 text-xs text-ink-navy/70">4 new</span>
            </div>

            <div className="space-y-2">
              {emails.map((email, index) => (
                <motion.div
                  key={email.id}
                  className={`rounded-xl border p-3 ${index === 1 ? "border-warm-coral/50 bg-soft-peach/60" : "border-warm-taupe/25 bg-cream/70"}`}
                  initial={{ x: prefersReducedMotion ? 0 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * itemDelay, duration: 0.4 }}
                >
                  <p className="text-sm font-medium text-ink-navy">{email.subject} <span className="font-normal text-ink-navy/65">— {email.from}</span></p>
                  <p className="mt-1 text-xs text-ink-navy/65">{email.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-warm-coral/35 bg-off-white-paper p-4"
            initial={{ x: prefersReducedMotion ? 0 : 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 2.2, duration: 0.45 }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-ink-navy/60">Draft reply</p>
            <p className="mt-3 rounded-lg bg-cream p-3 text-sm text-ink-navy/80">
              Hi James — absolutely. I can help with that exchange. Reply with your order number and preferred size and we’ll sort this for you.
            </p>

            <motion.button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-warm-coral px-4 py-2 text-sm font-medium text-off-white-paper shadow-[0_4px_0_0_#c86354]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 3.1, duration: 0.25 }}
              whileTap={{ scale: 0.96 }}
            >
              Approve &amp; Send
            </motion.button>

            <motion.div
              className="mt-4 flex items-center gap-2 rounded-xl border border-muted-teal/35 bg-muted-teal/10 px-3 py-2 text-sm text-ink-navy"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 3.8, duration: 0.35 }}
            >
              <CheckCircle2 size={16} className="text-muted-teal" />
              Sent ✔
              <Sparkles size={15} className="ml-auto text-butter-gold" />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
