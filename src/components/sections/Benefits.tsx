import { BookOpen, PenLine, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const benefits = [
  {
    title: "Feels native to your workflow",
    body: "Regards Kim works with Gmail and Shopify, so you are not forcing customers or your team into another helpdesk.",
    icon: BookOpen,
  },
  {
    title: "Replies customers actually trust",
    body: "Drafts include real order details, tracking context, and store policies instead of vague template filler.",
    icon: PenLine,
  },
  {
    title: "Your voice, your approval",
    body: "Regards Kim prepares the reply, but you stay in control of what gets sent from your Gmail account.",
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
                <article className="h-full rounded-3xl border border-slate/10 bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:bg-[#202739] md:p-8">
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
