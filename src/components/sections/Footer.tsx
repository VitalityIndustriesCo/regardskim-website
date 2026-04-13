import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-white py-12">
      <div className="section-shell grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <p className="font-display font-bold text-2xl text-forest">RegardsKim</p>
          <p className="mt-3 text-sm text-slate">Customer email support for ecommerce stores.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate">
          <Link href="/" className="hover:text-forest">Home</Link>
          <Link href="/#how-it-works" className="hover:text-forest">How it works</Link>
          <Link href="/#pricing" className="hover:text-forest">Pricing</Link>
          <Link href="/#faq" className="hover:text-forest">FAQ</Link>
          <Link href="/blog" className="hover:text-forest">Blog</Link>
          <Link href="/privacy" className="hover:text-forest">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-forest">Terms of Service</Link>
        </nav>

        <div className="md:text-right">
          <p className="font-display font-bold text-2xl text-forest">Your inbox, handled.</p>
          <p className="mt-3 text-sm text-slate">Kind regards, Kim</p>
          <p className="mt-6 text-sm text-slate/80">© RegardsKim 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
