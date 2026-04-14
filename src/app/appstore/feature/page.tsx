import Image from "next/image";
import MockupWindow from "@/components/ui/MockupWindow";

function StaticMockupDetail() {
  return (
    <div className="rounded-2xl border border-forest/12 bg-paper p-4">
      <div className="mb-3 flex items-center justify-between border-b border-forest/10 pb-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate">Email thread</p>
        <span className="inline-flex rounded-full border border-brass/30 bg-brass/15 px-2.5 py-1 text-[11px] font-medium text-brass">
          Draft Ready
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-forest/12 bg-mist/70 p-3">
          <p className="text-[11px] uppercase tracking-[0.08em] text-slate">From Sarah M.</p>
          <p className="mt-1 text-xs font-medium text-ink">Where is my order?</p>
          <p className="mt-2 text-xs leading-5 text-slate">
            Hi, I ordered a blanket last week and haven&apos;t received tracking info yet. Can you help?
          </p>
        </div>

        <div className="rounded-xl border border-forest/12 bg-paper p-3">
          <p className="text-[11px] uppercase tracking-[0.08em] text-slate">Kim&apos;s reply</p>
          <p className="mt-2 text-xs leading-5 text-slate">
            Hi Sarah, Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post. Your tracking
            number is AP4821736. You can expect delivery within 3–5 business days.
          </p>
          <div className="mt-3">
            <span className="inline-flex rounded-full bg-brass px-3.5 py-1.5 text-xs font-medium text-paper">
              Approve &amp; Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  "AI-drafted replies with real order data",
  "One-click approve, edit, or skip",
  "Learns your voice over time",
  "Connects to your Gmail",
];

export default function AppStoreFeature() {
  return (
    <div className="flex h-[900px] w-[1600px] items-center overflow-hidden bg-cream">
      {/* Left side — 40% */}
      <div className="flex h-full w-[40%] flex-col justify-center pl-20 pr-6">
        <Image
          src="/logo/rk-mark.svg"
          alt="RegardsKim"
          width={48}
          height={48}
          className="mb-6"
        />
        <h1 className="font-display text-[3.2rem] font-bold leading-[1.1] tracking-tight text-forest">
          Your inbox,
          <br />
          handled.
        </h1>
        <p className="mt-5 text-lg leading-7 text-slate">
          Kim reads your customer emails, drafts helpful replies with real order data — you just approve and send.
        </p>
        <ul className="mt-8 space-y-3.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass/12">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brass">
                  <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[0.95rem] font-medium text-forest">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side — 60% */}
      <div className="relative flex h-full w-[60%] items-center justify-center pr-16">
        <div
          className="w-[580px]"
          style={{
            transform: "rotate(1deg) translateY(-12px)",
            filter: "drop-shadow(0 24px 48px rgba(26,26,26,0.12)) drop-shadow(0 8px 16px rgba(26,26,26,0.06))",
          }}
        >
          <MockupWindow title="RegardsKim — Inbox">
            <StaticMockupDetail />
          </MockupWindow>
        </div>
        {/* Decorative accent circle */}
        <div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #e85d3a, transparent 70%)" }}
        />
      </div>
    </div>
  );
}
