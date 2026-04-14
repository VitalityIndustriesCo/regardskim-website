const customerEmail =
  '"Hi, just checking on order #4721 — the tracking link hasn\'t updated in three days. Has it actually shipped?"';

const genericReply =
  "Hi there, thanks for reaching out. I'm sorry for the confusion. Shipping updates can sometimes take a little longer than expected. Please keep an eye on your tracking link, and if it still doesn't update soon, contact the shipping carrier or reply here for further help.";

function GenericReplyCard() {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-forest/15 bg-paper p-7 shadow-[0_12px_40px_rgba(26,26,26,0.10)]">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-forest/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
          Generic AI
        </span>
        <span className="rounded-full bg-forest/4 px-3 py-1 text-[11px] font-medium text-slate">
          One-size-fits-all
        </span>
      </div>
      <p className="mt-5 flex-1 text-[0.95rem] leading-7 text-slate">{genericReply}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-forest/10 bg-forest/4 px-3 py-1 text-[11px] text-slate">❌ No order data</span>
        <span className="rounded-full border border-forest/10 bg-forest/4 px-3 py-1 text-[11px] text-slate">❌ Generic tone</span>
        <span className="rounded-full border border-forest/10 bg-forest/4 px-3 py-1 text-[11px] text-slate">❌ No next steps</span>
      </div>
    </article>
  );
}

function KimReplyCard() {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border-2 border-brass/40 bg-gradient-to-br from-paper via-paper to-cream/80 p-7 shadow-[0_16px_44px_rgba(26,26,26,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Kim
        </span>
        <span className="rounded-full border border-brass/20 bg-brass/10 px-3 py-1 text-xs font-semibold text-brass">
          Draft — Ready for approval
        </span>
      </div>

      <div className="mt-5 flex-1 rounded-[1.25rem] border border-brass/15 bg-paper/90 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">To</span>
            <span className="font-medium text-forest">Sarah M.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Subject</span>
            <span className="font-medium text-forest">Re: Order #4721 — Shipping Update</span>
          </div>
        </div>

        <div className="my-4 h-px bg-brass/15" />

        <div className="space-y-3 text-[0.95rem] leading-7 text-forest">
          <p>Hey Sarah, thanks for checking in.</p>
          <p>
            I looked up order #4721 — it was dispatched from our warehouse on March 29 via Australia Post. Tracking is
            currently showing <span className="font-medium">&ldquo;label created&rdquo;</span>, which means the carrier
            hasn&apos;t scanned it yet.
          </p>
          <p>
            I&apos;ll keep an eye on it — if it hasn&apos;t moved by tomorrow, I&apos;ll follow up with the carrier and
            let you know.
          </p>
          <span className="inline-flex items-center rounded-full border border-brass/25 bg-brass/10 px-4 py-2 text-sm font-semibold text-brass">
            View tracking →
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-brass/20 bg-brass/8 px-3 py-1 text-[11px] font-medium text-brass">✓ Real order data</span>
        <span className="rounded-full border border-brass/20 bg-brass/8 px-3 py-1 text-[11px] font-medium text-brass">✓ Your tone of voice</span>
        <span className="rounded-full border border-brass/20 bg-brass/8 px-3 py-1 text-[11px] font-medium text-brass">✓ Proactive follow-up</span>
      </div>
    </article>
  );
}

export default function AppStoreComparison() {
  return (
    <div className="flex h-[900px] w-[1600px] flex-col overflow-hidden bg-cream">
      <div className="flex flex-1 flex-col items-center justify-center px-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">See the difference</p>
          <h2 className="mt-2 font-display text-[2.8rem] font-bold tracking-tight text-forest">
            Same question. Very different answer.
          </h2>
        </div>

        {/* Customer email */}
        <div className="mt-8 w-full max-w-[1200px] rounded-[1.25rem] border border-forest/15 bg-paper px-6 py-4 text-center shadow-[0_8px_30px_rgba(26,26,26,0.06)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">Customer email</p>
          <p className="mt-2 text-base leading-7 text-forest">{customerEmail}</p>
        </div>

        {/* Side by side replies */}
        <div className="mt-6 grid w-full max-w-[1200px] grid-cols-2 gap-6">
          <GenericReplyCard />
          <KimReplyCard />
        </div>
      </div>
    </div>
  );
}
