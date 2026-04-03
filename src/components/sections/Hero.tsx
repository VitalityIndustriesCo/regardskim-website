import FadeIn from "@/components/ui/FadeIn";
import InboxDemo from "@/components/ui/InboxDemo";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Hero() {
  return (
    <section id="top" className="paper-grain overflow-hidden py-16 md:py-28">
      <div className="section-shell grid items-center gap-14 md:grid-cols-2">
        <FadeIn>
          <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate">
            POST-PURCHASE SUPPORT FOR SHOPIFY
          </p>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-forest md:text-8xl">
            Your inbox, handled.
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate md:text-lg">
            Kim reviews your post-purchase emails, drafts thoughtful replies, and leaves everything
            ready for approval.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
              See Kim in action
            </a>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              View pricing
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <InboxDemo />
        </FadeIn>
      </div>
    </section>
  );
}
