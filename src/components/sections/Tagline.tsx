import FadeIn from "@/components/ui/FadeIn";

export default function Tagline() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="text-center">
          <h2 className="font-display font-bold text-4xl tracking-normal text-ink md:text-6xl">
            Every customer email sorted, understood, and ready for a better answer.
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}
