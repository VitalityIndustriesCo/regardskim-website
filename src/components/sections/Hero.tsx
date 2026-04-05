import FadeIn from "@/components/ui/FadeIn";
import InboxDemo from "@/components/ui/InboxDemo";

const DASHBOARD_URL = "/login";

export default function Hero() {
  return (
    <section id="top" className="paper-grain overflow-hidden py-16 md:py-28">
      <div className="section-shell grid items-center gap-14 md:grid-cols-2">
        <FadeIn>
          <p className="mb-6 text-xs uppercase tracking-[0.16em] text-slate">
            CUSTOMER EMAIL SUPPORT FOR ECOMMERCE
          </p>
          <h1 className="font-display font-bold text-5xl leading-[1.02] tracking-normal text-forest md:text-8xl">
            Your inbox, handled.
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate md:text-lg">
            Kim reads your customer emails, writes helpful replies, and leaves everything ready for you to approve.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={DASHBOARD_URL} className="btn-primary">
              Get started
            </a>
            <a href="#pricing" className="btn-secondary">
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
