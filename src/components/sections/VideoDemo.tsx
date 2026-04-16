import { Play } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function VideoDemo() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-normal text-forest md:text-6xl">
            See how Regards Kim works
          </h2>
          <p className="mt-4 text-sm text-slate md:text-base">
            A quick walkthrough is on the way. For now, here&apos;s where the demo will live.
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-8 max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-forest/15 bg-paper p-3 shadow-sm md:p-4">
            <div className="relative aspect-video rounded-[1.5rem] border border-dashed border-forest/15 bg-mist/70">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-18 w-18 items-center justify-center rounded-full border border-forest/15 bg-paper text-forest shadow-sm md:h-20 md:w-20">
                  <Play size={28} className="ml-1 fill-current" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-forest md:text-3xl">Product Demo</p>
                  <p className="mt-2 text-sm text-slate md:text-base">Video coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
