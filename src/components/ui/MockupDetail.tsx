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
    <div className="overflow-hidden rounded-2xl border border-forest/12 bg-[#F7F5F0]">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr]">
        {/* Left: customer email */}
        <div className="px-3 py-3 sm:px-4 sm:py-4">
          {/* Sender header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8893A] text-[11px] font-semibold text-white">
                S
              </div>
              <span className="text-[11px] font-medium text-forest sm:text-xs">sarah@gmail.com</span>
            </div>
            <span className="shrink-0 text-[10px] text-slate">2h ago</span>
          </div>

          <p className="mt-2 text-[11px] font-semibold text-forest sm:text-xs">Where is my order #1842?</p>

          <span className="mt-1.5 inline-flex rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-2 py-0.5 text-[10px] font-medium text-[#1A7A3A]">
            Ready to Send
          </span>

          {/* Email body */}
          <div className="mt-3 rounded-xl border border-forest/10 bg-paper p-3">
            <p className="text-[11px] leading-5 text-slate sm:text-xs sm:leading-5">
              Hi, I ordered the weighted blanket last week and haven&apos;t received any tracking information yet.
              Can you let me know when it shipped?
            </p>
            <p className="mt-2 text-[11px] leading-5 text-slate sm:text-xs sm:leading-5">
              Thanks<br />Sarah
            </p>
          </div>
        </div>

        {/* Right: Kim's reply */}
        <div className="border-t border-forest/8 bg-paper/60 px-3 py-3 sm:border-l sm:border-t-0 sm:border-forest/10 sm:px-4 sm:py-4">
          <p className="text-[10px] uppercase tracking-[0.12em] text-slate sm:text-[11px]">Email Replies</p>
          <p className={`mt-1 text-[11px] font-semibold sm:text-xs text-[#1A7A3A]`}>
            {isDraft || !isApproval ? "Ready to send" : "Sent"}
          </p>

          {/* Reply body */}
          <div className="mt-2 rounded-xl border border-forest/10 bg-paper p-3">
            <p className="text-[11px] leading-5 text-slate sm:text-xs sm:leading-5">
              Hi Sarah,
            </p>
            <p className="mt-2 text-[11px] leading-5 text-slate sm:text-xs sm:leading-5">
              Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
              number is AP4821093AU — it usually takes 24–48 hours for the first scan to appear.
            </p>
            <p className="mt-2 text-[11px] leading-5 text-slate sm:text-xs sm:leading-5">
              I&apos;ll keep an eye on it and let you know if anything looks off.
            </p>
            <p className="mt-2 text-[11px] text-slate sm:text-xs">Kind regards, Kim</p>
          </div>

          {/* Action buttons */}
          <div className="mt-3">
            <AnimatePresence mode="wait">
              {isApproval && !isDraft ? (
                <motion.div
                  key="sent"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-3 py-1 text-[11px] font-medium text-[#1A7A3A]"
                >
                  <CheckCircle2 size={13} /> Sent ✓
                </motion.div>
              ) : (
                <motion.div key="buttons" className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-[#1A7A3A] px-3 py-1.5 text-[10px] font-semibold text-white sm:text-[11px]">
                    Approve &amp; send
                  </span>
                  <span className="rounded-lg border border-forest/20 bg-paper px-3 py-1.5 text-[10px] font-medium text-forest sm:text-[11px]">
                    Edit reply
                  </span>
                  <span className="rounded-lg border border-forest/20 bg-paper px-3 py-1.5 text-[10px] font-medium text-forest sm:text-[11px]">
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
