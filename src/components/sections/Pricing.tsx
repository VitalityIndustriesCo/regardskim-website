import FadeIn from "@/components/ui/FadeIn";
import { Check } from "lucide-react";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const inclusions = [
  "Shopify connection",
  "Gmail integration",
  "Draft replies for post-purchase support emails",
  "Help with order status and tracking questions",
  "Help with returns, refunds, and exchanges",
  "Merchant review before anything is sent",
  "One simple monthly plan",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Simple pricing for busy Shopify stores</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">
            Start small, stay in control, and let Kim handle the busywork.
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-10 rounded-[2rem] border border-warm-taupe/35 bg-off-white-paper p-8 shadow-[0_16px_32px_rgba(35,53,71,0.07)] md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-ink-navy/60">RegardsKim</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-6xl leading-none">$49</span>
            <span className="mb-2 text-ink-navy/70">/month</span>
          </div>
          <p className="mt-4 text-ink-navy/80">A tidy post-purchase support desk for your Shopify store.</p>

          <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral mt-7">
            Start with Kim
          </a>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink-navy/85">
                <Check size={18} className="mt-0.5 shrink-0 text-muted-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6 rounded-2xl border border-warm-taupe/35 bg-soft-peach p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <p><strong>Hiring a VA:</strong> $200–$500/month, plus training, management, and handoff time</p>
            <p><strong>RegardsKim:</strong> $49/month, connected to your store and inbox, with drafts ready to approve</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
