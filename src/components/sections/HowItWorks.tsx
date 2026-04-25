import FadeIn from "@/components/ui/FadeIn";
import MockupWindow from "@/components/ui/MockupWindow";
import MockupInbox from "@/components/ui/MockupInbox";
import MockupDetail from "@/components/ui/MockupDetail";

const steps = [
  {
    number: "01",
    title: "Emails come in, sorted instantly",
    body: "Every email is automatically categorised and matched to the right order, tracking, and store policies.",
    mockup: (
      <MockupWindow title="Inbox">
        <MockupInbox />
      </MockupWindow>
    ),
  },
  {
    number: "02",
    title: "Helpful replies, ready to go",
    body: "Regards Kim drafts real answers with the right details, not generic filler your customers can see through.",
    mockup: (
      <MockupWindow title="Inbox">
        <MockupDetail mode="draft" />
      </MockupWindow>
    ),
  },
  {
    number: "03",
    title: "Review, send, move on",
    body: "Replies are sent and received through your existing Gmail account. Your customers just see your store, never us.",
    mockup: (
      <MockupWindow title="Inbox">
        <MockupDetail mode="approval" />
      </MockupWindow>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-forest py-16 md:py-24">
      <div className="section-shell">
        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-[2rem] border border-brass/20 bg-cream p-4 shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_60px_rgba(176,141,87,0.08)] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-8">
                <div className="mb-5 px-1 md:mb-6 md:px-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-brass/15 px-3.5 py-1.5 text-sm font-bold tracking-[0.12em] text-brass">{step.number}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-normal text-ink sm:text-3xl md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm text-slate md:text-base">{step.body}</p>
                </div>
                <div className="rounded-[1.5rem] border border-mist bg-forest/50 p-3 sm:p-4 md:rounded-[2rem] md:p-5 lg:p-6">
                  {step.mockup}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
