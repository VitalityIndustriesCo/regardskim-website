import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn className="rounded-[2rem] border border-warm-taupe/40 bg-ink-navy px-8 py-12 text-off-white-paper md:px-16 md:py-16">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Let Kim take it from here</h2>
          <p className="mt-4 max-w-2xl text-off-white-paper/85">
            If your inbox is full of tracking questions, return requests, and order updates, Kim can help tidy it up.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral">
              Start with Kim
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-ghost border-white/35 bg-white/10 text-off-white-paper hover:bg-white/20">
              See pricing
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
