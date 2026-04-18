"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flag, PenLine, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

/* ── Annotation badges (floating labels) ─────────────────────────── */

function AnnotationBadge({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-forest/10 bg-paper px-3 py-2 text-xs font-medium text-forest shadow-[0_14px_30px_rgba(26,26,26,0.08)] md:flex ${className ?? ""}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/10 text-brass">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

/* ── Cursor SVG ──────────────────────────────────────────────────── */

function Cursor() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
      <path
        d="M5.5 3v17.25l5.468-5.468h8.782L5.5 3z"
        fill="#1a1a1a"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Types ────────────────────────────────────────────────────────── */

type EmailCard = {
  id: string;
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  badge: string;
  badgeTone: "green" | "amber" | "muted";
  preview: string;
  timeAgo: string;
  replyPreview: string;
};

const EMAILS: EmailCard[] = [
  {
    id: "sarah",
    avatar: "S",
    avatarColor: "bg-[#E8893A]",
    sender: "sarah@gmail.com",
    subject: "Where is my order #1842?",
    badge: "Ready to Send",
    badgeTone: "green",
    preview:
      "Hi, I ordered the weighted blanket last week and haven\u2019t received any tracking information yet...",
    timeAgo: "2h ago",
    replyPreview:
      "Hi Sarah, your order #1842 shipped yesterday via Australia Post. Your tracking number is AP4821093AU...",
  },
  {
    id: "james",
    avatar: "J",
    avatarColor: "bg-[#7C6BC4]",
    sender: "james.t@outlook.com",
    subject: "Return request for order #1836",
    badge: "Ready to Send",
    badgeTone: "green",
    preview:
      "I\u2019d like to return the throw pillow, it\u2019s not quite the right colour for my living room...",
    timeAgo: "3h ago",
    replyPreview:
      "Hi James, I can help with that! Your order is within our 30-day return window. I\u2019ve started the process...",
  },
  {
    id: "michael",
    avatar: "M",
    avatarColor: "bg-[#3B9B6D]",
    sender: "michael.r@gmail.com",
    subject: "Refund for damaged item",
    badge: "Ready to Send",
    badgeTone: "green",
    preview:
      "The package arrived but the item inside was broken. Can I get a refund?",
    timeAgo: "6h ago",
    replyPreview:
      "Hi Michael, I\u2019m sorry to hear that. I\u2019ve processed a full refund for your order #1839...",
  },
];

/* ── Animation timeline ──────────────────────────────────────────── */
// Phase 0: idle inbox (2s)
// Phase 1: cursor moves to "Approve & send" on first email (0.8s)
// Phase 2: button press effect (0.3s)
// Phase 3: "Sent ✓" flash, then email slides out (1.2s)
// Phase 4: pause with remaining emails (2s)
// Phase 5: reset — all emails reappear, loop

const PHASE_DURATIONS = [2000, 800, 300, 1200, 2500];
const TOTAL_CYCLE = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

export default function HeroInboxPreview() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const resetCycle = useCallback(() => {
    setPhase(0);
    setDismissed(false);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase < PHASE_DURATIONS.length) {
      timeout = setTimeout(() => {
        if (phase === 2) {
          // After button press, mark as sent
          setPhase(3);
        } else if (phase === 3) {
          // After sent flash, dismiss
          setDismissed(true);
          setPhase(4);
        } else if (phase === 4) {
          // Reset loop
          resetCycle();
        } else {
          setPhase(phase + 1);
        }
      }, PHASE_DURATIONS[phase]);
    }

    return () => clearTimeout(timeout);
  }, [phase, prefersReducedMotion, resetCycle]);

  const showCursor = phase >= 1 && phase <= 2 && !prefersReducedMotion;
  const showSent = phase === 3;
  const visibleEmails = dismissed ? EMAILS.slice(1) : EMAILS;
  const firstEmail = EMAILS[0];

  return (
    <div className="relative mt-14 w-full overflow-x-clip px-2 sm:px-0">
      <div className="relative mx-auto max-w-4xl">
        <AnnotationBadge
          icon={<Flag size={14} strokeWidth={2} />}
          label="Sorted and ready to go"
          className="-top-4 right-4 z-10 lg:-right-16"
        />
        <AnnotationBadge
          icon={<PenLine size={14} strokeWidth={2} />}
          label="Drafts in your voice"
          className="-bottom-4 left-4 z-10 lg:-left-16"
        />

        <div className="rounded-[1.5rem] border border-forest/12 bg-paper shadow-[0_24px_60px_rgba(26,26,26,0.10)] sm:rounded-[2rem]">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-forest/10 bg-mist/70 px-3 py-3 sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EE8A72]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F1C75B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8FCB81]" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate">Inbox</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 border-b border-forest/10 bg-[#F7F5F0] px-3 py-2.5 sm:px-5">
            <span className="inline-flex items-center gap-1 rounded-full border border-forest bg-forest px-2.5 py-1 text-[10px] font-medium text-paper sm:text-[11px]">
              All ({visibleEmails.length})
            </span>
            <span className="inline-flex rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-2.5 py-1 text-[10px] font-medium text-[#1A7A3A] sm:text-[11px]">
              {visibleEmails.length} ready to send
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-1 gap-0 border-b border-forest/10 bg-[#F7F5F0] sm:grid-cols-[1.1fr_0.9fr]">
            <div className="px-3 py-2 sm:px-5">
              <span className="text-[10px] uppercase tracking-[0.12em] text-slate sm:text-[11px]">Customer Email</span>
            </div>
            <div className="hidden border-l border-forest/10 px-3 py-2 sm:block sm:px-5">
              <span className="text-[10px] uppercase tracking-[0.12em] text-slate sm:text-[11px]">Email Replies</span>
            </div>
          </div>

          {/* Email rows */}
          <div className="relative bg-[#F7F5F0]">
            <AnimatePresence mode="popLayout">
              {visibleEmails.map((card) => {
                const isFirst = card.id === firstEmail.id;
                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-1 border-b border-forest/8 last:border-b-0 sm:grid-cols-[1.1fr_0.9fr]"
                  >
                    {/* Left: customer email */}
                    <div className="px-3 py-3 sm:px-5">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${card.avatarColor}`}
                        >
                          {card.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-[11px] font-medium text-forest sm:text-xs">
                              {card.sender}
                            </span>
                            <span className="shrink-0 text-[10px] text-slate">{card.timeAgo}</span>
                          </div>
                          <p className="mt-0.5 truncate text-[11px] font-semibold text-forest sm:text-xs">
                            {card.subject}
                          </p>
                          <span className="mt-1.5 inline-flex rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-2 py-0.5 text-[10px] font-medium text-[#1A7A3A]">
                            {card.badge}
                          </span>
                          <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate">
                            {card.preview}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: reply */}
                    <div className="relative border-t border-forest/8 bg-paper/60 px-3 py-3 sm:border-l sm:border-t-0 sm:border-forest/10 sm:px-5">
                      <p className="text-[11px] font-semibold text-[#1A7A3A]">
                        {isFirst && showSent ? "✓ Sent" : "✓ Draft ready to send"}
                      </p>
                      <p className="mt-2 line-clamp-3 text-[11px] leading-4 text-slate">
                        {card.replyPreview}
                      </p>

                      {/* Buttons */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {isFirst && showSent ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-3 py-1 text-[11px] font-medium text-[#1A7A3A]"
                          >
                            <CheckCircle2 size={13} /> Sent ✓
                          </motion.div>
                        ) : (
                          <>
                            <span
                              className={`rounded-lg bg-[#1A7A3A] px-2.5 py-1 text-[10px] font-semibold text-white transition-transform ${
                                isFirst && phase === 2 ? "scale-95" : ""
                              }`}
                            >
                              Approve &amp; send
                            </span>
                            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">
                              Edit reply
                            </span>
                            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">
                              Skip for now
                            </span>
                          </>
                        )}
                      </div>

                      {/* Animated cursor */}
                      {isFirst && showCursor && (
                        <motion.div
                          className="pointer-events-none absolute z-20"
                          initial={{ left: "70%", top: "20%" }}
                          animate={{ left: "6%", top: "72%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                          <Cursor />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mobile annotations */}
            <div className="flex justify-center py-3 md:hidden">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-forest/10 bg-paper px-3 py-2 text-[11px] font-medium text-forest shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/10 text-brass">
                  <Flag size={12} strokeWidth={2} />
                </span>
                Sorted and ready to go
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
