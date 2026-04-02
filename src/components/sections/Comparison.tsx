import FadeIn from "@/components/ui/FadeIn";

const usualWay = [
  "Founder checks inbox between everything else",
  "Repetitive replies eat hours each week",
  "Hiring help gets expensive fast",
  "Response quality varies when things get busy",
];

const withKim = [
  "Incoming post-purchase emails are organised",
  "Replies are prepared for review",
  "Support stays prompt and polished",
  "The workload drops without extra payroll",
];

export default function Comparison() {
  return (
    <section className="paper-grain py-20 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            A smarter way to handle support after the sale
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-navy/80">
            Kim helps with the repetitive post-purchase work that usually ends up on a founder, ops lead, or VA — but for $49/month.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FadeIn>
            <article className="rounded-3xl border border-warm-taupe/35 bg-off-white-paper p-7">
              <h3 className="font-display text-2xl tracking-tight">The usual way</h3>
              <ul className="mt-5 space-y-3 text-ink-navy/80">
                {usualWay.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>

          <FadeIn delay={0.06}>
            <article className="rounded-3xl border border-warm-coral/35 bg-soft-peach p-7 shadow-[0_10px_24px_rgba(233,124,107,0.14)]">
              <h3 className="font-display text-2xl tracking-tight">With Kim</h3>
              <ul className="mt-5 space-y-3 text-ink-navy/85">
                {withKim.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
