import {
  Inbox,
  MessageSquareText,
  ShieldCheck,
  WalletCards,
  Link2,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const benefits = [
  {
    title: "Reduce the inbox weight",
    body: "Kim takes the first pass on repetitive post-purchase emails, so support stops sitting in your head all day.",
    icon: Inbox,
  },
  {
    title: "Keep replies polished",
    body: "Customers get clear, thoughtful responses that make your store feel organised, responsive, and well run.",
    icon: MessageSquareText,
  },
  {
    title: "Stay in control",
    body: "Nothing is sent without your approval. You keep the judgement. Kim handles the prep work.",
    icon: ShieldCheck,
  },
  {
    title: "Avoid extra payroll too early",
    body: "Get help with repetitive inbox load for $49/month instead of rushing into a $200 to $500 VA hire.",
    icon: WalletCards,
  },
  {
    title: "Work where you already do",
    body: "Regards Kim fits into Shopify and Gmail, so there is no need to rebuild your support workflow from scratch.",
    icon: Link2,
  },
];

export default function Benefits() {
  return (
    <section className="paper-grain py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            A calmer way to run support after the sale
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.04}>
                <article className="h-full rounded-3xl border border-forest/15 bg-paper p-6 shadow-[0_10px_24px_rgba(32,53,43,0.08)]">
                  <div className="mb-4 w-fit rounded-xl bg-mist p-2.5 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-forest">{item.title}</h3>
                  <p className="mt-3 text-slate">{item.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
