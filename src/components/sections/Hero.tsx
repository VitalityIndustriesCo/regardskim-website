import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import IntegrationHeroPreview from "@/components/ui/IntegrationHeroPreview";

const CTA_URL = "/founding";

export default function Hero() {
  return (
    <section id="top" className="paper-grain relative overflow-hidden">
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E97C6B]/10 blur-3xl dark:bg-[#B08D57]/6" aria-hidden="true" />
      <div className="section-shell relative">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <div className="mx-auto max-w-4xl pt-20 md:pt-32">
            <div className="mx-auto mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#E3D3C6] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8A6F61] shadow-sm backdrop-blur dark:border-slate/15 dark:bg-[#1B2436]/80 dark:text-brass">
              <span className="inline-flex items-center gap-2"><ShopifyLogo className="h-5 w-5" /> Built for Shopify</span>
              <span className="h-1 w-1 rounded-full bg-[#C9B5A7] dark:bg-slate/40" />
              <span className="inline-flex items-center gap-2"><GmailLogo className="h-4 w-4" /> Connects to Gmail</span>
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink md:text-8xl">
              Customer emails, handled.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate md:text-xl">
              Regards Kim is a Shopify app that connects to your Gmail, reads your customer emails, and drafts replies using your order details. You review, approve, and send from Shopify.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CTA_URL} className="btn-primary">
                Lock in your spot
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm font-medium text-slate">50% off forever for founding stores. No payment required.</p>


          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="py-10 md:py-16">
          <IntegrationHeroPreview />
        </FadeIn>
      </div>
    </section>
  );
}
