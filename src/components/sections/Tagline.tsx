import FadeIn from "@/components/ui/FadeIn";

export default function Tagline() {
  return (
    <section className="py-20 md:py-24">
      <div className="section-shell">
        <FadeIn className="rounded-[2rem] border border-forest/15 bg-paper p-8 text-center shadow-[0_14px_28px_rgba(32,53,43,0.08)] md:p-14">
          <h2 className="font-display text-4xl tracking-tight text-forest md:text-5xl">
            Shopify helps them buy. Kim helps them stay.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate">
            The sale is only the beginning. After that comes the inbox: tracking questions,
            return requests, exchange emails, refund follow-ups, and all the small moments that
            shape how customers remember your store.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate">
            Regards Kim helps you stay on top of that work without adding another person to
            manage. The inbox stays calm. Replies stay thoughtful. You stay in control.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
