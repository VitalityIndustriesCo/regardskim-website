"use client";

import { useEffect, useState } from "react";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-warm-taupe/30 bg-off-white-paper/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between" aria-label="Primary">
        <a href="#top" className="font-display text-2xl tracking-tight text-ink-navy">
          RegardsKim
        </a>

        <div className="hidden items-center gap-8 text-sm md:flex">
          <a href="#how-it-works" className="hover:text-warm-coral transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-warm-coral transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-warm-coral transition-colors">FAQ</a>
        </div>

        <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral text-sm">
          Start with Kim
        </a>
      </nav>
    </header>
  );
}
