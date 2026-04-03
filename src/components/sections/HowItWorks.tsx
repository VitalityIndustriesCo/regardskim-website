import FadeIn from "@/components/ui/FadeIn";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

const steps = [
  {
    number: "01",
    title: "Connect Shopify & Gmail",
    body: "One setup, and Kim starts reviewing your inbox.",
  },
  {
    number: "02",
    title: "Kim drafts replies",
    body: "Order updates, tracking, returns — handled with care.",
  },
  {
    number: "03",
    title: "You review and approve",
    body: "Nothing sends without your say-so.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-28">
      <div className="section-shell">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-slate">HOW IT WORKS</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-forest md:text-6xl">
            Up and running in minutes
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.05}>
              <article className="h-full rounded-3xl border border-forest/15 bg-paper p-8">
                <p className="text-sm font-semibold tracking-[0.12em] text-slate">{step.number}</p>
                <h3 className="mt-4 font-display text-3xl tracking-tight text-forest">{step.title}</h3>
                <p className="mt-3 text-sm text-slate md:text-base">{step.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
            See Kim in action
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
