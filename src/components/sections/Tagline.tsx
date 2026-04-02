import FadeIn from "@/components/ui/FadeIn";

export default function Tagline() {
  return (
    <section className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn className="rounded-[2rem] border border-warm-taupe/35 bg-off-white-paper p-8 text-center shadow-[0_12px_30px_rgba(35,53,71,0.06)] md:p-14">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Shopify helps them buy. Kim helps them stay.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-ink-navy/80">
            Once the order is placed, the real customer experience begins. Kim helps you keep that part prompt, polished, and under control.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
