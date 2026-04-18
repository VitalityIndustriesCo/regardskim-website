type Status = "Pending" | "Draft Ready" | "Action Required" | "Read";
type Category = "WISMO" | "Return" | "Refund" | "Product Q" | "Complaint" | "All";

type InboxRow = {
  sender: string;
  subject: string;
  status: Status;
  category: Category;
};

const ROWS: InboxRow[] = [
  { sender: "Sarah M.", subject: "Where is my order?", status: "Draft Ready", category: "WISMO" },
  { sender: "James T.", subject: "Return request", status: "Draft Ready", category: "Return" },
  { sender: "Order #1847 shipped", subject: "Shipping update", status: "Read", category: "WISMO" },
  { sender: "Michael R.", subject: "Refund for damaged item", status: "Action Required", category: "Refund" },
];

const badgeClass: Record<Status, string> = {
  Pending: "bg-badge-amber/15 text-badge-amber border-badge-amber/35",
  "Draft Ready": "bg-forest/15 text-forest border-forest/30",
  "Action Required": "bg-oxblood/15 text-oxblood border-oxblood/35",
  Read: "bg-badge-gray/15 text-badge-gray border-badge-gray/35",
};

const categoryBadgeClass: Record<Category, string> = {
  All: "bg-forest/10 text-forest border-forest/20",
  WISMO: "bg-[#E8893A]/12 text-[#C06A1E] border-[#E8893A]/30",
  Return: "bg-[#7C6BC4]/12 text-[#5B4FA0] border-[#7C6BC4]/30",
  Refund: "bg-oxblood/12 text-oxblood border-oxblood/30",
  "Product Q": "bg-[#3B9B6D]/12 text-[#2A7A53] border-[#3B9B6D]/30",
  Complaint: "bg-[#D4564E]/12 text-[#B33E37] border-[#D4564E]/30",
};

const SIDEBAR_CATEGORIES: { label: Category; count: number }[] = [
  { label: "All", count: 4 },
  { label: "WISMO", count: 2 },
  { label: "Refund", count: 1 },
  { label: "Return", count: 1 },
  { label: "Product Q", count: 0 },
  { label: "Complaint", count: 0 },
];

export default function MockupInbox() {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest/12 bg-paper">
      <div className="flex">
        {/* Category sidebar */}
        <div className="hidden w-[130px] shrink-0 border-r border-forest/10 bg-mist/50 sm:block md:w-[140px]">
          <div className="border-b border-forest/10 px-3 py-2">
            <span className="text-[10px] uppercase tracking-[0.1em] text-slate sm:text-[11px]">Categories</span>
          </div>
          <div className="space-y-0.5 p-1.5">
            {SIDEBAR_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.label}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] transition ${
                  idx === 0
                    ? "bg-forest/8 font-medium text-forest"
                    : "text-slate hover:bg-forest/4"
                }`}
              >
                <span>{cat.label}</span>
                {cat.count > 0 && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                    idx === 0 ? "bg-forest/15 text-forest" : "bg-forest/8 text-slate"
                  }`}>
                    {cat.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inbox table */}
        <div className="min-w-0 flex-1">
          {/* Mobile category pills */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-forest/10 bg-mist/50 px-3 py-2 sm:hidden">
            {SIDEBAR_CATEGORIES.slice(0, 4).map((cat, idx) => (
              <span
                key={cat.label}
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  idx === 0
                    ? "border-forest/20 bg-forest/10 text-forest"
                    : "border-forest/10 bg-paper text-slate"
                }`}
              >
                {cat.label} {cat.count > 0 && `(${cat.count})`}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-2 border-b border-forest/10 bg-mist px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-slate sm:grid-cols-[1fr_1.2fr_90px_110px] sm:text-[11px]">
            <span>Sender</span>
            <span>Subject</span>
            <span className="hidden sm:block">Category</span>
            <span className="hidden sm:block">Status</span>
          </div>

          {ROWS.map((row) => (
            <div
              key={`${row.sender}-${row.subject}`}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-2 border-b border-forest/8 px-3 py-3 last:border-b-0 sm:grid-cols-[1fr_1.2fr_90px_110px]"
            >
              <span className="truncate text-xs font-medium text-ink">{row.sender}</span>
              <div className="min-w-0 space-y-1 sm:space-y-0">
                <span className="block truncate text-xs text-slate">{row.subject}</span>
                {/* Mobile: show category + status inline */}
                <div className="flex flex-wrap gap-1 sm:hidden">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryBadgeClass[row.category]}`}>
                    {row.category}
                  </span>
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${badgeClass[row.status]}`}>
                    {row.status}
                  </span>
                </div>
              </div>
              <span className="hidden sm:block">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${categoryBadgeClass[row.category]}`}>
                  {row.category}
                </span>
              </span>
              <span className="hidden sm:block">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${badgeClass[row.status]}`}>
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
