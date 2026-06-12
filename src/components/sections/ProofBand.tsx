import { Star } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const reviews = [
  {
    quote:
      "We were spending hours every week digging through Gmail, Shopify orders, tracking pages and customer notes just to answer simple questions. Regards Kim pulls everything together and gives us a draft reply that's usually 90% there. It's cut our support workload dramatically without taking control away from our team.",
    name: "Sarah M.",
    store: "Marlo & Co",
  },
  {
    quote:
      "As a founder handling customer support myself, Regards Kim feels like having a support assistant sitting beside me. It quickly shows which emails actually need attention and saves me from constantly jumping between Shopify and Gmail. The time savings add up fast.",
    name: "James R.",
    store: "Cozie Co",
  },
  {
    quote:
      "We tested a few AI support tools and most wanted to automate replies completely. That wasn't something we were comfortable with. Regards Kim keeps us in control while doing all the heavy lifting behind the scenes. We reply faster, miss fewer emails and still know every message has been reviewed by a real person.",
    name: "Adam W.",
    store: "JOOSY Beverages",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-brass" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function ProofBand() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brass">Early merchants</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
            The first stores are already off inbox duty.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <FadeIn key={review.name} delay={idx * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-[#E3D3C6] bg-white p-7 shadow-[0_8px_22px_rgba(35,53,71,0.12),0_2px_5px_rgba(35,53,71,0.08)] dark:border-slate/15 dark:bg-[#20283A]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate md:text-base">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-bold text-ink">— {review.name}</span>
                  <span className="ml-2 font-semibold text-slate">{review.store}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
