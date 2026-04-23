"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type MockupDetailProps = {
  mode?: "draft" | "approval";
};

export default function MockupDetail({ mode = "draft" }: MockupDetailProps) {
  const prefersReducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (mode !== "approval" || prefersReducedMotion) return;
    const timer = window.setTimeout(() => setSent(true), 1800);
    return () => window.clearTimeout(timer);
  }, [mode, prefersReducedMotion]);

  const isDraft = mode === "draft" || (!prefersReducedMotion && !sent);
  const isApproval = mode === "approval";

  return (
    <div className="overflow-hidden rounded-2xl border-2 bg-cream" style={{ borderColor: '#D4AA60' }}>
      {/* Column headers */}
      <div className="grid grid-cols-1 gap-0 border-b-2 sm:grid-cols-2" style={{ borderColor: '#D4AA60' }}>
        <div className="px-4 py-2.5">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden border-l-2 px-4 py-2.5 sm:block" style={{ borderColor: '#D4AA60' }}>
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Email Replies</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Left: customer email */}
        <div className="px-4 py-4">
          {/* Sender header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8893A] text-[11px] font-semibold text-white">
                S
              </div>
              <span className="text-[12px] font-medium text-ink sm:text-[13px]">sarah@gmail.com</span>
            </div>
            <span className="shrink-0 text-[11px] text-slate">2h ago</span>
          </div>

          <p className="mt-2 text-[12px] font-bold text-ink sm:text-[13px]">Where is my order #1842?</p>

          {/* Email body */}
          <div className="mt-3 rounded-xl border border-mist bg-cream p-3">
            <p className="text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
              Hi, I ordered the weighted blanket last week and haven&apos;t received any tracking information yet.
              Can you let me know when it shipped?
            </p>
            <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
              Thanks<br />Sarah
            </p>
          </div>
        </div>

        {/* Right: Kim's reply */}
        <div className="border-t-2 px-4 py-4 sm:border-l-2 sm:border-t-0" style={{ borderColor: '#D4AA60' }}>
          {/* Reply body */}
          <div className="rounded-xl border border-mist bg-cream p-3">
            <p className="text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
              Hi Sarah,
            </p>
            <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
              Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
              number is AP4821093AU — it usually takes 24–48 hours for the first scan to appear.
            </p>
            <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
              I&apos;ll keep an eye on it and let you know if anything looks off.
            </p>
            <p className="mt-2 text-[12px] text-slate sm:text-[13px]">Kind regards, Kim</p>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex justify-center">
            <AnimatePresence mode="wait">
              {isApproval && !isDraft ? (
                <motion.div
                  key="sent"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AA60] bg-brass/20 px-3 py-1 text-[11px] font-medium text-brass"
                >
                  <CheckCircle2 size={13} /> Sent ✓
                </motion.div>
              ) : (
                <motion.div key="buttons" className="flex flex-wrap justify-center gap-2">
                  <span className="rounded-lg bg-brass px-3 py-1.5 text-[11px] font-semibold text-forest">
                    Approve &amp; send
                  </span>
                  <span className="rounded-lg border border-mist bg-cream px-3 py-1.5 text-[11px] font-medium text-ink">
                    Edit reply
                  </span>
                  <span className="rounded-lg border border-mist bg-cream px-3 py-1.5 text-[11px] font-medium text-ink">
                    Skip for now
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
