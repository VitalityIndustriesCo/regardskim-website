import { BookOpen, LayoutDashboard, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const benefits = [
  {
    title: "AI triage built for ecommerce",
    body: "Tracking questions, returns, order changes, product help, sales, and escalations are sorted into clear buckets before they become inbox chaos.",
    icon: LayoutDashboard,
  },
  {
    title: "Shopify context beside every reply",
    body: "Regards Kim pulls order, customer, tracking, and policy context into the workflow so your team is not hunting through tabs.",
    icon: BookOpen,
  },
  {
    title: "AI help without losing control",
    body: "Improve replies, insert saved responses, add tracking or policy links, and send from Gmail only when you are ready.",
    icon: ShieldCheck,
  },
];

export default function Benefits() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.06}>
                <article className="h-full rounded-3xl border border-slate/10 bg-white p-7 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A] md:p-8">
                  <div className="mb-6 w-fit rounded-xl bg-brass/10 p-2.5 text-brass">
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
