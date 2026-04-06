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
      className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-forest/10 bg-paper px-3 py-2 text-xs font-medium text-forest shadow-[0_14px_30px_rgba(26,26,26,0.08)] md:flex ${className ?? ""}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/10 text-brass">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function InboxBadge({ children, tone = "muted" }: { children: ReactNode; tone?: "accent" | "muted" }) {
  const toneClass =
    tone === "accent"
      ? "border-brass/20 bg-brass/10 text-brass"
      : "border-forest/10 bg-mist text-slate";

  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${toneClass}`}>{children}</span>;
}

function Avatar({ initial, tone = "default" }: { initial: string; tone?: "default" | "accent" }) {
  const toneClass = tone === "accent" ? "bg-brass/15 text-brass" : "bg-mist text-forest";

  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${toneClass}`}>
      {initial}
    </div>
  );
}

export default function HeroInboxPreview() {
  return (
    <div className="relative mt-14 w-full px-2 sm:px-0">
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

      <div className="rounded-[2rem] border border-forest/12 bg-paper shadow-[0_24px_60px_rgba(26,26,26,0.10)]">
        <div className="flex items-center gap-3 border-b border-forest/10 bg-mist/70 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EE8A72]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F1C75B]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8FCB81]" />
          </div>
          <p className="text-xs font-medium tracking-[0.08em] text-slate uppercase">Inbox</p>
        </div>

        <div className="relative p-3 sm:p-4 md:p-5">
          <div className="space-y-3">
            <article className="rounded-[1.5rem] border border-brass/18 bg-brass/[0.06] p-4 text-left shadow-[0_12px_30px_rgba(232,93,58,0.08)]">
              <div className="flex items-start gap-3">
                <Avatar initial="S" tone="accent" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-forest sm:text-[15px]">Sarah M.</p>
                      <InboxBadge tone="accent">To Respond</InboxBadge>
                    </div>
                    <span className="text-[11px] text-slate">Now</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-forest">Where is my order?</p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    Hi, I ordered the weighted blanket last week and haven&apos;t received any tracking...
                  </p>

                  <div className="mt-4 rounded-[1.25rem] border border-brass/15 bg-paper px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brass">Draft</p>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      Hi Sarah, Thanks for reaching out! Your order #1842 shipped yesterday via Australia Post.
                      Your tracking number is...
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end md:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-paper px-3 py-2 text-[11px] font-medium text-forest shadow-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/10 text-brass">
                    <PenLine size={12} strokeWidth={2} />
                  </span>
                  Drafts in your voice
                </div>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-forest/10 bg-paper p-4 text-left">
              <div className="flex items-start gap-3">
                <Avatar initial="J" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-forest sm:text-[15px]">James T.</p>
                      <InboxBadge>Return Request</InboxBadge>
                    </div>
                    <span className="text-[11px] text-slate">1:15 PM</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-forest">Return request for order #1836</p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    I&apos;d like to return the throw pillow, it&apos;s not quite the right colour...
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-forest/10 bg-paper p-4 text-left">
              <div className="flex items-start gap-3">
                <Avatar initial="M" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-forest sm:text-[15px]">Michael R.</p>
                      <InboxBadge>Refund</InboxBadge>
                    </div>
                    <span className="text-[11px] text-slate">11:42 AM</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-forest">Damaged item received</p>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    The package arrived but the item inside was broken...
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-4 flex justify-center md:hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-paper px-3 py-2 text-[11px] font-medium text-forest shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/10 text-brass">
                <Flag size={12} strokeWidth={2} />
              </span>
              Instant categorization
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
