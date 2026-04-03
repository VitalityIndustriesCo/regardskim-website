import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const inclusions = [
  "Integrates with Shopify, Gmail & Outlook",
  "Draft replies for post-purchase emails",
  "Order, tracking & return support",
  "Review before anything sends",
  "Invite your team — no Shopify login needed",
  "One simple plan",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-28">
      <div className="section-shell text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.16em] text-slate">PRICING</p>
          <h2 className="mt-4 font-display font-bold text-4xl tracking-normal text-forest md:text-6xl">
            Simple pricing for busy stores
          </h2>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-10 w-full max-w-md rounded-[2rem] border border-forest/15 bg-paper p-8 text-left md:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-slate">RegardsKim</p>
          <div className="mt-4 flex items-end gap-2 text-forest">
            <span className="font-display font-bold text-7xl leading-none">$49</span>
            <span className="mb-2 text-slate">/month</span>
          </div>

          <ul className="mt-8 space-y-3">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate md:text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-brass" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary mt-8 inline-flex">
            Get started
          </a>
        </FadeIn>

        <p className="mt-6 text-sm text-slate">No VA costs. No training. No handoff.</p>
      </div>
    </section>
  );
}
