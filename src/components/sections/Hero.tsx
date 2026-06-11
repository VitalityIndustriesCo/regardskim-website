import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import IntegrationHeroPreview from "@/components/ui/IntegrationHeroPreview";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import Link from "next/link";

const workflowPoints = [
  "Triage the inbox",
  "Pull Shopify context",
  "Draft for review",
  "You approve and send",
];

export default function Hero() {
  return (
    <section id="top" className="paper-grain relative overflow-hidden">
      <div className="section-shell relative">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <div className="mx-auto max-w-4xl pt-12 md:pt-28">
            <h1 className="mx-auto max-w-[22rem] font-display text-3xl font-extrabold leading-[1.08] tracking-normal text-ink sm:max-w-3xl sm:text-5xl md:text-7xl">
              Clear your Shopify support inbox faster, without auto-sending replies.
            </h1>
            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3D3C6] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8A6F61] shadow-sm backdrop-blur dark:border-slate/15 dark:bg-[#1D2840]/80 dark:text-brass"><ShopifyLogo className="h-5 w-5 shrink-0" /> Built for Shopify</span>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3D3C6] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8A6F61] shadow-sm backdrop-blur dark:border-slate/15 dark:bg-[#1D2840]/80 dark:text-brass"><GmailLogo className="h-4 w-4 shrink-0" /> Works with Gmail</span>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate md:text-xl">
              Regards Kim sorts customer emails, gathers Shopify order context, and prepares helpful drafts for you or your team to review, edit, and send from Gmail.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
              <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary">
                Install on Shopify
              </a>
              <Link href="/#how-it-works" className="btn-secondary">
                See how it works
              </Link>
            </div>

            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2 text-left sm:grid-cols-4 md:mt-7">
              {workflowPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-[#E3D3C6] bg-white/70 px-3 py-2.5 text-center text-xs font-bold text-ink shadow-sm dark:border-slate/15 dark:bg-[#1D2840]/80 md:py-3">
                  {point}
                </div>
              ))}
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-slate md:mt-5">
              If Regards Kim saves one support hour a month, the app has already paid for itself.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="py-6 md:py-14">
          <IntegrationHeroPreview />
        </FadeIn>
      </div>
    </section>
  );
}
