type FilterPill = {
  label: string;
  count: number;
  active?: boolean;
  tone: "tracking" | "returns" | "orders" | "product" | "sales" | "problems" | "none" | "address";
};

const FILTERS: FilterPill[] = [
  { label: "Tracking", count: 4, active: true, tone: "tracking" },
  { label: "Refunds / Exchanges", count: 0, tone: "returns" },
  { label: "Order Changes", count: 0, tone: "orders" },
  { label: "Product Help", count: 0, tone: "product" },
  { label: "Sales", count: 0, tone: "sales" },
  { label: "Problems / Escalations", count: 0, tone: "problems" },
  { label: "Nothing Needed", count: 0, tone: "none" },
  { label: "Shipping Address Issues", count: 0, tone: "address" },
];

const pillClass: Record<FilterPill["tone"], string> = {
  tracking: "bg-emerald-600 text-white border-emerald-600",
  returns: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  orders: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  product: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  sales: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  problems: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  none: "bg-slate/8 text-slate border-slate/15",
  address: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800",
};

type EmailCard = {
  avatar: string;
  avatarColor: string;
  sender: string;
  subject: string;
  badge: string;
  preview: string;
  timeAgo: string;
  replyPreview: string;
};

const EMAILS: EmailCard[] = [
  {
    avatar: "S",
    avatarColor: "bg-[#E8893A]",
    sender: "sarah@gmail.com",
    subject: "Where is my order #1842?",
    badge: "Tracking",
    preview: "Hi, I ordered the weighted blanket last week and haven't received any tracking information yet...",
    timeAgo: "2h ago",
    replyPreview: "Order #1842 matched. Tracking link and delivery status are ready to insert.",
  },
  {
    avatar: "P",
    avatarColor: "bg-[#7C6BC4]",
    sender: "priya@outlook.com",
    subject: "Tracking link not updating",
    badge: "Tracking",
    preview: "The tracking page still says pending. Can you check if Australia Post has scanned it yet?",
    timeAgo: "3h ago",
    replyPreview: "Latest tracking status found. Reply can explain the first scan delay and include the link.",
  },
  {
    avatar: "L",
    avatarColor: "bg-[#3B9B6D]",
    sender: "liam@gmail.com",
    subject: "Has order #1847 shipped yet?",
    badge: "Tracking",
    preview: "Just checking whether my order has shipped. I haven't seen a tracking email come through.",
    timeAgo: "5h ago",
    replyPreview: "Fulfilment and tracking number are ready. Insert tracking before sending the reply.",
  },
  {
    avatar: "E",
    avatarColor: "bg-[#6B7280]",
    sender: "emma@gmail.com",
    subject: "Delivery taking longer than expected",
    badge: "Tracking",
    preview: "My package was meant to arrive yesterday but it hasn't shown up. Is there an update?",
    timeAgo: "6h ago",
    replyPreview: "Delivery status is in transit. Add tracking link and shipping policy if needed.",
  },
];

function ReplyPanel({ card }: { card: EmailCard }) {
  return (
    <div className="flex h-full flex-col justify-between px-3 py-3">
      <div>
        <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">Reply ready</p>
        <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-slate dark:text-white">
          {card.replyPreview}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        <span className="rounded-lg bg-emerald-600 dark:bg-brass px-2.5 py-1 text-[10px] font-semibold text-white">Edit reply</span>
        <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink dark:text-white">Add tracking link</span>
        <span className="rounded-lg border border-slate/15 bg-mist px-2.5 py-1 text-[10px] font-medium text-ink dark:text-white">Skip for now</span>
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
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium sm:text-[11px] ${pillClass[f.tone]} ${!f.active ? "opacity-80" : ""}`}
          >
            {f.tone === "address" && <span className="-ml-1 mr-1 text-slate/50 dark:text-white/50">|</span>}
            {f.label} <span className="ml-0.5">({f.count})</span>
          </span>
        ))}
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-1 gap-x-2.5 px-1 sm:grid-cols-2">
        <div className="pb-1.5">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate dark:text-white sm:text-[11px]">Customer Emails</span>
        </div>
        <div className="hidden pb-1.5 sm:block">
          <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate dark:text-white sm:text-[11px]">Reply ready</span>
        </div>
      </div>

      {/* Email rows as cards */}
      <div className="space-y-2.5 px-1">
        {EMAILS.map((card) => (
          <div key={`${card.sender}-${card.subject}`} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {/* Left: customer email card */}
            <div className="rounded-xl border border-slate/10 bg-white px-3 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1D2840] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)] sm:px-4">
              <div className="flex items-start gap-2.5">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${card.avatarColor}`}>
                  {card.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-medium text-ink sm:text-xs">{card.sender}</span>
                    <span className="shrink-0 text-[10px] text-slate dark:text-white">{card.timeAgo}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-ink sm:text-xs">{card.subject}</p>
                  <div className="mt-1.5">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{card.badge}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate dark:text-white">{card.preview}</p>

                </div>
              </div>
            </div>

            {/* Right: AI support workspace */}
            <div className="rounded-xl border border-slate/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.10),0_1.5px_4px_rgba(0,0,0,0.06)] dark:bg-[#1D2840] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
              <ReplyPanel card={card} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
