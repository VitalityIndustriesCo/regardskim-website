import FadeIn from "@/components/ui/FadeIn";
import HeroInboxPreview from "@/components/ui/HeroInboxPreview";
import { ShopifyLogo } from "@/components/ui/BrandLogos";

const DASHBOARD_URL = "/signup";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-visible">
      {/* Cream background with hero text */}
      <div className="paper-grain bg-cream pb-0">
        <div className="section-shell">
          <FadeIn className="mx-auto max-w-5xl text-center">
            <div className="mx-auto max-w-3xl pt-20 md:pt-32">
              <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-normal text-forest md:text-8xl">
                Your inbox, handled
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-slate md:text-lg">
                Kim handles your customer emails using your live store data — you just approve and send.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4">
                <a href={DASHBOARD_URL} className="btn-primary">
                  START FREE TRIAL
                </a>
                <p className="text-sm text-slate">7-day free trial • Cancel anytime</p>
              </div>

              {/* Shopify trust block */}
              <div className="mx-auto mt-12 w-fit rounded-full border border-forest/8 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3">
                  <ShopifyLogo className="h-7 w-7" />
                  <p className="text-sm font-semibold text-forest md:text-base">
                    Built for Shopify stores
                  </p>
                </div>

              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Inbox preview with split background */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="h-1/2 bg-cream" />
          <div className="h-1/2 bg-paper" />
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
