import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";

const CTA_URL = "/founding";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
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
                <a href={CTA_URL} className="btn-primary">
                  Lock in your spot
                </a>
                <p className="text-sm text-slate">Founding pricing available — 50% off forever. No payment required.</p>
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

      {/* Hero product mockup */}
      <div className="bg-forest">
        <div className="section-shell py-8 md:py-12">
          <FadeIn className="mx-auto max-w-5xl">
            <Image
              src="/images/hero-product-mockup.png"
              alt="RegardsKim inbox showing customer emails sorted and drafted automatically"
              width={1536}
              height={1024}
              className="w-full"
              priority
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
