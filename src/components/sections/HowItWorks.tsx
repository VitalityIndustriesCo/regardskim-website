import FadeIn from "@/components/ui/FadeIn";
import { Clock3, Inbox, PencilRuler, BadgeCheck } from "lucide-react";

const steps = [
  {
    label: "Clock in",
    title: "Connect your store and inbox",
    body: "Add your Shopify store and Gmail account, and Kim gets to work where your customer conversations already live.",
    icon: Clock3,
  },
  {
    label: "Sort the mail",
    title: "Kim reads incoming support emails",
    body: "From \"Where is my order?\" to \"Can I exchange this?\", Kim reviews post-purchase messages and checks the information she needs.",
    icon: Inbox,
  },
  {
    label: "Prepare the reply",
    title: "Replies are prepared for you",
    body: "Kim drafts clear, on-brand responses for tracking, returns, refunds, and exchange questions — ready for your review in Gmail.",
    icon: PencilRuler,
  },
  {
    label: "Sign off",
    title: "You review and approve",
    body: "Nothing goes out without your say-so. You stay in control, while Kim does the time-consuming prep work.",
    icon: BadgeCheck,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">How Kim keeps the inbox moving</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">
            Kim is built for the emails that pile up after the sale: order updates, tracking questions, returns, refunds, and exchanges. She reads the details, prepares the reply, and leaves it ready for you to approve.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.label} delay={index * 0.06}>
                <article className="h-full rounded-3xl border border-warm-taupe/35 bg-off-white-paper p-6 shadow-[0_8px_24px_rgba(35,53,71,0.05)]">
                  <p className="mb-4 inline-flex rounded-full bg-soft-peach px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-navy/70">
                    {step.label}
                  </p>
                  <div className="mb-4 w-fit rounded-xl bg-cream p-2.5 text-muted-teal">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-ink-navy/80">{step.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <p className="mt-10 text-center font-medium text-ink-navy/80">
            Less inbox time. More time running the store.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
