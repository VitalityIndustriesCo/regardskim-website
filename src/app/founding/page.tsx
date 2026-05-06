import Link from "next/link";
import { Check } from "lucide-react";
import { ShopifyLogo, GmailLogo } from "@/components/ui/BrandLogos";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

const bullets = [
  "Connects to your Shopify store and Gmail",
  "Drafts replies using real order, tracking, and policy data",
  "Handles WISMO, returns, refunds, and complaints",
  "You review and approve every reply before it sends",
  "Your customers just see your store, never us",
];

export default function FoundingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Minimal header — logo only, no nav */}
      <header className="border-b border-slate/10 bg-white px-6 py-5 dark:bg-[#20283A]">
        <Link href="/" className="font-display text-2xl font-bold tracking-normal text-ink">
          RegardsKim
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-8">
        <div className="w-full max-w-xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Now on the Shopify App Store
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-normal text-ink md:text-5xl">
              Stop spending hours on customer&nbsp;emails
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-slate md:text-lg">
              Regards Kim is a Shopify app that connects to your Gmail, reads your customer emails, and drafts replies using your live store data. You review, approve, and send.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate/15 bg-white px-3 py-2 shadow-sm dark:border-slate/15 dark:bg-[#1D2840]">
              <ShopifyLogo className="h-5 w-5" />
              <span className="text-xs font-semibold text-ink">Built for Shopify</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate/15 bg-white px-3 py-2 shadow-sm dark:border-slate/15 dark:bg-[#1D2840]">
              <GmailLogo className="h-4 w-4" />
              <span className="text-xs font-semibold text-ink">Connects with Gmail</span>
            </div>
          </div>

          <ul className="mx-auto mt-8 max-w-sm space-y-2.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-8 max-w-sm text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-sm text-slate line-through">$98/mo</span>
              <span className="font-display text-4xl font-bold text-ink">$49</span>
              <span className="text-sm text-slate">/mo</span>
            </div>
            <p className="mt-1 text-xs text-slate">Billed monthly through your Shopify account. Starts with a 7-day free trial.</p>
          </div>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate/12 bg-white p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] dark:bg-[#20283A]">
            <h2 className="font-display text-2xl font-bold text-ink">Ready to install?</h2>
            <p className="mt-2 text-sm text-slate">Open Regards Kim in the Shopify App Store and add it to your store.</p>
            <a href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary mt-5 w-full justify-center">
              Install on Shopify
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-slate/60">
            Want to learn more?{" "}
            <Link href="/" className="text-brass underline underline-offset-2 hover:text-ink">
              Visit regardskim.com
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
