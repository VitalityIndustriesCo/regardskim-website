"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Flag, PenLine } from "lucide-react";
import type { ReactNode } from "react";

/* ── Floating annotation badges ──────────────────────────────────── */

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

/* ── Cursor ──────────────────────────────────────────────────────── */

function Cursor() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
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

/* ── Data ─────────────────────────────────────────────────────────── */

type EmailRow = {
  id: string;
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  badge: string;
  badgeTone: "green" | "amber" | "muted";
  preview: string;
  timeAgo: string;
  replyType: "draft" | "decision" | "nothing";
  replyPreview: string;
};

const EMAILS: EmailRow[] = [
  {
    id: "sarah",
    avatar: "S",
    avatarColor: "bg-[#E8893A]",
    sender: "sarah@gmail.com",
    subject: "Where is my order #1842?",
    badge: "Ready to Send",
    badgeTone: "green",
    preview: "Hi, I ordered the weighted blanket last week and haven\u2019t received any tracking information yet...",
    timeAgo: "2h ago",
    replyType: "draft",
    replyPreview: "Hi Sarah, your order #1842 shipped yesterday via Australia Post. Your tracking number is...",
  },
  {
    id: "james",
    avatar: "J",
    avatarColor: "bg-[#3B9B6D]",
    sender: "james.t@outlook.com",
    subject: "Return request for order #1836",
    badge: "Needs Your Decision",
    badgeTone: "amber",
    preview: "I\u2019d like to return the throw pillow, it\u2019s not quite the right colour for my living room...",
    timeAgo: "3h ago",
    replyType: "decision",
    replyPreview: "Hi James, I can help with that! Your order is within our 30\u2011day return window...",
  },
  {
    id: "shopify",
    avatar: "E",
    avatarColor: "bg-[#6B7280]",
    sender: "email@shopify.com",
    subject: "Order #1847 shipped",
    badge: "Nothing Needed",
    badgeTone: "muted",
    preview: "Shipping confirmation for order #1847 placed by Michael R...",
    timeAgo: "5h ago",
    replyType: "nothing",
    replyPreview: "Kim checked this email and doesn\u2019t think a reply is needed.",
  },
  {
    id: "michael",
    avatar: "M",
    avatarColor: "bg-[#E8893A]",
    sender: "michael.r@gmail.com",
    subject: "Refund for damaged item",
    badge: "Ready to Send",
    badgeTone: "green",
    preview: "The package arrived but the item inside was broken. Can I get a refund?",
    timeAgo: "6h ago",
    replyType: "draft",
    replyPreview: "Hi Michael, I\u2019m sorry to hear that. I\u2019ve processed a full refund for your order...",
  },
];

const badgeToneClass = {
  green: "border-[#B5E2C2] bg-[#DEF5E5] text-[#1A7A3A]",
  amber: "border-[#F5D5A8] bg-[#FFF3E0] text-[#C06A1E]",
  muted: "border-forest/12 bg-mist text-slate",
};

/* ── Animation phases ────────────────────────────────────────────── */
// 0: idle (2s)
// 1: cursor moves to Approve & send (0.8s)
// 2: button press (0.3s)
// 3: sent flash + email exits (1.4s)
// 4: pause with 3 remaining (2.5s)
// 5: (reset)

// Phase 0: idle inbox (2.5s)
// Phase 1: cursor moves to button (0.8s)
// Phase 2: button press (0.4s)
// Phase 3: sent flash (0.8s)
// Phase 4: email slides out (0.8s) — dismissed set here
// Phase 5: pause with 3 remaining (3s)
// Phase 6: reset
const PHASE_MS = [2500, 800, 400, 800, 800, 3000];

/* ── Component ───────────────────────────────────────────────────── */

