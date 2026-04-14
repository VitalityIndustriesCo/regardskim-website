function DraftCard({ title, isEdited }: { title: string; isEdited: boolean }) {
  return (
    <div
      className={`flex-1 rounded-[1.25rem] border bg-paper p-5 ${
        isEdited ? "border-brass/30 shadow-[0_8px_30px_rgba(232,93,58,0.08)]" : "border-forest/12"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{title}</p>
        {isEdited && (
          <span className="rounded-full border border-brass/20 bg-brass/10 px-2.5 py-0.5 text-[11px] font-medium text-brass">
            Edited
          </span>
        )}
      </div>

      <div className="my-3 h-px bg-forest/8" />

      <div className="space-y-3 text-sm leading-6">
        <p className="text-forest">Hey Sarah, thanks for checking in.</p>
        <p className="text-forest">
          I looked up order #4721 — it was dispatched from our warehouse on March 29 via Australia Post.
          Tracking is currently showing &ldquo;label created&rdquo;, which means the carrier hasn&apos;t scanned it yet.
        </p>
        {isEdited ? (
          <>
            <p className="text-forest">
              I&apos;ll keep an eye on it — if it hasn&apos;t moved by tomorrow, I&apos;ll chase it up and let you know
              {" "}<span className="rounded bg-brass/12 px-1 py-0.5 text-brass">👍</span>
            </p>
            <div className="pt-1 text-forest">
              <p>
                <span className="line-through text-slate/50">Kind regards,</span>{" "}
                <span className="rounded bg-brass/12 px-1 py-0.5 font-medium text-brass">Cheers,</span>
              </p>
              <p>
                <span className="line-through text-slate/50">Kim — Support Team</span>{" "}
                <span className="rounded bg-brass/12 px-1 py-0.5 font-medium text-brass">The team at Woolly Co</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-forest">
              I&apos;ll keep an eye on it — if it hasn&apos;t moved by tomorrow afternoon, I&apos;ll follow up with the
              carrier directly and let you know.
            </p>
            <div className="pt-1 text-forest">
              <p>Kind regards,</p>
              <p>Kim — Support Team</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LearnedPatternCard() {
  return (
    <div className="rounded-[1.25rem] border-2 border-brass/30 bg-gradient-to-br from-paper via-paper to-cream/60 p-6 shadow-[0_12px_40px_rgba(26,26,26,0.08)]">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brass/12">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-brass">
            <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">Learned pattern</p>
          <p className="text-[11px] text-slate">Extracted from your edit</p>
        </div>
      </div>

      <div className="mt-3 space-y-2.5">
        <div className="rounded-xl border border-brass/15 bg-paper px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-brass">
                <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-forest">Use casual sign-off instead of formal</p>
              <p className="mt-0.5 text-xs text-slate">&ldquo;Cheers&rdquo; instead of &ldquo;Kind regards&rdquo;</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-brass/15 bg-paper px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-brass">
                <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-forest">Sign as store name, not &ldquo;Kim&rdquo;</p>
              <p className="mt-0.5 text-xs text-slate">&ldquo;The team at Woolly Co&rdquo; instead of &ldquo;Kim — Support Team&rdquo;</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-brass/15 bg-paper px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-brass">
                <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-forest">Keep tone conversational</p>
              <p className="mt-0.5 text-xs text-slate">&ldquo;chase it up&rdquo; instead of &ldquo;follow up with the carrier directly&rdquo;</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate">
        Kim applies these patterns to all future drafts automatically.
      </p>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <path d="M20 8v20M12 22l8 8 8-8" stroke="#e85d3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AppStoreLearning() {
  return (
    <div className="flex h-[900px] w-[1600px] flex-col overflow-hidden bg-cream">
      <div className="flex flex-1 flex-col items-center justify-center px-20 pb-10 pt-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Adaptive intelligence</p>
          <h2 className="mt-2 font-display text-[2.8rem] font-bold tracking-tight text-forest">
            Kim learns from every edit you make.
          </h2>
          <p className="mt-3 text-lg text-slate">
            Edit a draft, and Kim remembers your preferences for next time.
          </p>
        </div>

        {/* Drafts side by side */}
        <div className="mt-6 flex w-full max-w-[1100px] gap-6">
          <DraftCard title="Kim's original draft" isEdited={false} />
          <div className="flex flex-col items-center justify-center px-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M16 24h16M28 18l6 6-6 6" stroke="#e85d3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <DraftCard title="Your edited version" isEdited={true} />
        </div>

        {/* Arrow down */}
        <div className="py-2">
          <ArrowDown />
        </div>

        {/* Learned pattern card */}
        <div className="w-full max-w-[700px]">
          <LearnedPatternCard />
        </div>
      </div>
    </div>
  );
}
