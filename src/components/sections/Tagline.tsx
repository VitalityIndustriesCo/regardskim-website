import FadeIn from "@/components/ui/FadeIn";

export default function Tagline() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="text-center">
          <h2 className="font-display font-bold text-4xl tracking-normal text-forest md:text-6xl">
            Shopify helps them buy. Kim helps them stay.
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}
