import FadeIn from "@/components/ui/FadeIn";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type FinalCTAProps = {
  copy?: HomeCopy["finalCta"];
};

export default function FinalCTA({ copy = enHomeCopy.finalCta }: FinalCTAProps) {
  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl rounded-[2rem] border border-brass/20 bg-white px-8 py-12 text-center shadow-[0_10px_28px_rgba(35,53,71,0.16),0_2px_6px_rgba(35,53,71,0.09)] dark:bg-[#20283A] md:px-12 md:py-16">
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-5xl">{copy.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate">
            {copy.body}
          </p>
          <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-8 inline-flex">
            {copy.cta}
          </a>
          <p className="mt-8 font-display text-xl italic text-brass">{copy.signoff}</p>
        </FadeIn>
      </div>
    </section>
  );
}
