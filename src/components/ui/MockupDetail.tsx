"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type MockupDetailProps = {
  mode?: "draft" | "approval";
};

const badgeClass = {
  draft: "bg-brass/15 text-brass border-brass/30",
  sent: "bg-badge-green/15 text-badge-green border-badge-green/35",
};

export default function MockupDetail({ mode = "draft" }: MockupDetailProps) {
  const prefersReducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (mode !== "approval" || prefersReducedMotion) return;

    const timer = window.setTimeout(() => setSent(true), 1400);
    return () => window.clearTimeout(timer);
  }, [mode, prefersReducedMotion]);

  const isDraft = mode === "draft" || (!prefersReducedMotion && !sent);

  return (
    <div className="rounded-2xl border border-forest/12 bg-paper p-3 sm:p-4">
      <div className="mb-3 flex flex-col gap-2 border-b border-forest/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate sm:text-xs">Email thread</p>
        <span
          className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium ${isDraft ? badgeClass.draft : badgeClass.sent}`}
        >
          {isDraft ? "Draft Ready" : "Sent"}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-forest/12 bg-mist/70 p-3">
          <p className="text-[11px] uppercase tracking-[0.08em] text-slate">From Sarah M.</p>
          <p className="mt-1 text-xs font-medium text-ink">Where is my order?</p>
          <p className="mt-2 text-xs leading-5 text-slate">
            Hi, I ordered a blanket last week and haven&apos;t received tracking...
          </p>
        </div>

        <div className="rounded-xl border border-forest/12 bg-paper p-3">
          <p className="text-[11px] uppercase tracking-[0.08em] text-slate">Kim&apos;s reply</p>
          <p className="mt-2 text-xs leading-5 text-slate">
            Hi Sarah, Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
            number is AP4821...
          </p>

          {mode === "approval" && (
            <div className="mt-3">
              <AnimatePresence mode="wait">
                {isDraft ? (
                  <motion.button
                    key="approve"
                    type="button"
                    className="rounded-full bg-brass px-3.5 py-1.5 text-xs font-medium text-paper"
                    animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 0.98, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.6 }}
                  >
                    Approve &amp; Send
                  </motion.button>
                ) : (
                  <motion.div
                    key="sent"
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-badge-green/35 bg-badge-green/10 px-3 py-1.5 text-xs font-medium text-badge-green"
                  >
                    <CheckCircle2 size={14} /> Sent ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