export default function HeroInboxPreview() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const reset = useCallback(() => {
    setDismissed(false);
    setPhase(0);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => {
      if (phase === 3) {
        // After sent flash, start dismiss
        setDismissed(true);
        setPhase(4);
      } else if (phase === 5) {
        reset();
      } else {
        setPhase((p) => p + 1);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, prefersReducedMotion, reset]);

  const showCursor = phase >= 1 && phase <= 2;
  const showSent = phase === 3;
  const visible = dismissed ? EMAILS.slice(1) : EMAILS;

  // Filter pill counts
  const readyCount = visible.filter((e) => e.replyType === "draft").length;
  const decisionCount = visible.filter((e) => e.replyType === "decision").length;
  const nothingCount = visible.filter((e) => e.replyType === "nothing").length;

  return (
    <div className="relative mt-14 w-full overflow-x-clip px-2 sm:px-0">
      <div className="relative mx-auto max-w-5xl">
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

        {/* Window shell */}
        <div className="rounded-[1.5rem] border border-forest/12 bg-[#FAF8F5] shadow-[0_24px_60px_rgba(26,26,26,0.10)] sm:rounded-[2rem]">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-forest/10 bg-[#F3F1ED] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EE8A72]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F1C75B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8FCB81]" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate">Inbox</p>
            <span className="w-10" />
          </div>

          {/* Content area */}
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-forest bg-forest px-3 py-1.5 text-[11px] font-semibold text-paper sm:text-xs">
                All ({visible.length})
              </span>
              <span className="inline-flex rounded-full border border-[#B5E2C2] bg-[#DEF5E5] px-3 py-1.5 text-[11px] font-semibold text-[#1A7A3A] sm:text-xs">
                {readyCount} ready to send
              </span>
              {decisionCount > 0 && (
                <span className="inline-flex rounded-full border border-[#F5D5A8] bg-[#FFF3E0] px-3 py-1.5 text-[11px] font-semibold text-[#C06A1E] sm:text-xs">
                  {decisionCount} needs your decision
                </span>
              )}
              {nothingCount > 0 && (
                <span className="inline-flex rounded-full border border-forest/12 bg-mist px-3 py-1.5 text-[11px] font-semibold text-slate sm:text-xs">
                  {nothingCount} nothing needed
                </span>
              )}
            </div>

            {/* Column headers */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-xs">
                Customer Emails
              </p>
              <p className="hidden text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate sm:block sm:text-xs">
                Email Replies
              </p>
            </div>

            {/* Divider */}
            <div className="mt-2 h-px bg-forest/10" />

            {/* Rows */}
            <AnimatePresence initial={false}>
              {visible.map((card) => {
                const isTarget = card.id === "sarah";
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="border-b border-forest/8 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 gap-0 py-4 sm:grid-cols-2 sm:gap-6">
                      {/* Left — customer email */}
                      <div>
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${card.avatarColor}`}
                          >
                            {card.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[13px] font-medium text-forest">{card.sender}</span>
                              <span className="shrink-0 text-[11px] text-slate">{card.timeAgo}</span>
                            </div>
                            <p className="mt-0.5 text-[13px] font-bold text-forest">{card.subject}</p>
                            <p className="mt-2 text-[13px] leading-5 text-slate">{card.preview}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right — reply */}
                      <div className="relative mt-3 flex flex-col items-center text-center sm:mt-0">
                        {/* Reply preview */}
                        {card.replyType === "draft" && (
                          <p className="text-[13px] leading-5 text-slate">
                            {card.replyPreview}
                          </p>
                        )}
                        {card.replyType === "decision" && (
                          <p className="text-[13px] font-medium text-[#C06A1E]">
                            Action needed ⚡️
                          </p>
                        )}
                        {card.replyType === "nothing" && (
                          <p className="text-[13px] text-slate">
                            Kim checked this and no reply is needed.
                          </p>
                        )}

                        {/* Buttons */}
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {isTarget && showSent ? (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#B5E2C2] bg-[#DEF5E5] px-3 py-1.5 text-[12px] font-semibold text-[#1A7A3A]"
                            >
                              <CheckCircle2 size={14} /> Sent ✓
                            </motion.span>
                          ) : card.replyType === "decision" ? (
                            <>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Write reply
                              </span>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Skip for now
                              </span>
                            </>
                          ) : card.replyType === "nothing" ? (
                            <>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Review
                              </span>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Mark done
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                className={`rounded-lg bg-[#1A7A3A] px-3 py-1.5 text-[12px] font-bold text-white transition-transform ${isTarget && phase === 2 ? "scale-[0.94]" : ""}`}
                              >
                                Approve &amp; send
                              </span>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Edit reply
                              </span>
                              <span className="rounded-lg border border-forest/15 bg-paper px-3 py-1.5 text-[12px] font-medium text-forest">
                                Skip for now
                              </span>
                            </>
                          )}
                        </div>

                        {/* Cursor */}
                        {isTarget && showCursor && !prefersReducedMotion && (
                          <motion.div
                            className="pointer-events-none absolute z-20"
                            initial={{ right: "10%", bottom: "60%" }}
                            animate={{ left: "10%", bottom: "12%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <Cursor />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
