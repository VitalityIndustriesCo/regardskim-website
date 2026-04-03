import { Mailbox, PenLine, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const benefits = [
  {
    title: "Less inbox, more focus",
    body: "Kim takes the first pass so support stops sitting in your head.",
    icon: Mailbox,
  },
  {
    title: "Replies that sound right",
    body: "Clear, thoughtful responses that keep your brand polished.",
    icon: PenLine,
  },
  {
    title: "You stay in control",
    body: "Every reply is a draft until you approve it.",
    icon: ShieldCheck,
  },
];

export default function Benefits() {
  return (
    <section className="paper-grain py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.05}>
                <article className="h-full rounded-3xl border border-forest/15 bg-paper p-7">
                  <div className="mb-4 w-fit rounded-xl bg-mist p-2.5 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-2xl tracking-normal text-forest">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate md:text-base">{item.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
