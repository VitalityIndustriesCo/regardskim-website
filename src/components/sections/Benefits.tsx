import { BookOpen, PenLine, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const benefits = [
  {
    title: "Hours back in your day",
    body: "Stop writing the same replies over and over. Regards Kim handles your support emails so you can run your store.",
    icon: BookOpen,
  },
  {
    title: "Replies your customers actually trust",
    body: "Real answers with real order details \u2014 not vague templates that make your store look careless.",
    icon: PenLine,
  },
  {
    title: "Your voice, your call",
    body: "Regards Kim drafts in your style and you decide what gets sent. It\u2019s your store \u2014 it just handles the busy work.",
    icon: ShieldCheck,
  },
];

export default function Benefits() {
  return (
    <section className="bg-forest py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.06}>
                <article className="h-full rounded-3xl border border-mist bg-cream p-7 md:p-8">
                  <div className="mb-6 w-fit rounded-xl bg-mist p-2.5 text-brass">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-normal text-ink md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-slate md:text-base">{item.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
