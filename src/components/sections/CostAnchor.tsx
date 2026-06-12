import Link from "next/link";
import { Clock3, Users, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

const icons = [Clock3, Users, Sparkles] as const;

type CostAnchorProps = {
  copy?: HomeCopy["costAnchor"];
};

export default function CostAnchor({ copy = enHomeCopy.costAnchor }: CostAnchorProps) {
  return (
    <section className="bg-[#FFF9F3] py-16 dark:bg-[#090C14] md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate md:text-lg">
            {copy.body}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.options.map((option, idx) => {
            const Icon = icons[idx] ?? Sparkles;
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
            {copy.cta}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
