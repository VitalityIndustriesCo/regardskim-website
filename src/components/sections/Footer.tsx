export default function Footer() {
  return (
    <footer className="border-t border-warm-taupe/35 bg-off-white-paper py-12">
      <div className="section-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">RegardsKim</p>
          <p className="mt-3 text-ink-navy/80">Shopify helps them buy. Kim helps them stay.</p>
          <p className="mt-2 text-sm text-ink-navy/65">Post-purchase support, handled with care.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <a href="#top" className="hover:text-warm-coral">Home</a>
          <a href="#how-it-works" className="hover:text-warm-coral">How It Works</a>
          <a href="#pricing" className="hover:text-warm-coral">Pricing</a>
          <a href="#faq" className="hover:text-warm-coral">FAQ</a>
          <a href="#" className="hover:text-warm-coral">Contact</a>
          <a href="#" className="hover:text-warm-coral">Privacy Policy</a>
          <a href="#" className="hover:text-warm-coral">Terms of Service</a>
        </nav>

        <div className="md:text-right">
          <p className="font-display text-2xl">Kind regards, Kim.</p>
          <p className="mt-6 text-sm text-ink-navy/65">© RegardsKim 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
