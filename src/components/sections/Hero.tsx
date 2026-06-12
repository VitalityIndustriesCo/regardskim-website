import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import HeroLoopVideo from "@/components/sections/HeroLoopVideo";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import Link from "next/link";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type HeroProps = {
  copy?: HomeCopy["hero"];
};

export default function Hero({ copy = enHomeCopy.hero }: HeroProps) {
  return (
    <section id="top" className="paper-grain relative overflow-hidden">
      <div className="section-shell relative">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <div className="mx-auto max-w-4xl pt-12 md:pt-28">
            <h1 className="mx-auto max-w-[22rem] font-display text-3xl font-extrabold leading-[1.08] tracking-normal text-ink sm:max-w-3xl sm:text-5xl md:text-7xl">
              {copy.title}
            </h1>
            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3D3C6] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8A6F61] shadow-sm backdrop-blur dark:border-slate/15 dark:bg-[#1D2840]/80 dark:text-brass"><ShopifyLogo className="h-5 w-5 shrink-0" /> {copy.badges.shopify}</span>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3D3C6] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8A6F61] shadow-sm backdrop-blur dark:border-slate/15 dark:bg-[#1D2840]/80 dark:text-brass"><GmailLogo className="h-4 w-4 shrink-0" /> {copy.badges.gmail}</span>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate md:text-xl">
              {copy.body}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
              <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary">
                {copy.primaryCta}
              </a>
              <Link href="/demo" className="btn-secondary">
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2 text-left sm:grid-cols-4 md:mt-7">
              {copy.workflowPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-[#E3D3C6] bg-white/70 px-3 py-2.5 text-center text-xs font-bold text-ink shadow-sm dark:border-slate/15 dark:bg-[#1D2840]/80 md:py-3">
                  {point}
                </div>
              ))}
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-slate md:mt-5">
              {copy.reassurance}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="py-6 md:py-14">
          <HeroLoopVideo />
        </FadeIn>
      </div>
    </section>
  );
}
