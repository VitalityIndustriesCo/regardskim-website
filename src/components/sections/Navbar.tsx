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
          ? "border-forest/15 bg-paper/85 shadow-[0_6px_22px_rgba(32,53,43,0.08)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between" aria-label="Primary">
        <a href="#top" className="font-display text-3xl tracking-tight text-forest">
          RegardsKim
        </a>

        <div className="hidden items-center gap-8 text-sm text-slate md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-forest">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-forest">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-forest">
            FAQ
          </a>
        </div>

        <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-primary">
          See Kim in action
        </a>
      </nav>
    </header>
  );
}
