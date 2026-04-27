import FadeIn from "@/components/ui/FadeIn";
import MockupWindow from "@/components/ui/MockupWindow";
import MockupInbox from "@/components/ui/MockupInbox";
import MockupDetail from "@/components/ui/MockupDetail";

const steps = [
  {
    number: "01",
    title: "Connect Gmail and Shopify",
    body: "Every email is automatically categorised and matched to the right order, tracking, and store policies.",
    mockup: (
      <MockupWindow title="Inbox">
        <MockupInbox />
      </MockupWindow>
    ),
  },
  {
    number: "02",
    title: "Drafts using live tracking and store data",
    body: "Regards Kim prepares replies with tracking numbers, order status, return rules, and the details customers actually asked for.",
    mockup: (
      <MockupWindow title="Inbox">
        <MockupDetail mode="draft" />
      </MockupWindow>
    ),
  },
  {
    number: "03",
    title: "You approve before anything sends",
    body: "Replies are sent from your Gmail after you review them. Your customers see your store, not another helpdesk tool.",
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
        <FadeIn className="mx-auto max-w-5xl text-center">
          <p className="font-display text-5xl font-extrabold tracking-tight text-brass md:text-7xl">How it works</p>
        </FadeIn>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-[2rem] border border-slate/15 bg-[#0F1B2E] p-4 shadow-[0_16px_44px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.2)] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-8">
                <div className="mb-5 px-1 md:mb-6 md:px-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-mist px-3.5 py-1.5 text-sm font-bold tracking-[0.12em] text-brass">{step.number}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-normal text-ink sm:text-3xl md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm text-slate md:text-base">{step.body}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate/12 bg-[#0A1220] p-3 sm:p-4 md:rounded-[2rem] md:p-5 lg:p-6">
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
