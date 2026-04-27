"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* ── Typewriter hook ─────────────────────────────────────────────── */

const REPLY_LINES = [
  "Hi Sarah,",
  "",
  "Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking number is AP4821093AU. It usually takes 24-48 hours for the first scan to appear.",
  "",
  "If it hasn\u2019t updated in a couple of days, let me know and I\u2019ll look into it for you.",
  "",
  "Kind regards,",
  "Kim",
];

const FULL_TEXT = REPLY_LINES.join("\n");
const CHARS_PER_TICK = 2; // characters revealed per frame — fast but readable
const TICK_MS = 18; // ms between frames (~55 chars/sec)

function useTypewriter(trigger: boolean, reducedMotion: boolean | null) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    if (reducedMotion) {
      setDisplayed(FULL_TEXT);
      setDone(true);
      return;
    }
    idx.current = 0;
    setDisplayed("");
    setDone(false);
    const id = setInterval(() => {
      idx.current = Math.min(idx.current + CHARS_PER_TICK, FULL_TEXT.length);
      setDisplayed(FULL_TEXT.slice(0, idx.current));
      if (idx.current >= FULL_TEXT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [trigger, reducedMotion]);

  return { displayed, done };
}

/* ── Intersection Observer — fires once ──────────────────────────── */

function useOnceInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ── Component ───────────────────────────────────────────────────── */

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

  // Typewriter for draft mode only
  const { ref: viewRef, inView } = useOnceInView(0.3);
  const shouldType = mode === "draft" && inView;
  const { displayed, done: typeDone } = useTypewriter(shouldType, prefersReducedMotion);

  // Split displayed text back into lines for paragraph rendering
  const visibleLines = displayed.split("\n");

  return (
    <div ref={viewRef}>
      {/* Column headers */}
      <div className="grid grid-cols-1 gap-x-2.5 sm:grid-cols-2">
        <div className="pb-1.5">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden pb-1.5 sm:block">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Email Replies</span>
        </div>
      </div>

      {/* Two-column card layout */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {/* Left: customer email card */}
        <div className="rounded-xl border border-slate/10 bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)]">
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

          <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
            Hi, I ordered the weighted blanket last week and haven&apos;t received any tracking information yet.
            Can you let me know when it shipped?
          </p>
          <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
            Thanks<br />Sarah
          </p>
        </div>

        {/* Right: Kim's reply card — typewriter on draft, static on approval */}
        <div className="rounded-xl border border-slate/10 bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)]">
          {mode === "draft" ? (
            <>
              {/* Typewriter reply */}
              <div className="min-h-[10rem]">
                {visibleLines.map((line, i) => {
                  if (line === "") return <div key={i} className="h-2" />;
                  // last two non-empty lines are "Kind regards," and "Kim"
                  const isSignoff = i >= visibleLines.length - 2 && (line.startsWith("Kind regards") || line === "Kim");
                  return (
                    <p
                      key={i}
                      className={
                        isSignoff
                          ? "text-[12px] text-slate sm:text-[13px]"
                          : "text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5"
                      }
                    >
                      {line}
                      {/* blinking cursor at end of last visible line */}
                      {i === visibleLines.length - 1 && !typeDone && (
                        <span className="ml-px inline-block h-[0.85em] w-[2px] translate-y-[1px] animate-pulse bg-brass" />
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Buttons fade in once typing finishes */}
              <div
                className={`mt-3 flex justify-center transition-opacity duration-500 ${typeDone ? "opacity-100" : "opacity-0"}`}
              >
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                    Approve &amp; send
                  </span>
                  <span className="rounded-lg border border-slate/15 bg-mist px-3 py-1.5 text-[11px] font-medium text-ink">
                    Edit reply
                  </span>
                  <span className="rounded-lg border border-slate/15 bg-mist px-3 py-1.5 text-[11px] font-medium text-ink">
                    Skip for now
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">Hi Sarah,</p>
              <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
                Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
                number is AP4821093AU. It usually takes 24-48 hours for the first scan to appear.
              </p>
              <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
                If it hasn&apos;t updated in a couple of days, let me know and I&apos;ll look into it for you.
              </p>
              <p className="mt-3 text-[12px] text-slate sm:text-[13px]">Kind regards,<br />Kim</p>

              {/* Action buttons */}
              <div className="mt-3 flex justify-center">
                <AnimatePresence mode="wait">
                  {isApproval && !isDraft ? (
                    <motion.div
                      key="sent"
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700"
                    >
                      <CheckCircle2 size={13} /> Sent ✓
                    </motion.div>
                  ) : (
                    <motion.div key="buttons" className="flex flex-wrap justify-center gap-2">
                      <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                        Approve &amp; send
                      </span>
                      <span className="rounded-lg border border-slate/15 bg-mist px-3 py-1.5 text-[11px] font-medium text-ink">
                        Edit reply
                      </span>
                      <span className="rounded-lg border border-slate/15 bg-mist px-3 py-1.5 text-[11px] font-medium text-ink">
                        Skip for now
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
