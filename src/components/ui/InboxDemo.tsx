"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";

type Status = "Pending" | "Draft Ready" | "Sent" | "Action Required" | "Read";

type DemoEmail = {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  status: Status;
};

const BASE_EMAILS: DemoEmail[] = [
  {
    id: 1,
    sender: "Sarah M.",
    email: "sarahm@email.com",
    subject: "Where is my order?",
    preview: "I ordered a blanket last week and haven't received tracking details yet...",
    time: "2m ago",
    status: "Pending",
  },
  {
    id: 2,
    sender: "James T.",
    email: "jamest@email.com",
    subject: "Can I return this?",
    preview: "I'd like to return my throw and swap for another colour.",
    time: "15m ago",
    status: "Draft Ready",
  },
  {
    id: 3,
    sender: "Emma L.",
    email: "emma.l@email.com",
    subject: "Order #1847 confirmation",
    preview: "Thanks, just confirming my order and estimated delivery time.",
    time: "1h ago",
    status: "Read",
  },
  {
    id: 4,
    sender: "Michael R.",
    email: "michael.r@email.com",
    subject: "Refund request for damaged item",
    preview: "My order arrived damaged. Can I request a refund please?",
    time: "3h ago",
    status: "Action Required",
  },
  {
    id: 5,
    sender: "Lisa K.",
    email: "lisak@email.com",
    subject: "Exchange size request",
    preview: "Can I exchange this for a medium size instead?",
    time: "5h ago",
    status: "Sent",
  },
];

const badgeClass: Record<Status, string> = {
  Pending: "bg-badge-amber/15 text-badge-amber border-badge-amber/35",
  "Draft Ready": "bg-badge-blue/15 text-badge-blue border-badge-blue/35",
  Sent: "bg-badge-green/15 text-badge-green border-badge-green/35",
  "Action Required": "bg-oxblood/15 text-oxblood border-oxblood/35",
  Read: "bg-badge-gray/15 text-badge-gray border-badge-gray/35",
};

export default function InboxDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timers = [
      window.setTimeout(() => setStep(1), 2000),
      window.setTimeout(() => setStep(2), 3200),
      window.setTimeout(() => setStep(3), 6200),
      window.setTimeout(() => setStep(0), 8400),
    ];
    const loop = window.setInterval(() => {
      setStep(1);
      window.setTimeout(() => setStep(2), 1200);
      window.setTimeout(() => setStep(3), 4200);
      window.setTimeout(() => setStep(0), 6400);
    }, 10000);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(loop);
    };
  }, [prefersReducedMotion]);

  const emails = useMemo(() => {
    return BASE_EMAILS.map((item) => {
      if (item.id === 1 && step === 3) {
        return { ...item, status: "Sent" as const, time: "just now" };
      }
      return item;
    });
  }, [step]);

  const showDetail = step === 2;
  const selectedRow = step >= 1 && step <= 2;

  return (
    <div className="rounded-[2rem] border border-forest/12 bg-paper p-4 shadow-[0_18px_42px_rgba(26,26,26,0.08)] sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-forest/10 pb-3">
        <p className="text-xs uppercase tracking-[0.16em] text-slate">Inbox dashboard</p>
        <span className="rounded-full border border-brass/35 bg-brass/10 px-2.5 py-1 text-xs text-brass">Live demo</span>
      </div>

      {!showDetail ? (
        <div className="overflow-hidden rounded-2xl border border-forest/12 bg-paper">
          <div className="grid grid-cols-[30px_1.1fr_1.4fr_70px_130px] gap-2 border-b border-forest/10 bg-mist px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-slate">
            <span></span>
            <span>Sender</span>
            <span>Subject</span>
            <span>Time</span>
            <span>Status</span>
          </div>

          {emails.map((email) => {
            const highlighted = email.id === 1 && selectedRow;
            return (
              <motion.button
                key={email.id}
                type="button"
                className={`grid w-full grid-cols-[30px_1.1fr_1.4fr_70px_130px] gap-2 border-b border-forest/8 px-3 py-3 text-left transition-colors last:border-b-0 ${
                  highlighted ? "bg-mist" : "bg-paper hover:bg-mist/70"
                }`}
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-slate/35 bg-paper text-[10px]">
                  {highlighted ? <Check size={12} className="text-brass" /> : null}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-medium text-ink">{email.sender}</span>
                  <span className="block truncate text-[11px] text-slate">{email.email}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs text-ink">{email.subject}</span>
                  <span className="block truncate text-[11px] text-slate">{email.preview}</span>
                </span>
                <span className="text-xs text-slate">{email.time}</span>
                <span>
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${badgeClass[email.status]}`}>
                    {email.status}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-3 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-forest/15 bg-paper p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-slate">Original email</p>
            <p className="mt-3 text-sm font-medium text-ink">From: Sarah M. (sarahm@email.com)</p>
            <p className="text-sm text-slate">Subject: Where is my order?</p>
            <p className="mt-3 rounded-xl bg-mist p-3 text-sm text-slate">
              Hi, I ordered a blanket last week and haven't received any tracking info. Could you
              please let me know where my order is up to?
            </p>
          </div>

          <div className="rounded-2xl border border-forest/15 bg-paper p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-slate">Kim's draft reply</p>
            <textarea
              readOnly
              className="mt-3 h-28 w-full resize-none rounded-xl border border-forest/10 bg-mist p-3 text-sm text-slate outline-none"
              value={"Hi Sarah,\n\nThanks for reaching out! I've checked your order #1842 and it shipped yesterday via Australia Post. Your tracking number is AP34720981AU and tracking should update within 24 hours.\n\nKind regards,\nKim"}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <motion.button
                type="button"
                className="rounded-full bg-brass px-4 py-2 text-xs font-medium text-paper"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 0.98, 1] }}
                transition={{ duration: 0.7, delay: 2.6 }}
              >
                Approve &amp; Send
              </motion.button>
              <button type="button" className="rounded-full border border-forest/20 bg-paper px-4 py-2 text-xs text-slate">Edit</button>
              <button type="button" className="rounded-full border border-forest/20 bg-paper px-4 py-2 text-xs text-slate">Regenerate</button>
              <button type="button" className="rounded-full border border-forest/20 bg-paper px-4 py-2 text-xs text-slate">Ignore</button>
            </div>

            <div className="mt-3 rounded-xl border border-brass/30 bg-brass/10 p-3 text-xs text-slate">
              <p>
                <strong>Order:</strong> #1842
              </p>
              <p>
                <strong>Value:</strong> $129.00
              </p>
              <p>
                <strong>Tracking:</strong> Shipped via Australia Post
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-xl border border-badge-green/35 bg-badge-green/10 px-3 py-2 text-sm text-badge-green"
        >
          <CheckCircle2 size={16} /> Reply approved and sent
        </motion.div>
      )}
    </div>
  );
}
