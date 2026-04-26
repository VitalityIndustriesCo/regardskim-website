type FilterPill = {
  label: string;
  count: number;
  active?: boolean;
  tone: "gold" | "green" | "amber" | "muted";
};

const FILTERS: FilterPill[] = [
  { label: "All", count: 4, active: true, tone: "gold" },
  { label: "ready to send", count: 2, tone: "green" },
  { label: "needs your decision", count: 1, tone: "amber" },
  { label: "nothing needed", count: 1, tone: "muted" },
];

const pillClass: Record<FilterPill["tone"], string> = {
  gold: "bg-brass text-white border-brass",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  muted: "bg-slate/8 text-slate border-slate/15",
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
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  muted: "bg-slate/8 text-slate border-slate/15",
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
    replyPreview: "Hi Sarah, your order #1842 shipped yesterday via Australia Post. It should be with you by...",
  },
  {
    avatar: "J",
    avatarColor: "bg-[#7C6BC4]",
    sender: "james.t@outlook.com",
    subject: "Re: Return request for order #1836",
    badge: "Needs Your Decision",
    badgeTone: "amber",
    preview: "Thanks, but I'd rather just return it for a refund if that's okay...",
    timeAgo: "3h ago",
    replyStatus: "action",
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
    replyPreview: "Hi Michael, I'm really sorry about that. Could you send a photo of the damage? I'd love to get a...",
  },
];

function ReplyPanel({ card }: { card: EmailCard }) {
  if (card.replyStatus === "nothing") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 px-3 py-4">
        <p className="text-center text-xs font-medium text-slate">✓ Nothing needed</p>
        <p className="text-[11px] leading-4 text-slate/70">
          Not a customer email. No reply needed.
        </p>
        <div className="flex justify-center gap-2">
          <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Review</span>
          <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Mark done</span>
        </div>
      </div>
    );
  }

  const isAction = card.replyStatus === "action";

  return (
    <div className="flex h-full flex-col justify-between px-3 py-3">
      <div>
        {isAction ? (
          <p className="text-center text-[11px] font-medium text-amber-600">
            Action needed ⚡️
          </p>
        ) : (
          card.replyPreview && (
            <p className="line-clamp-3 text-[11px] leading-4 text-slate">
              {card.replyPreview}
            </p>
          )
        )}
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {isAction ? (
          <>
            <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Write reply</span>
            <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Skip for now</span>
          </>
        ) : (
          <>
            <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white">Approve &amp; send</span>
            <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Edit reply</span>
            <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink">Skip for now</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function MockupInbox() {
  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 px-1 pb-3">
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
      <div className="grid grid-cols-1 gap-x-2.5 px-1 sm:grid-cols-2">
        <div className="pb-1.5">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden pb-1.5 sm:block">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate sm:text-[11px]">Email Replies</span>
        </div>
      </div>

      {/* Email rows as cards */}
      <div className="space-y-2.5 px-1">
        {EMAILS.map((card) => (
          <div key={`${card.sender}-${card.subject}`} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {/* Left: customer email card */}
            <div className="rounded-xl border border-slate/12 bg-white px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:px-4">
              <div className="flex items-start gap-2.5">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${card.avatarColor}`}>
                  {card.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-medium text-ink sm:text-xs">{card.sender}</span>
                    <span className="shrink-0 text-[10px] text-slate">{card.timeAgo}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-ink sm:text-xs">{card.subject}</p>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate">{card.preview}</p>
                  {/* Badge */}
                  <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold ${badgeToneClass[card.badgeTone]}`}>
                    {card.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Kim's reply card */}
            <div className="rounded-xl border border-slate/12 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <ReplyPanel card={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
