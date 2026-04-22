import FadeIn from "@/components/ui/FadeIn";
import HeroInboxPreview from "@/components/ui/HeroInboxPreview";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";

const INSTALL_URL = "/#install";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-visible">
      {/* Dark background with hero text */}
      <div className="bg-forest pb-0">
        <div className="section-shell">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <div className="mx-auto max-w-3xl pt-20 md:pt-32">
              <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-normal text-ink md:text-8xl">
                Your inbox, handled
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-slate md:text-lg">
                Regards Kim handles your customer emails using your live store data — you just approve and send.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4">
                <a href={INSTALL_URL} className="btn-primary">
                  Install on Shopify
                </a>
                <p className="text-sm text-slate">Install from the Shopify App Store and get set up in minutes.</p>
              </div>

              {/* Trust block */}
              <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2.5 rounded-full border border-mist bg-cream/80 px-4 py-2.5 shadow-sm backdrop-blur-sm">
                  <ShopifyLogo className="h-6 w-6" />
                  <p className="text-sm font-semibold text-ink">Built for Shopify</p>
                </div>
                <div className="flex items-center gap-2.5 rounded-full border border-mist bg-cream/80 px-4 py-2.5 shadow-sm backdrop-blur-sm">
                  <GmailLogo className="h-5 w-5" />
                  <p className="text-sm font-semibold text-ink">Connects with Gmail</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Inbox preview with split background */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="h-1/2 bg-forest" />
          <div className="h-1/2 bg-forest" />
        </div>
        <div className="section-shell relative z-10 py-8 md:py-12">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <HeroInboxPreview />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
