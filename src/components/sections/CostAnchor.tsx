import Link from "next/link";
import { Clock3, Users, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const options = [
  {
    title: "Your own time",
    cost: "$500+/mo",
    body: "Five hours a week of founder time on tracking lookups and copy-paste replies — the most expensive support agent your store will ever have.",
    icon: Clock3,
    highlight: false,
  },
  {
    title: "A part-time VA",
    cost: "$800+/mo",
    body: "Roughly 20 hours a week at typical VA rates — plus hiring, training, management, and time-zone gaps. Worth it eventually, but a big step while support is still mostly repetitive email.",
    icon: Users,
    highlight: false,
  },
  {
    title: "Regards Kim",
    cost: "$49/mo",
    body: "Sorting, order context, and drafted replies from the moment you connect. It never calls in sick, and you still approve every send.",
    icon: Sparkles,
    highlight: true,
  },
];

export default function CostAnchor() {
  return (
    <section className="bg-[#FFF9F3] py-16 dark:bg-[#090C14] md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
            What does support cost you right now?
          </h2>
          <p className="mt-4 text-base leading-8 text-slate md:text-lg">
            Support looks free when it hides inside founder hours. It is not.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {options.map((option, idx) => {
            const Icon = option.icon;
            return (
              <FadeIn key={option.title} delay={idx * 0.06}>
                <article
                  className={[
                    "flex h-full flex-col rounded-3xl border bg-white p-7 dark:bg-[#20283A]",
                    option.highlight
                      ? "border-brass/40 shadow-[0_12px_30px_rgba(35,53,71,0.18),0_3px_8px_rgba(35,53,71,0.10)]"
                      : "border-slate/12 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.07)]",
                  ].join(" ")}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brass/10 text-brass">
                    <Icon size={21} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink md:text-2xl">{option.title}</h3>
                  <p className="mt-2 font-display text-3xl font-extrabold text-ink md:text-4xl">{option.cost}</p>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate md:text-base">{option.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.14} className="mt-8 text-center">
          <Link href="/tools/support-cost-calculator" className="btn-secondary">
            Run your own numbers
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
