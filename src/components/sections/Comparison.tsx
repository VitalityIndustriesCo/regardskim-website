import { Check, X } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

type ComparisonCardProps = {
  title: string;
  items: string[];
  tone: "generic" | "kim";
  badge: string;
};

function ComparisonCard({ title, items, tone, badge }: ComparisonCardProps) {
  const isKim = tone === "kim";
  const Icon = isKim ? Check : X;

  return (
    <article
      className={[
        "h-full rounded-[1.75rem] border bg-white p-6 dark:bg-[#20283A] md:p-8",
        isKim
          ? "border-brass/30 shadow-[0_10px_28px_rgba(35,53,71,0.17),0_2px_6px_rgba(35,53,71,0.09)]"
          : "border-slate/12 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)]",
      ].join(" ")}
    >
      <div className="flex min-h-[4.5rem] items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-normal text-ink md:text-3xl">{title}</h3>
        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
            isKim ? "bg-brass/15 text-brass" : "bg-slate/10 text-slate",
          ].join(" ")}
        >
          {badge}
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={[
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
                isKim
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400 dark:bg-emerald-500 dark:text-white"
                  : "border-slate/20 bg-slate/5 text-slate",
              ].join(" ")}
            >
              <Icon size={14} strokeWidth={2.4} />
            </span>
            <span className="text-slate">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type ReplyCardProps = {
  label: string;
  body: string;
  tone: "generic" | "kim";
  copy: HomeCopy["comparison"];
};

function ReplyCard({ label, body, tone, copy }: ReplyCardProps) {
  const isKim = tone === "kim";

  if (!isKim) {
    return (
      <article className="h-full rounded-[1.75rem] border border-slate/12 bg-white p-6 shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A] dark:shadow-[0_4px_20px_rgba(0,0,0,0.24),0_1px_3px_rgba(0,0,0,0.16)] md:p-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-slate/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
            {label}
          </span>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate md:text-base">{body}</p>
      </article>
    );
  }

  return (
    <article className="h-full rounded-[1.75rem] border-2 border-brass/30 bg-white p-6 shadow-[0_10px_28px_rgba(35,53,71,0.17),0_2px_6px_rgba(35,53,71,0.09)] dark:bg-[#20283A] dark:shadow-[0_8px_32px_rgba(0,0,0,0.28),0_2px_6px_rgba(0,0,0,0.18)] md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          {label}
        </span>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
          {copy.draftedReplyLabel}
        </span>
      </div>

      {/* Email card — light browser/Gmail feel */}
      <div className="mt-5 rounded-[1.25rem] border border-slate/10 bg-[#F5F0EB] p-5 md:p-6 dark:bg-[#111625] dark:border-slate/15">
        <div className="space-y-3 text-sm md:text-[0.95rem]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">{copy.replyToLabel}</span>
            <span className="font-medium text-ink">{copy.replyRecipient}</span>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">{copy.replySubjectLabel}</span>
            <span className="font-medium text-ink">{copy.replySubject}</span>
          </div>
        </div>

        <div className="my-5 h-px bg-slate/10" />

        <div className="space-y-4 text-sm leading-7 text-ink md:text-base">
          {copy.productReplyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <span className="inline-flex items-center rounded-full border border-brass/30 bg-brass/10 px-4 py-2 text-sm font-semibold text-brass">
            {copy.trackingCta}
          </span>

          <div className="pt-2 text-ink">
            <p>{copy.signoffLineOne}</p>
            <p className="font-medium">{copy.signoffName}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

type ComparisonProps = {
  copy?: HomeCopy["comparison"];
};

export default function Comparison({ copy = enHomeCopy.comparison }: ComparisonProps) {
  return (
    <section id="compare" className="bg-paper py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">{copy.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
              {copy.heading}
            </h2>
            <p className="mt-4 text-base text-slate md:text-lg">
              {copy.subheading}
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.04}>
            <ComparisonCard title={copy.genericTitle} items={copy.genericPoints} tone="generic" badge={copy.genericBadge} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ComparisonCard title={copy.productTitle} items={copy.productPoints} tone="kim" badge={copy.productBadge} />
          </FadeIn>
        </div>

        <FadeIn delay={0.12}>
          <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-slate/12 bg-white px-6 py-5 text-center shadow-[0_8px_22px_rgba(35,53,71,0.13),0_2px_5px_rgba(35,53,71,0.08)] dark:bg-[#20283A] dark:shadow-[0_4px_20px_rgba(0,0,0,0.24)] md:px-8 md:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">{copy.customerEmailLabel}</p>
            <p className="mt-3 text-base leading-7 text-ink md:text-lg">{copy.customerEmail}</p>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.16}>
            <ReplyCard label={copy.genericReplyLabel} body={copy.genericReply} tone="generic" copy={copy} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ReplyCard label={copy.productReplyLabel} body="" tone="kim" copy={copy} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
