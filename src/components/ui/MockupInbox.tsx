"use client";

import { useState } from "react";

type FilterTone = "tracking" | "returns" | "orders" | "product" | "sales" | "problems" | "none" | "address";

type FilterPill = {
  key: FilterTone;
  label: string;
  tone: FilterTone;
};

const FILTERS: FilterPill[] = [
  { key: "tracking", label: "Tracking", tone: "tracking" },
  { key: "returns", label: "Refunds / Exchanges", tone: "returns" },
  { key: "orders", label: "Order Changes", tone: "orders" },
  { key: "product", label: "Product Help", tone: "product" },
  { key: "sales", label: "Sales", tone: "sales" },
  { key: "problems", label: "Problems / Escalations", tone: "problems" },
  { key: "none", label: "Nothing Needed", tone: "none" },
  { key: "address", label: "Shipping Address Issues", tone: "address" },
];

const pillClass: Record<FilterTone, { active: string; idle: string }> = {
  tracking: {
    active: "bg-emerald-600 text-white border-emerald-600",
    idle: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  returns: {
    active: "bg-orange-600 text-white border-orange-600",
    idle: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  },
  orders: {
    active: "bg-sky-600 text-white border-sky-600",
    idle: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  },
  product: {
    active: "bg-violet-600 text-white border-violet-600",
    idle: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  },
  sales: {
    active: "bg-amber-600 text-white border-amber-600",
    idle: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  problems: {
    active: "bg-rose-600 text-white border-rose-600",
    idle: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  },
  none: {
    active: "bg-slate text-white border-slate",
    idle: "bg-slate/8 text-slate border-slate/15",
  },
  address: {
    active: "bg-teal-600 text-white border-teal-600",
    idle: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800",
  },
};

type EmailCard = {
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  badge: string;
  badgeTone: FilterTone;
  preview: string;
  timeAgo: string;
  replyStatus: string;
  replyPreview: string;
  actions: string[];
};

const EMAILS_BY_FILTER: Record<FilterTone, EmailCard[]> = {
  tracking: [
    {
      avatar: "S",
      avatarColor: "bg-[#E8893A]",
      sender: "sarah@gmail.com",
      subject: "Where is my order #1842?",
      badge: "Tracking",
      badgeTone: "tracking",
      preview: "Hi, I ordered the weighted blanket last week and haven't received any tracking information yet...",
      timeAgo: "2h ago",
      replyStatus: "Reply ready",
      replyPreview: "Order #1842 matched. Tracking link and delivery status are ready to insert.",
      actions: ["Edit reply", "Add tracking link", "Skip for now"],
    },
    {
      avatar: "P",
      avatarColor: "bg-[#7C6BC4]",
      sender: "priya@outlook.com",
      subject: "Tracking link not updating",
      badge: "Tracking",
      badgeTone: "tracking",
      preview: "The tracking page still says pending. Can you check if Australia Post has scanned it yet?",
      timeAgo: "3h ago",
      replyStatus: "Reply ready",
      replyPreview: "Latest tracking status found. Reply can explain the first scan delay and include the link.",
      actions: ["Edit reply", "Add tracking link", "Skip for now"],
    },
    {
      avatar: "L",
      avatarColor: "bg-[#3B9B6D]",
      sender: "liam@gmail.com",
      subject: "Has order #1847 shipped yet?",
      badge: "Tracking",
      badgeTone: "tracking",
      preview: "Just checking whether my order has shipped. I haven't seen a tracking email come through.",
      timeAgo: "5h ago",
      replyStatus: "Reply ready",
      replyPreview: "Fulfilment and tracking number are ready. Insert tracking before sending the reply.",
      actions: ["Edit reply", "Add tracking link", "Skip for now"],
    },
    {
      avatar: "E",
      avatarColor: "bg-[#6B7280]",
      sender: "emma@gmail.com",
      subject: "Delivery taking longer than expected",
      badge: "Tracking",
      badgeTone: "tracking",
      preview: "My package was meant to arrive yesterday but it hasn't shown up. Is there an update?",
      timeAgo: "6h ago",
      replyStatus: "Reply ready",
      replyPreview: "Delivery status is in transit. Add tracking link and shipping policy if needed.",
      actions: ["Edit reply", "Add tracking link", "Skip for now"],
    },
  ],
  returns: [
    {
      avatar: "J",
      avatarColor: "bg-[#7C6BC4]",
      sender: "james.t@outlook.com",
      subject: "Return request for order #1836",
      badge: "Refunds / Exchanges",
      badgeTone: "returns",
      preview: "Thanks, but I'd rather just return it for a refund if that's okay...",
      timeAgo: "3h ago",
      replyStatus: "Reply ready",
      replyPreview: "Return policy and order details are ready. Insert the returns policy before replying.",
      actions: ["Edit reply", "Add policy link", "Skip for now"],
    },
    {
      avatar: "M",
      avatarColor: "bg-[#3B9B6D]",
      sender: "maria@gmail.com",
      subject: "Can I exchange for another size?",
      badge: "Refunds / Exchanges",
      badgeTone: "returns",
      preview: "I ordered the medium but need a large. Can I exchange it instead of refunding?",
      timeAgo: "4h ago",
      replyStatus: "Reply ready",
      replyPreview: "Exchange policy matched. Reply can explain the next step and include the policy link.",
      actions: ["Edit reply", "Add policy link", "Skip for now"],
    },
  ],
  orders: [],
  product: [],
  sales: [],
  problems: [],
  none: [
    {
      avatar: "E",
      avatarColor: "bg-[#6B7280]",
      sender: "email@shopify.com",
      subject: "Order #1847 shipped",
      badge: "Nothing Needed",
      badgeTone: "none",
      preview: "Shipping confirmation for order #1847 placed by Michael R...",
      timeAgo: "5h ago",
      replyStatus: "Nothing needed",
      replyPreview: "Not a customer email. No reply needed.",
      actions: ["Review", "Mark done"],
    },
    {
      avatar: "N",
      avatarColor: "bg-[#8A6F61]",
      sender: "notifications@stripe.com",
      subject: "Payment receipt",
      badge: "Nothing Needed",
      badgeTone: "none",
      preview: "Receipt for payment received on order #1849...",
      timeAgo: "7h ago",
      replyStatus: "Nothing needed",
      replyPreview: "System notification. Regards Kim keeps it out of the customer reply queue.",
      actions: ["Review", "Mark done"],
    },
  ],
  address: [],
};

function ReplyPanel({ card }: { card: EmailCard }) {
  const isNothingNeeded = card.badgeTone === "none";

  return (
    <div className="flex h-full flex-col justify-between px-3 py-3">
      <div>
        <p className={["text-[11px] font-semibold", isNothingNeeded ? "text-slate dark:text-white" : "text-emerald-700 dark:text-emerald-300"].join(" ")}>
          {isNothingNeeded ? "✓ " : ""}
          {card.replyStatus}
        </p>
        <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-slate dark:text-white">
          {card.replyPreview}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {card.actions.map((action, index) => (
          <span
            key={action}
            className={[
              "rounded-lg px-2.5 py-1 text-[10px] font-medium",
              index === 0 && !isNothingNeeded
                ? "bg-emerald-600 font-semibold text-white dark:bg-brass"
                : "border border-slate/15 bg-mist text-ink dark:text-white",
            ].join(" ")}
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate/15 bg-white/70 px-4 py-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1.5px_4px_rgba(0,0,0,0.05)] dark:bg-[#1D2840]/70">
      <p className="text-xs font-semibold text-ink dark:text-white">No {label.toLowerCase()} emails</p>
      <p className="mt-1 text-[11px] leading-4 text-slate dark:text-white">This bucket is clear in the demo inbox.</p>
    </div>
  );
}

export default function MockupInbox() {
  const [activeFilter, setActiveFilter] = useState<FilterTone>("tracking");
  const emails = EMAILS_BY_FILTER[activeFilter];

  return (
    <div>
      <div className="flex flex-wrap gap-2 px-1 pb-3">
        {FILTERS.map((filter) => {
          const active = filter.key === activeFilter;
          const count = EMAILS_BY_FILTER[filter.key].length;

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={[
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(35,53,71,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-1 sm:text-[11px]",
                active ? pillClass[filter.tone].active : pillClass[filter.tone].idle,
                active ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_5px_14px_rgba(35,53,71,0.14)]" : "",
                filter.key === "tracking" ? "kim-demo-nudge" : "",
              ].join(" ")}
            >
              {filter.tone === "address" && <span className="-ml-1 mr-1 text-current opacity-50">|</span>}
              {filter.label} <span className="ml-0.5">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-2.5 px-1 sm:grid-cols-2">
        <div className="pb-1.5">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate dark:text-white sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden pb-1.5 sm:block">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate dark:text-white sm:text-[11px]">Reply ready</span>
        </div>
      </div>

      <div key={activeFilter} className="space-y-2.5 px-1 duration-200 animate-in fade-in-0 slide-in-from-bottom-1">
        {emails.length === 0 ? (
          <EmptyState label={FILTERS.find((filter) => filter.key === activeFilter)?.label ?? "selected"} />
        ) : (
          emails.map((card) => (
            <div key={card.sender + "-" + card.subject} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-slate/10 bg-white px-3 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1D2840] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)] sm:px-4">
                <div className="flex items-start gap-2.5">
                  <div className={["flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white", card.avatarColor].join(" ")}>
                    {card.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-medium text-ink sm:text-xs">{card.sender}</span>
                      <span className="shrink-0 text-[10px] text-slate dark:text-white">{card.timeAgo}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] font-semibold text-ink sm:text-xs">{card.subject}</p>
                    <div className="mt-1.5">
                      <span className={["inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", pillClass[card.badgeTone].idle].join(" ")}>
                        {card.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate dark:text-white">{card.preview}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1D2840] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
                <ReplyPanel card={card} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
