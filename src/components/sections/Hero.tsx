import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Hero() {
  return (
    <section id="top" className="paper-grain overflow-hidden py-16 md:py-24">
      <div className="section-shell grid items-center gap-14 md:grid-cols-2">
        <FadeIn>
          <p className="mb-5 inline-flex rounded-full border border-warm-taupe/40 bg-off-white-paper px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-navy/70">
            Trusted by growing Shopify stores
          </p>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Post-purchase emails, handled.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-navy/85 md:text-xl">
            RegardsKim helps Shopify stores stay on top of order updates, tracking questions, returns, refunds, and exchanges — with polished draft replies ready for approval in Gmail.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral">
              Start with Kim
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              See how it works
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-ink-navy/75">
            <li>• Connect Shopify and Gmail</li>
            <li>• Review draft replies before they send</li>
            <li>• From order questions to returns, Kim keeps things tidy</li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative">
            <div className="halftone-dots absolute -right-7 -top-8 h-28 w-28 rounded-full opacity-40" />
            <div className="rounded-[2rem] border border-warm-taupe/40 bg-soft-peach p-6 shadow-[0_18px_40px_rgba(35,53,71,0.08)]">
              <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-warm-taupe/50 bg-off-white-paper text-center text-sm text-ink-navy/60">
                {/* Kim hero illustration goes here */}
                Kim hero illustration placeholder
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
