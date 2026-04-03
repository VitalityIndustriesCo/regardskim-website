import FadeIn from "@/components/ui/FadeIn";
import MockupWindow from "@/components/ui/MockupWindow";

export default function VideoDemo() {
  return (
    <section className="texture-mist py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-brass/30 bg-paper px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate">
            1 Minute Demo
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-forest md:text-6xl">See Kim in action</h2>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto mt-8 max-w-4xl">
          <MockupWindow title="Product demo">
            <div className="relative aspect-video bg-mist">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest/20 bg-paper/90 shadow-sm">
                  <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-forest" />
                </div>
                <p className="text-sm font-medium text-slate">Demo video coming soon</p>
              </div>
            </div>
          </MockupWindow>
        </FadeIn>
      </div>
    </section>
  );
}
