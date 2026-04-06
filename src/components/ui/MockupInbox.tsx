type Status = "Pending" | "Draft Ready" | "Action Required" | "Read";

type InboxRow = {
  sender: string;
  subject: string;
  status: Status;
};

const ROWS: InboxRow[] = [
  { sender: "Sarah M.", subject: "Where is my order?", status: "Draft Ready" },
  { sender: "James T.", subject: "Return request", status: "Draft Ready" },
  { sender: "Order #1847 shipped", subject: "Shipping update", status: "Read" },
  { sender: "Michael R.", subject: "Refund for damaged item", status: "Action Required" },
];

const badgeClass: Record<Status, string> = {
  Pending: "bg-badge-amber/15 text-badge-amber border-badge-amber/35",
  "Draft Ready": "bg-forest/15 text-forest border-forest/30",
  "Action Required": "bg-oxblood/15 text-oxblood border-oxblood/35",
  Read: "bg-badge-gray/15 text-badge-gray border-badge-gray/35",
};

export default function MockupInbox() {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest/12 bg-paper">
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-2 border-b border-forest/10 bg-mist px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-slate sm:grid-cols-[1.1fr_1.4fr_130px] sm:text-[11px]">
        <span>Sender</span>
        <span>Subject</span>
        <span className="hidden sm:block">Status</span>
      </div>

      {ROWS.map((row) => (
        <div
          key={`${row.sender}-${row.subject}`}
          className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-2 border-b border-forest/8 px-3 py-3 last:border-b-0 sm:grid-cols-[1.1fr_1.4fr_130px]"
        >
          <span className="truncate text-xs font-medium text-ink">{row.sender}</span>
          <div className="min-w-0 space-y-1 sm:space-y-0">
            <span className="block truncate text-xs text-slate">{row.subject}</span>
            <span className="sm:hidden">
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${badgeClass[row.status]}`}>
                {row.status}
              </span>
            </span>
          </div>
          <span className="hidden sm:block">
            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${badgeClass[row.status]}`}>
              {row.status}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
