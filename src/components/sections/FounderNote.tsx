import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type FounderNoteProps = {
  copy?: HomeCopy["founderNote"];
};

export default function FounderNote({ copy = enHomeCopy.founderNote }: FounderNoteProps) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn className="mx-auto max-w-4xl rounded-[2rem] border border-[#E3D3C6] bg-white p-8 shadow-[0_12px_30px_rgba(35,53,71,0.16),0_3px_8px_rgba(35,53,71,0.09)] dark:border-slate/15 dark:bg-[#20283A] md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <Image
              src="/images/founder-matt.jpg"
              alt={copy.imageAlt}
              width={160}
              height={200}
              className="h-44 w-36 shrink-0 rounded-3xl object-cover shadow-[0_10px_24px_rgba(35,53,71,0.20)]"
            />
            <div className="text-center md:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brass">{copy.eyebrow}</p>
              <blockquote className="mt-4 text-lg leading-8 text-ink md:text-xl">
                &ldquo;{copy.quote}&rdquo;
              </blockquote>
              <p className="mt-5 font-bold text-ink">{copy.attribution}</p>
              <Link href="/about" className="mt-2 inline-block text-sm font-semibold text-brass hover:underline">
                {copy.link}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
