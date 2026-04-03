import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn className="rounded-[2rem] border border-brass/25 bg-forest px-8 py-12 text-paper md:px-16 md:py-16">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Leave the first pass to Kim</h2>
          <p className="mt-4 max-w-2xl text-paper/85">
            If your day keeps getting interrupted by tracking questions, return requests, and order
            follow-ups, Kim can help bring some order back to it.
          </p>
          <p className="mt-3 text-paper/80">Thoughtful replies, prepared and waiting for approval.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-secondary border-paper/30 bg-paper text-forest hover:bg-mist">
              See Kim in action
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-secondary border-paper/30 bg-transparent text-paper hover:bg-paper/10">
              View sample workflow
            </a>
          </div>
          <p className="mt-8 font-display text-2xl text-paper/95">Kind regards, Kim</p>
        </FadeIn>
      </div>
    </section>
  );
}
