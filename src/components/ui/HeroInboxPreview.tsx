import type { ReactNode } from "react";
import { Flag, PenLine } from "lucide-react";

function AnnotationBadge({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-slate/15 bg-white px-3 py-2 text-xs font-medium text-ink shadow-[0_4px_16px_rgba(0,0,0,0.10)] dark:bg-[#1B2436] md:flex ${className ?? ""}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/10 text-brass">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function InboxBadge({ children, tone = "muted" }: { children: ReactNode; tone?: "accent" | "muted" }) {
  const toneClass =
    tone === "accent"
      ? "border-brass/30 bg-brass/15 text-brass"
      : "border-mist bg-cream/60 text-slate";

  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${toneClass}`}>{children}</span>;
}

function Avatar({ initial, tone = "default" }: { initial: string; tone?: "default" | "accent" }) {
  const toneClass = tone === "accent" ? "bg-brass/20 text-brass" : "bg-mist text-ink";

  return (
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm ${toneClass}`}>
      {initial}
    </div>
  );
}

export default function HeroInboxPreview() {
  return (
    <div className="relative mt-14 w-full overflow-x-clip px-2 sm:px-0">
      <div className="relative mx-auto max-w-4xl">
        <AnnotationBadge
          icon={<Flag size={14} strokeWidth={2} />}
          label="Sorted and ready to go"
          className="-top-4 right-4 z-10 lg:-right-16"
        />
        <AnnotationBadge
          icon={<PenLine size={14} strokeWidth={2} />}
          label="Drafts in your voice"
          className="-bottom-4 left-4 z-10 lg:-left-16"
        />

        <div className="rounded-[1.5rem] border border-slate/12 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] dark:bg-[#111827] dark:shadow-[0_16px_48px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.18)] sm:rounded-[2rem]">
          <div className="flex items-center gap-3 border-b border-mist bg-mist px-3 py-3 dark:border-slate/15 dark:bg-[#0C1118] sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EE8A72]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F1C75B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8FCB81]" />
            </div>
            <p className="text-xs font-medium tracking-[0.08em] text-slate uppercase">Inbox</p>
          </div>

          <div className="relative p-2.5 sm:p-4 md:p-5">
            <div className="space-y-3">
              <article className="rounded-[1.25rem] border border-brass/25 bg-brass/[0.08] p-3 text-left shadow-[0_12px_30px_rgba(176,141,87,0.12)] dark:border-slate/15 dark:bg-[#1B2436] sm:rounded-[1.5rem] sm:p-4">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Avatar initial="S" tone="accent" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold text-ink sm:text-[15px]">Sarah M.</p>
                        <InboxBadge tone="accent">To Respond</InboxBadge>
                      </div>
                      <span className="text-[10px] text-slate sm:text-[11px]">Now</span>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold text-ink sm:text-sm">Where is my order?</p>
                    <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                      Hi, I ordered the weighted blanket last week and haven&apos;t received any tracking...
                    </p>

                    <div className="mt-3 rounded-[1rem] border border-brass/20 bg-cream px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:mt-4 sm:rounded-[1.25rem] sm:px-4 sm:py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brass sm:text-xs">Draft</p>
                      <p className="mt-1.5 text-[12px] leading-5 text-slate sm:mt-2 sm:text-sm sm:leading-6">
                        <span className="sm:hidden">Hi Sarah — your order #1842 shipped yesterday. Tracking: AP4821…</span>
                        <span className="hidden sm:inline">
                          Hi Sarah, Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post.
                          Your tracking number is...
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-end md:hidden">
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-mist bg-cream px-3 py-2 text-[11px] font-medium text-ink shadow-sm dark:border-slate/15 dark:bg-[#1B2436]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/10 text-brass">
                      <PenLine size={12} strokeWidth={2} />
                    </span>
                    Drafts in your voice
                  </div>
                </div>
              </article>

              <article className="rounded-[1.25rem] border border-mist bg-cream p-3 text-left dark:border-slate/15 dark:bg-[#1B2436] sm:rounded-[1.5rem] sm:p-4">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Avatar initial="J" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold text-ink sm:text-[15px]">James T.</p>
                        <InboxBadge>Return Request</InboxBadge>
                      </div>
                      <span className="text-[10px] text-slate sm:text-[11px]">1:15 PM</span>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold text-ink sm:text-sm">Return request for order #1836</p>
                    <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                      I&apos;d like to return the throw pillow, it&apos;s not quite the right colour...
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-[1.25rem] border border-mist bg-cream p-3 text-left dark:border-slate/15 dark:bg-[#1B2436] sm:rounded-[1.5rem] sm:p-4">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Avatar initial="M" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold text-ink sm:text-[15px]">Michael R.</p>
                        <InboxBadge>Refund</InboxBadge>
                      </div>
                      <span className="text-[10px] text-slate sm:text-[11px]">11:42 AM</span>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold text-ink sm:text-sm">Damaged item received</p>
                    <p className="mt-1 text-[13px] leading-5 text-slate sm:text-sm sm:leading-6">
                      The package arrived but the item inside was broken...
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-4 flex justify-center md:hidden">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-mist bg-cream px-3 py-2 text-[11px] font-medium text-ink shadow-sm dark:border-slate/15 dark:bg-[#1B2436]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/10 text-brass">
                  <Flag size={12} strokeWidth={2} />
                </span>
                Sorted and ready to go
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
