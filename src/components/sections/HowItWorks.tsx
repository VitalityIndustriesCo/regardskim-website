import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type HowItWorksProps = {
  copy?: HomeCopy["howItWorks"];
};

export default function HowItWorks({ copy = enHomeCopy.howItWorks }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-[#FFF9F3] py-16 md:py-24 dark:bg-[#090C14]">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <p className="font-display text-5xl font-extrabold tracking-tight text-brass md:text-7xl">{copy.heading}</p>
        </FadeIn>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {copy.steps.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.06}>
              <article className="rounded-[2rem] border border-[#E3D3C6] bg-white p-4 shadow-[0_14px_32px_rgba(35,53,71,0.18),0_3px_8px_rgba(35,53,71,0.10)] dark:border-slate/15 dark:bg-[#20283A] dark:shadow-[0_16px_44px_rgba(0,0,0,0.28),0_1px_4px_rgba(0,0,0,0.18)] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-8">
                <div className="mb-5 px-1 md:mb-6 md:px-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-[#FFF0ED] px-3.5 py-1.5 text-sm font-bold tracking-[0.12em] text-brass dark:bg-[#312D2F]">{step.number}</span>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-normal text-ink sm:text-4xl md:text-5xl">{step.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate md:text-lg md:leading-8">{step.body}</p>
                </div>
                <div className="rounded-[1.5rem] border border-[#E9DCD1] bg-[#F8F1E7] p-3 dark:border-slate/12 dark:bg-[#111625] sm:p-4 md:rounded-[2rem] md:p-5 lg:p-6">
                  {step.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={step.video.ariaLabel}
                      className="mx-auto w-full max-w-3xl rounded-[1rem] border border-[#E9DCD1] bg-white shadow-[0_10px_26px_rgba(35,53,71,0.14)] dark:border-slate/12"
                    >
                      <source src={step.video.mp4} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={step.image ?? ""}
                      alt={step.alt ?? ""}
                      width={step.width ?? 1}
                      height={step.height ?? 1}
                      className="mx-auto w-full max-w-3xl rounded-[1rem] border border-[#E9DCD1] bg-white shadow-[0_10px_26px_rgba(35,53,71,0.14)] dark:border-slate/12"
                    />
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
