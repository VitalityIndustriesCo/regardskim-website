import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type FAQProps = {
  copy?: HomeCopy["faq"];
};

export default function FAQ({ copy = enHomeCopy.faq }: FAQProps) {
  return (
    <section id="faq" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-5xl">{copy.heading}</h2>
        </FadeIn>

        <div className="mt-10 space-y-4 md:space-y-5">
          {copy.items.map((faq, idx) => {
            return (
              <FadeIn key={faq.question} delay={idx * 0.02}>
                <details className="group overflow-hidden rounded-2xl border border-slate/12 bg-white shadow-[0_6px_16px_rgba(35,53,71,0.11),0_1px_4px_rgba(35,53,71,0.07)] dark:bg-[#20283A]" open={idx === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left marker:hidden">
                    <h3 className="font-medium text-ink md:text-lg">{faq.question}</h3>
                    <ChevronDown className="shrink-0 text-slate transition-transform group-open:rotate-180" size={18} />
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-7 text-slate md:text-base">{faq.answer}</p>
                </details>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
