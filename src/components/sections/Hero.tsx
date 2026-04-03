import FadeIn from "@/components/ui/FadeIn";
import InboxDemo from "@/components/ui/InboxDemo";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Hero() {
  return (
    <section id="top" className="paper-grain overflow-hidden py-16 md:py-24">
      <div className="section-shell grid items-center gap-14 md:grid-cols-2">
        <FadeIn>
          <p className="mb-5 inline-flex rounded-full border border-brass/35 bg-paper px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-slate">
            Post-purchase support for Shopify
          </p>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-forest md:text-7xl">
            Your inbox, handled.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate md:text-xl">
            Regards Kim reviews your inbox, filters what matters, drafts thoughtful replies, and
            leaves everything ready for approval.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
              See Kim in action
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              View sample workflow
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-slate">
            <li>• Connect Shopify and Gmail</li>
            <li>• Draft replies prepared for review</li>
            <li>• Built for tracking, returns, refunds, and exchanges</li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          <InboxDemo />
        </FadeIn>
      </div>
    </section>
  );
}
