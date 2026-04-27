"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

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
const CHARS_PER_TICK = 2;
const TICK_MS = 18;

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

/* ── Send animation phases ───────────────────────────────────────── */
// idle → pressing → whoosh → sent
type SendPhase = "idle" | "pressing" | "whoosh" | "sent";

function useSendSequence(trigger: boolean, reducedMotion: boolean | null) {
  const [phase, setPhase] = useState<SendPhase>("idle");
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    if (reducedMotion) {
      setPhase("sent");
      return;
    }

    // Timeline: 800ms idle → 400ms pressing → 600ms whoosh → sent
    const t1 = setTimeout(() => setPhase("pressing"), 800);
    const t2 = setTimeout(() => setPhase("whoosh"), 1200);
    const t3 = setTimeout(() => setPhase("sent"), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [trigger, reducedMotion]);

  return phase;
}

/* ── Component ───────────────────────────────────────────────────── */

type MockupDetailProps = {
  mode?: "draft" | "approval";
};

export default function MockupDetail({ mode = "draft" }: MockupDetailProps) {
  const prefersReducedMotion = useReducedMotion();

  // Scroll trigger (shared by both modes)
  const { ref: viewRef, inView } = useOnceInView(0.3);

  // Typewriter for draft mode
  const shouldType = mode === "draft" && inView;
  const { displayed, done: typeDone } = useTypewriter(shouldType, prefersReducedMotion);
  const visibleLines = displayed.split("\n");

  // Send sequence for approval mode
  const sendPhase = useSendSequence(mode === "approval" && inView, prefersReducedMotion);

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
        <div className="rounded-xl border border-slate/10 bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1B2436] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
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

        {/* Right: Kim's reply card */}
        <div className="rounded-xl border border-slate/10 bg-white px-4 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1B2436] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)] overflow-hidden">
          {mode === "draft" ? (
            /* ── Draft mode: typewriter ────────────────────────── */
            <>
              <div className="min-h-[10rem]">
                {visibleLines.map((line, i) => {
                  if (line === "") return <div key={i} className="h-2" />;
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
                      {i === visibleLines.length - 1 && !typeDone && (
                        <span className="ml-px inline-block h-[0.85em] w-[2px] translate-y-[1px] animate-pulse bg-brass" />
                      )}
                    </p>
                  );
                })}
              </div>
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
            /* ── Approval mode: send animation ────────────────── */
            <div className="relative">
              {/* Reply text — whooshes up when sending */}
              <motion.div
                animate={
                  sendPhase === "whoosh"
                    ? { y: -20, opacity: 0, scale: 0.97 }
                    : sendPhase === "sent"
                      ? { y: 0, opacity: 1, scale: 1 }
                      : { y: 0, opacity: 1, scale: 1 }
                }
                transition={
                  sendPhase === "whoosh"
                    ? { duration: 0.5, ease: "easeIn" }
                    : sendPhase === "sent"
                      ? { duration: 0.4, ease: "easeOut" }
                      : { duration: 0 }
                }
              >
                <p className="text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">Hi Sarah,</p>
                <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
                  Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
                  number is AP4821093AU. It usually takes 24-48 hours for the first scan to appear.
                </p>
                <p className="mt-2 text-[12px] leading-5 text-slate sm:text-[13px] sm:leading-5">
                  If it hasn&apos;t updated in a couple of days, let me know and I&apos;ll look into it for you.
                </p>
                <p className="mt-3 text-[12px] text-slate sm:text-[13px]">Kind regards,<br />Kim</p>
              </motion.div>

              {/* Send icon that flies out during whoosh */}
              <AnimatePresence>
                {sendPhase === "whoosh" && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, y: -30 }}
                    exit={{ opacity: 0, y: -60, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Send size={24} className="text-brass" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons / Sent badge */}
              <div className="mt-3 flex justify-center">
                <AnimatePresence mode="wait">
                  {sendPhase === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                    >
                      <CheckCircle2 size={13} /> Sent ✓
                    </motion.div>
                  ) : (
                    <motion.div
                      key="buttons"
                      className="flex flex-wrap justify-center gap-2"
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                      <motion.span
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white"
                        animate={
                          sendPhase === "pressing"
                            ? { scale: 0.92, boxShadow: "0 0 0 3px rgba(16,185,129,0.3)" }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.15 }}
                      >
                        Approve &amp; send
                      </motion.span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
