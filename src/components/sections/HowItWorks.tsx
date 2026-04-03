import FadeIn from "@/components/ui/FadeIn";
import MockupWindow from "@/components/ui/MockupWindow";
import MockupInbox from "@/components/ui/MockupInbox";
import MockupDetail from "@/components/ui/MockupDetail";

const steps = [
  {
    number: "01",
    title: "Kim reviews your inbox",
    body: "Every customer email is triaged and prioritised in one clean queue.",
    mockup: (
      <MockupWindow title="Inbox">
        <div className="p-3 md:p-4">
          <MockupInbox />
        </div>
      </MockupWindow>
    ),
  },
  {
    number: "02",
    title: "Thoughtful replies, drafted",
    body: "Kim writes context-aware responses from your brand voice and order data.",
    mockup: (
      <MockupWindow title="Draft composer">
        <div className="p-3 md:p-4">
          <MockupDetail mode="draft" />
        </div>
      </MockupWindow>
    ),
  },
  {
    number: "03",
    title: "You approve, Kim sends",
    body: "Approve in one click and Kim sends polished replies instantly.",
    mockup: (
      <MockupWindow title="Approval">
        <div className="p-3 md:p-4">
          <MockupDetail mode="approval" />
        </div>
      </MockupWindow>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-28">
      <div className="section-shell">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-slate">HOW IT WORKS</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-forest md:text-6xl">
            Up and running in minutes
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-10 md:space-y-14">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-3xl border border-forest/15 bg-paper p-5 md:p-7">
                <div className="mb-5 md:mb-6">
                  <p className="text-sm font-semibold tracking-[0.12em] text-slate">{step.number}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight text-forest md:text-4xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate md:text-base">{step.body}</p>
                </div>
                {step.mockup}
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
