import { Check, X } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const genericToolPoints = [
  "Built for every inbox, not ecommerce",
  "Can't access your order or tracking data",
  "Doesn't know your store policies",
  "Drafts generic, vague replies",
  "No understanding of ecommerce support patterns",
];

const kimPoints = [
  "Built specifically for Shopify stores",
  "Connects to your orders, tracking, and products",
  "Uses your actual store policies",
  "Drafts accurate, data-driven replies",
  "Understands WISMO, returns, refunds, and more",
];

const customerEmail =
  '“Hi, just checking on order #4721 — the tracking link hasn\'t updated in three days. Has it actually shipped?”';

const genericReply =
  "Hi there, thanks for reaching out. I'm sorry for the confusion. Shipping updates can sometimes take a little longer than expected. Please keep an eye on your tracking link, and if it still doesn't update soon, contact the shipping carrier or reply here for further help.";

type ComparisonCardProps = {
  title: string;
  items: string[];
  tone: "generic" | "kim";
};

function ComparisonCard({ title, items, tone }: ComparisonCardProps) {
  const isKim = tone === "kim";
  const Icon = isKim ? Check : X;

  return (
    <article
      className={[
        "h-full rounded-[1.75rem] border bg-cream p-6 shadow-[0_12px_40px_rgba(0,0,0,0.3)] md:p-8",
        isKim ? "border-brass/40 bg-gradient-to-br from-cream via-cream to-forest/20" : "border-mist",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-normal text-ink md:text-3xl">{title}</h3>
        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
            isKim ? "bg-brass/20 text-brass" : "bg-mist/50 text-slate",
          ].join(" ")}
        >
          {isKim ? "Built for ecommerce" : "One-size-fits-all"}
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={[
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
                isKim ? "border-brass/30 bg-brass/15 text-brass" : "border-mist bg-mist/50 text-slate",
              ].join(" ")}
            >
              <Icon size={14} strokeWidth={2.4} />
            </span>
            <span className={isKim ? "text-ink" : "text-slate"}>{item}</span>
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
};

function ReplyCard({ label, body, tone }: ReplyCardProps) {
  const isKim = tone === "kim";

  if (!isKim) {
    return (
      <article className="h-full rounded-[1.75rem] border border-mist bg-cream p-6 shadow-[0_12px_40px_rgba(0,0,0,0.3)] md:p-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
            {label}
          </span>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate md:text-base">{body}</p>
      </article>
    );
  }

  return (
    <article className="h-full rounded-[1.75rem] border-2 border-brass/40 bg-gradient-to-br from-cream via-cream to-forest/20 p-6 shadow-[0_16px_44px_rgba(0,0,0,0.35)] md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
          {label}
        </span>
        <span className="rounded-full border border-brass/30 bg-brass/15 px-3 py-1 text-xs font-semibold text-brass">
          Draft — Ready for approval
        </span>
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-brass/20 bg-[#1E293B] p-5 md:p-6">
        <div className="space-y-3 text-sm md:text-[0.95rem]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">To</span>
            <span className="font-medium text-ink">Sarah M.</span>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">Subject</span>
            <span className="font-medium text-ink">Re: Order #4721 — Shipping Update</span>
          </div>
        </div>

        <div className="my-5 h-px bg-brass/15" />

        <div className="space-y-4 text-sm leading-7 text-ink md:text-base">
          <p>Hey Sarah, thanks for checking in.</p>
          <p>I looked up order #4721 — it was dispatched from our warehouse on March 29 via Australia Post. Tracking is currently showing <span className="font-medium">&ldquo;label created&rdquo;</span>, which means the carrier hasn&apos;t scanned it yet. This usually updates within 24–48 hours, but three days is longer than expected.</p>
          <p>I&apos;ll keep an eye on it from our side — if it hasn&apos;t moved by tomorrow afternoon, I&apos;ll follow up with the carrier directly and let you know.</p>

          <a
            href="#"
            className="inline-flex items-center rounded-full border border-brass/30 bg-brass/15 px-4 py-2 text-sm font-semibold text-brass transition hover:bg-brass/20"
          >
            View tracking →
          </a>

          <div className="pt-2 text-ink">
            <p>Kind regards,</p>
            <p className="font-medium">Kim</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Comparison() {
  return (
    <section className="bg-forest py-16 md:py-24">
      <div className="section-shell">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">See the difference</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-normal text-ink md:text-5xl">
              Regards Kim knows your store.
            </h2>
            <p className="mt-4 text-base text-slate md:text-lg">
              Same customer question. Very different level of help.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.04}>
            <ComparisonCard title="Generic AI email tools" items={genericToolPoints} tone="generic" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ComparisonCard title="Regards Kim" items={kimPoints} tone="kim" />
          </FadeIn>
        </div>

        <FadeIn delay={0.12}>
          <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-mist bg-cream px-6 py-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.3)] md:px-8 md:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">Customer email</p>
            <p className="mt-3 text-base leading-7 text-ink md:text-lg">{customerEmail}</p>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.16}>
            <ReplyCard label="Generic AI" body={genericReply} tone="generic" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ReplyCard label="Regards Kim" body="" tone="kim" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
