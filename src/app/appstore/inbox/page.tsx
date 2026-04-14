import MockupWindow from "@/components/ui/MockupWindow";

type Status = "Draft Ready" | "Action Required" | "Read" | "Pending";

type InboxRow = {
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  status: Status;
};

const ROWS: InboxRow[] = [
  { sender: "Sarah M.", subject: "Where is my order?", snippet: "Hi, I ordered a blanket last week and haven't received tracking...", time: "2m ago", status: "Draft Ready" },
  { sender: "James T.", subject: "Return request", snippet: "I'd like to return the scarf I purchased. It's not what I expected...", time: "14m ago", status: "Draft Ready" },
  { sender: "Lisa K.", subject: "Wrong size received", snippet: "Hi there, I received a medium but I ordered a large. Can you help?", time: "28m ago", status: "Action Required" },
  { sender: "Michael R.", subject: "Refund for damaged item", snippet: "The vase arrived broken. I'd like a refund please...", time: "1h ago", status: "Draft Ready" },
  { sender: "Emma W.", subject: "Product question", snippet: "Does the wool throw come in navy? I can only see grey on the site...", time: "2h ago", status: "Read" },
  { sender: "David P.", subject: "Shipping update", snippet: "Your shipment has been dispatched via Australia Post...", time: "3h ago", status: "Read" },
];

const badgeClass: Record<Status, string> = {
  Pending: "bg-badge-amber/15 text-badge-amber border-badge-amber/35",
  "Draft Ready": "bg-forest/15 text-forest border-forest/30",
  "Action Required": "bg-oxblood/15 text-oxblood border-oxblood/35",
  Read: "bg-badge-gray/15 text-badge-gray border-badge-gray/35",
};

function CalloutArrow() {
  return (
    <div className="absolute -right-[200px] top-[148px] flex items-center gap-3">
      <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
        <path d="M60 15 C40 15 30 15 8 15" stroke="#e85d3a" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
        <path d="M12 10 L4 15 L12 20" stroke="#e85d3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div className="rounded-xl border border-brass/25 bg-paper px-4 py-2.5 shadow-lg">
        <p className="text-xs font-semibold text-brass">Smart status badges</p>
        <p className="mt-0.5 text-[11px] text-slate">See what needs attention at a glance</p>
      </div>
    </div>
  );
}

export default function AppStoreInbox() {
  return (
    <div className="flex h-[900px] w-[1600px] flex-col items-center justify-center overflow-hidden bg-cream">
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,240,232,1), rgba(245,240,232,0.7), rgba(255,255,255,0.4))",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Your command centre</p>
        <h2 className="mt-3 font-display text-[2.8rem] font-bold tracking-tight text-forest">
          All your customer emails. One smart inbox.
        </h2>
        <p className="mt-3 text-lg text-slate">
          Every message organised, prioritised, and ready for action.
        </p>

        <div className="relative mt-10">
          <div
            className="w-[1100px]"
            style={{
              filter: "drop-shadow(0 20px 50px rgba(26,26,26,0.10)) drop-shadow(0 8px 20px rgba(26,26,26,0.05))",
            }}
          >
            <MockupWindow title="RegardsKim — Inbox">
              <div className="overflow-hidden bg-paper">
                {/* Column headers */}
                <div className="grid grid-cols-[200px_1fr_100px_140px] gap-4 border-b border-forest/10 bg-mist px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-slate">
                  <span>Sender</span>
                  <span>Subject</span>
                  <span>Time</span>
                  <span>Status</span>
                </div>

                {ROWS.map((row) => (
                  <div
                    key={`${row.sender}-${row.subject}`}
                    className="grid grid-cols-[200px_1fr_100px_140px] items-center gap-4 border-b border-forest/8 px-5 py-4 last:border-b-0"
                  >
                    <span className="truncate text-sm font-medium text-ink">{row.sender}</span>
                    <div className="min-w-0">
                      <span className="block truncate text-sm text-forest">{row.subject}</span>
                      <span className="block truncate text-xs text-slate/70">{row.snippet}</span>
                    </div>
                    <span className="text-xs text-slate">{row.time}</span>
                    <span className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badgeClass[row.status]}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </MockupWindow>
          </div>
          <CalloutArrow />
        </div>
      </div>
    </div>
  );
}
