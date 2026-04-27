import { CheckCircle2, Clock3, MailCheck, ShieldCheck, Sparkles } from "lucide-react";
import { GmailLogo, ShopifyLogo } from "@/components/ui/BrandLogos";

const customerEmail = {
  sender: "sarah@gmail.com",
  subject: "Where is my order #1842?",
  body: "Hi, I ordered the weighted blanket last week and haven’t received tracking yet. Has it shipped?",
};

const orderFacts = [
  ["Order", "#1842"],
  ["Status", "Fulfilled 23/08/2025"],
  ["Carrier", "Australia Post"],
  ["Tracking", "AP4821093AU"],
];

export default function IntegrationHeroPreview() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-[2rem] border border-[#E3D3C6] bg-[#FFF9F3] shadow-[0_34px_110px_rgba(35,53,71,0.24),0_18px_45px_rgba(233,124,107,0.14)] dark:border-slate/15 dark:bg-[#0C1118] dark:shadow-[0_34px_110px_rgba(0,0,0,0.45),0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9DCD1] bg-white/70 dark:border-slate/12 dark:bg-[#111827]/80 px-5 py-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E97C6B] text-base font-black text-white shadow-[0_10px_24px_rgba(233,124,107,0.28)]">K</div>
            <div>
              <p className="font-display text-lg font-extrabold text-ink">Regards Kim</p>
              <p className="text-xs font-medium text-slate">Inside your Shopify admin</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CFE3D1] bg-[#F3FAF2] px-3 py-1.5 text-[#386D34] dark:border-slate/15 dark:bg-[#1B2436] dark:text-emerald-400"><ShopifyLogo className="h-4 w-4" /> Shopify admin</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9DCD1] bg-white px-3 py-1.5 text-ink dark:border-slate/12 dark:bg-[#1B2436]"><GmailLogo className="h-4 w-4" /> Gmail Connected</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F1C8C0] bg-[#FFF0ED] px-3 py-1.5 text-[#B85345] dark:border-brass/25 dark:bg-[#1E293B] dark:text-brass"><ShieldCheck size={14} /> Approval required</span>
          </div>
        </div>

        <div className="grid gap-5 bg-[radial-gradient(circle_at_20%_20%,rgba(233,124,107,0.10),transparent_30%),linear-gradient(180deg,#FFF9F3,#F8F1E7)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(176,141,87,0.06),transparent_30%),linear-gradient(180deg,#0C1118,#0C111B)] p-4 md:grid-cols-[1fr_1.08fr_0.82fr] md:p-7">
          <section className="rounded-[1.5rem] border border-[#E9DCD1] bg-white p-4 shadow-[0_18px_40px_rgba(35,53,71,0.14)] dark:border-slate/12 dark:bg-[#1B2436] dark:shadow-[0_18px_40px_rgba(0,0,0,0.30)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6F61] dark:text-brass">Email from Gmail</p>
                <h3 className="mt-1 font-display text-xl font-extrabold text-ink">Customer email</h3>
              </div>
              <MailCheck className="text-[#E97C6B]" size={22} />
            </div>
            <div className="rounded-2xl border border-[#E9DCD1] bg-[#FFF9F3] p-4 shadow-[0_10px_26px_rgba(35,53,71,0.08)] dark:border-slate/12 dark:bg-[#0C1118] dark:shadow-[0_10px_26px_rgba(0,0,0,0.24)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E97C6B] text-sm font-bold text-white">S</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{customerEmail.sender}</p>
                  <p className="text-xs text-slate">2 hours ago</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-extrabold text-ink">{customerEmail.subject}</p>
              <p className="mt-2 text-sm leading-6 text-slate">{customerEmail.body}</p>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#FFF0ED] px-3 py-1.5 text-xs font-bold text-[#B85345] dark:bg-[#1E293B] dark:text-brass">
              <Sparkles size={13} /> Kim matched this to an order
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#E9DCD1] bg-white p-4 shadow-[0_22px_48px_rgba(35,53,71,0.16)] dark:border-slate/12 dark:bg-[#1B2436] dark:shadow-[0_22px_48px_rgba(0,0,0,0.32)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6F61] dark:text-brass">Reply inside Shopify</p>
                <h3 className="mt-1 font-display text-xl font-extrabold text-ink">Ready for approval</h3>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E9DCD1] bg-[#FFF9F3] p-5 shadow-[0_12px_30px_rgba(35,53,71,0.09)] dark:border-slate/12 dark:bg-[#0C1118] dark:shadow-[0_12px_30px_rgba(0,0,0,0.26)]">
              <p className="text-sm leading-6 text-ink">Hi Sarah,</p>
              <p className="mt-3 text-sm leading-6 text-ink">Thanks for checking in. Regards Kim found order <strong>#1842</strong> and it shipped yesterday with Australia Post.</p>
              <p className="mt-3 text-sm leading-6 text-ink">Your tracking number is <strong>AP4821093AU</strong>. The first scan can take 24 to 48 hours, so it should update shortly.</p>
              <p className="mt-3 text-sm leading-6 text-ink">Kind regards,<br />Kim</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-[0_8px_18px_rgba(233,124,107,0.28)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.28)]">Approve & send</span>
              <span className="rounded-full border border-[#E3D3C6] bg-white px-4 py-2 text-xs font-bold text-ink dark:border-slate/15 dark:bg-[#1B2436]">Edit draft</span>
              <span className="rounded-full border border-[#E3D3C6] bg-white px-4 py-2 text-xs font-bold text-ink dark:border-slate/15 dark:bg-[#1B2436]">Skip</span>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#CFE3D1] bg-[#F8FCF6] p-4 shadow-[0_18px_40px_rgba(56,109,52,0.13)] dark:border-slate/15 dark:bg-[#1B2436] dark:shadow-[0_18px_40px_rgba(0,0,0,0.30)]">
            <div className="mb-4 flex items-center gap-3">
              <ShopifyLogo className="h-9 w-9" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5F7F4A] dark:text-brass">Shopify order</p>
                <h3 className="font-display text-xl font-extrabold text-ink">Matched data</h3>
              </div>
            </div>
            <div className="space-y-3">
              {orderFacts.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#DCEBDA] bg-white px-4 py-3 dark:border-emerald-900 dark:bg-[#1B2436]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B8D60] dark:text-emerald-400">{label}</p>
                  <p className="mt-1 text-sm font-extrabold text-ink">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-slate dark:border dark:border-slate/12 dark:bg-[#1B2436]">
              <Clock3 size={15} className="text-[#7FA7A1]" /> Synced moments ago
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate">
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#386D34]" /> Sends from your Gmail</span>
        <span className="hidden h-1 w-1 rounded-full bg-[#C9B5A7] dark:bg-slate/40 sm:block" />
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#386D34]" /> Uses Shopify order data</span>
        <span className="hidden h-1 w-1 rounded-full bg-[#C9B5A7] dark:bg-slate/40 sm:block" />
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#386D34]" /> You approve before anything sends</span>
      </div>
    </div>
  );
}
