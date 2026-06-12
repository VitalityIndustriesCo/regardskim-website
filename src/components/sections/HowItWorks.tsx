import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const steps = [
  {
    number: "01",
    title: "Connect Gmail and Shopify",
    body: "Two minutes to connect. Regards Kim starts sorting customer emails by issue and filtering out the junk — sales pitches, notifications, and bounces never touch your queue.",
    image: "/images/how-it-works/step-1-inbox.png",
    alt: "Regards Kim inbox sorting customer emails: a tracking question, a return, an order change, and a newsletter marked no reply needed",
    width: 860,
    height: 728,
  },
  {
    number: "02",
    title: "Every email arrives with its order attached",
    body: "Order, delivery status, tracking links, policy links, and customer details sit beside the conversation. No more hunting through tabs.",
    image: "/images/how-it-works/step-2-context.png",
    alt: "A customer email asking where their order is, automatically matched to Shopify order 1842 with fulfillment status, carrier, and tracking number",
    width: 1748,
    height: 530,
  },
  {
    number: "03",
    title: "The reply is already drafted",
    body: "Grounded in the real order, not guesswork. Edit it, or just press send from Gmail. Your customers see your store, never us.",
    image: "/images/how-it-works/step-3-draft.png",
    alt: "A drafted reply ready for review with the real tracking number, and Send reply and Edit first buttons",
    width: 1664,
    height: 698,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#FFF9F3] py-16 md:py-24 dark:bg-[#090C14]">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <p className="font-display text-5xl font-extrabold tracking-tight text-brass md:text-7xl">How it works</p>
        </FadeIn>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-[2rem] border border-[#E3D3C6] bg-white p-4 shadow-[0_14px_32px_rgba(35,53,71,0.18),0_3px_8px_rgba(35,53,71,0.10)] dark:border-slate/15 dark:bg-[#20283A] dark:shadow-[0_16px_44px_rgba(0,0,0,0.28),0_1px_4px_rgba(0,0,0,0.18)] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-8">
                <div className="mb-5 px-1 md:mb-6 md:px-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-[#FFF0ED] px-3.5 py-1.5 text-sm font-bold tracking-[0.12em] text-brass dark:bg-[#312D2F]">{step.number}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-normal text-ink sm:text-3xl md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm text-slate md:text-base">{step.body}</p>
                </div>
                <div className="rounded-[1.5rem] border border-[#E9DCD1] bg-[#F8F1E7] p-3 dark:border-slate/12 dark:bg-[#111625] sm:p-4 md:rounded-[2rem] md:p-5 lg:p-6">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    className="mx-auto w-full max-w-3xl rounded-[1rem] border border-[#E9DCD1] bg-white shadow-[0_10px_26px_rgba(35,53,71,0.14)] dark:border-slate/12"
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
