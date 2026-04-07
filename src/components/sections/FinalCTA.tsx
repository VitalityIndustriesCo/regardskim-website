import FadeIn from "@/components/ui/FadeIn";

const INSTALL_URL = "/#install";

export default function FinalCTA() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl rounded-[2rem] border border-brass/15 bg-paper px-8 py-12 text-center md:px-12 md:py-16">
          <h2 className="font-display font-bold text-4xl tracking-normal text-forest md:text-5xl">Ready to try Kim?</h2>
          <a href={INSTALL_URL} className="btn-primary mt-8 inline-flex">
            Install on Shopify
          </a>
          <p className="mt-6 text-sm text-slate">Kind regards, Kim</p>
        </FadeIn>
      </div>
    </section>
  );
}
