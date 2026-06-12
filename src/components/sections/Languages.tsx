import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type LanguagesProps = {
  copy?: HomeCopy["languages"];
};

export default function Languages({ copy = enHomeCopy.languages }: LanguagesProps) {
  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="section-shell">
        <FadeIn className="rounded-3xl border border-[#E3D3C6] bg-white px-6 py-7 shadow-[0_8px_22px_rgba(35,53,71,0.10),0_2px_5px_rgba(35,53,71,0.06)] dark:border-slate/15 dark:bg-[#20283A] md:px-8 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brass">{copy.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-normal text-ink md:text-4xl">
                {copy.heading}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate md:text-base">{copy.body}</p>
              <p className="mt-2 text-sm leading-7 text-slate md:text-base">{copy.note}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {copy.languageNames.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-[#E3D3C6] bg-[#FFF9F3] px-3 py-1.5 text-xs font-bold text-slate dark:border-slate/15 dark:bg-[#111625] md:text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
