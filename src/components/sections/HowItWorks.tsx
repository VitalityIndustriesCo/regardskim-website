import FadeIn from "@/components/ui/FadeIn";
import MockupWindow from "@/components/ui/MockupWindow";
import MockupInbox from "@/components/ui/MockupInbox";
import MockupDetail from "@/components/ui/MockupDetail";

const steps = [
  {
    number: "01",
    title: "Emails come in, Regards Kim gets to work",
    body: "Customer emails are matched to orders, tracking, and your store policies — automatically.",
    mockup: (
      <MockupWindow title="Inbox" className="bg-cream">
        <div className="p-2.5 sm:p-3 md:p-4">
          <MockupInbox />
        </div>
      </MockupWindow>
    ),
  },
  {
    number: "02",
    title: "Helpful replies, ready to go",
    body: "Regards Kim drafts real answers with the right details — not generic filler your customers can see through.",
    mockup: (
      <MockupWindow title="Draft composer" className="bg-cream">
        <div className="p-2.5 sm:p-3 md:p-4">
          <MockupDetail mode="draft" />
        </div>
      </MockupWindow>
    ),
  },
  {
    number: "03",
    title: "Review, send, move on",
    body: "Check the drafts, hit send, and get back to running your store. Most merchants clear their queue in minutes.",
    mockup: (
      <MockupWindow title="Approval" className="bg-cream">
        <div className="p-2.5 sm:p-3 md:p-4">
          <MockupDetail mode="approval" />
        </div>
      </MockupWindow>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-[2rem] bg-cream p-4 shadow-[0_8px_30px_rgba(26,26,26,0.08)] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-8">
                <div className="mb-5 px-1 md:mb-6 md:px-2">
                  <p className="text-sm font-semibold tracking-[0.12em] text-brass">{step.number}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-normal text-forest sm:text-3xl md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm text-slate md:text-base">{step.body}</p>
                </div>
                <div className="rounded-[1.5rem] bg-paper p-3 shadow-[0_4px_20px_rgba(26,26,26,0.10)] sm:p-4 md:rounded-[2rem] md:p-5 lg:p-6">
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
