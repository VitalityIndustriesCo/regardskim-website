import FadeIn from "@/components/ui/FadeIn";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

export default function FinalCTA() {
  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl rounded-[2rem] border border-brass/20 bg-white px-8 py-12 text-center shadow-[0_10px_28px_rgba(35,53,71,0.16),0_2px_6px_rgba(35,53,71,0.09)] dark:bg-[#20283A] md:px-12 md:py-16">
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-5xl">Ready to draft Shopify support replies faster?</h2>
          <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-8 inline-flex">
            Install on Shopify
          </a>
          <p className="mt-6 text-sm text-slate">Kind regards, Kim</p>
        </FadeIn>
      </div>
    </section>
  );
}
