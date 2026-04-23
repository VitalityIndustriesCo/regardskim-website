type FilterPill = {
  label: string;
  count: number;
  active?: boolean;
  tone: "primary" | "green" | "amber" | "muted";
};

const FILTERS: FilterPill[] = [
  { label: "All", count: 4, active: true, tone: "primary" },
  { label: "ready to send", count: 2, tone: "green" },
  { label: "needs your decision", count: 1, tone: "amber" },
  { label: "nothing needed", count: 1, tone: "muted" },
];

const pillClass: Record<FilterPill["tone"], string> = {
  primary: "bg-[#1E293B] text-white",
  green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border border-amber-200",
  muted: "bg-gray-100 text-gray-500 border border-gray-200",
};

type EmailCard = {
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  preview: string;
  timeAgo: string;
  replyStatus: "ready" | "action" | "nothing";
  replyPreview?: string;
};

const EMAILS: EmailCard[] = [
  {
    avatar: "S",
    avatarColor: "bg-orange-400",
    sender: "sarah@gmail.com",
    subject: "Where is my order #1842?",
    preview: "Hi, I ordered the weighted blanket last week and haven't received any tracking information yet...",
    timeAgo: "2h ago",
    replyStatus: "ready",
    replyPreview: "Hi Sarah, your order #1842 shipped yesterday via Australia Post. Your tracking number is…",
  },
  {
    avatar: "J",
    avatarColor: "bg-violet-400",
    sender: "james.t@outlook.com",
    subject: "Return request for order #1836",
    preview: "I'd like to return the throw pillow, it's not quite the right colour for my living room...",
    timeAgo: "3h ago",
    replyStatus: "action",
  },
  {
    avatar: "E",
    avatarColor: "bg-gray-400",
    sender: "email@shopify.com",
    subject: "Order #1847 shipped",
    preview: "Shipping confirmation for order #1847 placed by Michael R...",
    timeAgo: "5h ago",
    replyStatus: "nothing",
  },
  {
    avatar: "M",
    avatarColor: "bg-emerald-500",
    sender: "michael.r@gmail.com",
    subject: "Refund for damaged item",
    preview: "The package arrived but the item inside was broken. Can I get a refund?",
    timeAgo: "6h ago",
    replyStatus: "ready",
    replyPreview: "Hi Michael, I'm sorry to hear that. I've processed a full refund for your order…",
  },
];

function StatusBadge({ status }: { status: EmailCard["replyStatus"] }) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Ready to send
      </span>
    );
  }
  if (status === "action") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 sm:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Needs your decision
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-400 sm:text-[11px]">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      Nothing needed
    </span>
  );
}

function ReplyColumn({ card }: { card: EmailCard }) {
  if (card.replyStatus === "nothing") {
    return (
      <div className="flex h-full flex-col justify-center px-3 py-3 sm:px-4">
        <p className="text-[11px] leading-4 text-gray-400 italic">
          Kim checked this email — no reply needed.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500 shadow-sm">Review</span>
          <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500 shadow-sm">Mark done</span>
        </div>
      </div>
    );
  }

  if (card.replyStatus === "action") {
    return (
      <div className="flex h-full flex-col justify-center px-3 py-3 sm:px-4">
        <p className="text-[11px] font-medium text-amber-600">
          ⚡ Needs your input
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-md bg-[#1E293B] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">Write reply</span>
          <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500 shadow-sm">Skip for now</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between px-3 py-3 sm:px-4">
      <p className="line-clamp-2 text-[11px] leading-4 text-gray-600">
        {card.replyPreview}
      </p>
      <div className="mt-2.5 flex gap-1.5">
        <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">Approve &amp; send</span>
        <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500 shadow-sm">Edit</span>
      </div>
    </div>
  );
}

export default function MockupInbox() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 px-3 py-3 sm:px-4">
        {FILTERS.map((f) => (
          <span
            key={f.label}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium sm:text-[11px] ${pillClass[f.tone]}`}
          >
            {f.active ? f.label : f.count} {!f.active && f.label}
            {f.active && <span className="ml-0.5">({f.count})</span>}
          </span>
        ))}
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-1 border-b border-gray-100 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="px-3 py-2 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden border-l border-gray-100 px-3 py-2 sm:block sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:text-[11px]">Kim&apos;s Reply</span>
        </div>
      </div>

      {/* Email rows */}
      <div className="divide-y divide-gray-100">
        {EMAILS.map((card) => (
          <div key={`${card.sender}-${card.subject}`} className="grid grid-cols-1 transition-colors hover:bg-gray-50/60 sm:grid-cols-[1.1fr_0.9fr]">
            {/* Left: customer email */}
            <div className="px-3 py-3 sm:px-4">
              <div className="flex items-start gap-2.5">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${card.avatarColor}`}>
                  {card.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-medium text-gray-900 sm:text-xs">{card.sender}</span>
                    <span className="shrink-0 text-[10px] text-gray-400">{card.timeAgo}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-gray-900 sm:text-xs">{card.subject}</p>
                  <p className="mt-1 line-clamp-1 text-[11px] leading-4 text-gray-500">{card.preview}</p>
                  <div className="mt-2">
                    <StatusBadge status={card.replyStatus} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Kim's reply */}
            <div className="border-t border-gray-100 bg-gray-50/40 sm:border-l sm:border-t-0">
              <ReplyColumn card={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
