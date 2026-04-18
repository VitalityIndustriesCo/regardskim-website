type FilterPill = {
  label: string;
  count: number;
  active?: boolean;
  tone: "dark" | "green" | "amber" | "muted";
};

const FILTERS: FilterPill[] = [
  { label: "All", count: 4, active: true, tone: "dark" },
  { label: "ready to send", count: 2, tone: "green" },
  { label: "needs your decision", count: 1, tone: "amber" },
  { label: "nothing needed", count: 1, tone: "muted" },
];

const pillClass: Record<FilterPill["tone"], string> = {
  dark: "bg-forest text-paper border-forest",
  green: "bg-[#DEF5E5] text-[#1A7A3A] border-[#B5E2C2]",
  amber: "bg-[#FFF3E0] text-[#C06A1E] border-[#F5D5A8]",
  muted: "bg-mist text-slate border-forest/12",
};

type EmailCard = {
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  badge: string;
  badgeTone: "green" | "amber" | "muted";
  preview: string;
  timeAgo: string;
  replyStatus: "ready" | "action" | "nothing";
  replyPreview?: string;
};

const badgeToneClass = {
  green: "bg-[#DEF5E5] text-[#1A7A3A] border-[#B5E2C2]",
  amber: "bg-[#FFF3E0] text-[#C06A1E] border-[#F5D5A8]",
  muted: "bg-mist text-slate border-forest/12",
};

const EMAILS: EmailCard[] = [
  {
    avatar: "S",
    avatarColor: "bg-[#E8893A]",
    sender: "sarah@gmail.com",
    subject: "Where is my order #1842?",
    badge: "Ready to Send",
    badgeTone: "green",
    preview: "Hi, I ordered the weighted blanket last week and haven't received any tracking information yet...",
    timeAgo: "2h ago",
    replyStatus: "ready",
    replyPreview: "Hi Sarah, your order #1842 shipped yesterday via Australia Post. Your tracking number is...",
  },
  {
    avatar: "J",
    avatarColor: "bg-[#7C6BC4]",
    sender: "james.t@outlook.com",
    subject: "Return request for order #1836",
    badge: "Needs Your Decision",
    badgeTone: "amber",
    preview: "I'd like to return the throw pillow, it's not quite the right colour for my living room...",
    timeAgo: "3h ago",
    replyStatus: "action",
    replyPreview: "Hi James, I can help with that! Your order is within our 30-day return window...",
  },
  {
    avatar: "E",
    avatarColor: "bg-[#6B7280]",
    sender: "email@shopify.com",
    subject: "Order #1847 shipped",
    badge: "Nothing Needed",
    badgeTone: "muted",
    preview: "Shipping confirmation for order #1847 placed by Michael R...",
    timeAgo: "5h ago",
    replyStatus: "nothing",
  },
  {
    avatar: "M",
    avatarColor: "bg-[#3B9B6D]",
    sender: "michael.r@gmail.com",
    subject: "Refund for damaged item",
    badge: "Ready to Send",
    badgeTone: "green",
    preview: "The package arrived but the item inside was broken. Can I get a refund?",
    timeAgo: "6h ago",
    replyStatus: "ready",
    replyPreview: "Hi Michael, I'm sorry to hear that. I've processed a full refund for your order...",
  },
];

function ReplyPanel({ card }: { card: EmailCard }) {
  if (card.replyStatus === "nothing") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-3 py-4 text-center">
        <p className="text-xs font-medium text-slate">✓ Nothing needed</p>
        <p className="text-[11px] leading-4 text-slate/70">
          Kim checked this email and doesn&apos;t think a reply is needed.
        </p>
        <div className="flex gap-2">
          <span className="rounded-lg border border-forest/12 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Review</span>
          <span className="rounded-lg border border-forest/12 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Mark done</span>
        </div>
      </div>
    );
  }

  const isAction = card.replyStatus === "action";

  return (
    <div className="flex h-full flex-col justify-between px-3 py-3">
      <div>
        {isAction ? (
          <p className="text-[11px] font-medium text-[#C06A1E]">
            Merchant input needed
          </p>
        ) : (
          card.replyPreview && (
            <p className="line-clamp-3 text-[11px] leading-4 text-slate">
              {card.replyPreview}
            </p>
          )
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {isAction ? (
          <>
            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Write reply</span>
            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Skip for now</span>
          </>
        ) : (
          <>
            <span className="rounded-lg bg-[#1A7A3A] px-2.5 py-1 text-[10px] font-semibold text-white">Approve &amp; send</span>
            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Edit reply</span>
            <span className="rounded-lg border border-forest/15 bg-paper px-2.5 py-1 text-[10px] font-medium text-forest">Skip for now</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function MockupInbox() {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest/12 bg-[#F7F5F0]">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 border-b border-forest/10 px-3 py-3 sm:px-4">
        {FILTERS.map((f) => (
          <span
            key={f.label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium sm:text-[11px] ${pillClass[f.tone]}`}
          >
            {f.active ? f.label : f.count} {!f.active && f.label}
            {f.active && <span className="ml-0.5">({f.count})</span>}
          </span>
        ))}
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-1 gap-0 border-b border-forest/10 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="px-3 py-2 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden border-l border-forest/10 px-3 py-2 sm:block sm:px-4">
          <span className="text-[10px] uppercase tracking-[0.12em] text-slate sm:text-[11px]">Email Replies</span>
        </div>
      </div>

      {/* Email rows */}
      <div className="divide-y divide-forest/8">
        {EMAILS.map((card) => (
          <div key={`${card.sender}-${card.subject}`} className="grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr]">
            {/* Left: customer email */}
            <div className="px-3 py-3 sm:px-4">
              <div className="flex items-start gap-2.5">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${card.avatarColor}`}>
                  {card.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-medium text-forest sm:text-xs">{card.sender}</span>
                    <span className="shrink-0 text-[10px] text-slate">{card.timeAgo}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-forest sm:text-xs">{card.subject}</p>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate">{card.preview}</p>
                </div>
              </div>
            </div>

            {/* Right: Kim's reply */}
            <div className="border-t border-forest/8 bg-paper/60 sm:border-l sm:border-t-0 sm:border-forest/10">
              <ReplyPanel card={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
