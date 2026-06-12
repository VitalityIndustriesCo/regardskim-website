import Link from "next/link";
import { CheckCircle2, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";

import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

const icons = [UserCheck, CheckCircle2, LockKeyhole, ShieldCheck] as const;

type TrustAndSafetyProps = {
  copy?: HomeCopy["trustAndSafety"];
};

export default function TrustAndSafety({ copy = enHomeCopy.trustAndSafety }: TrustAndSafetyProps) {
  return (
    <section className="bg-[#FFF9F3] py-16 dark:bg-[#090C14] md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brass">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate md:text-lg">
            {copy.body}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {copy.points.map((point, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <FadeIn key={point.title} delay={index * 0.04}>
                <article className="h-full rounded-3xl border border-[#E3D3C6] bg-white p-6 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:border-slate/15 dark:bg-[#20283A]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0ED] text-brass dark:bg-[#312D2F]">
                    <Icon size={21} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate md:text-base">{point.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.12} className="mt-10 rounded-3xl border border-brass/20 bg-white px-6 py-6 text-center shadow-[0_10px_26px_rgba(35,53,71,0.14),0_2px_6px_rgba(35,53,71,0.08)] dark:bg-[#20283A] md:px-8">
          <p className="text-base font-semibold leading-7 text-ink">
            {copy.detailHeading}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate">
            {copy.detailBody}
          </p>
          <Link href="/security" className="btn-secondary mt-5">
            {copy.detailCta}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
