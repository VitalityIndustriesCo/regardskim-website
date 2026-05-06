import FadeIn from "@/components/ui/FadeIn";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

export default function Founding() {
  return (
    <section id="founding" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Now available
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
              Install Regards Kim from the Shopify App Store
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-slate md:text-lg">
              Regards Kim is approved and ready to add to your Shopify store. Install it, connect your inbox, and start drafting better support replies.
            </p>
            <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-8 inline-flex">
              Install on Shopify
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
