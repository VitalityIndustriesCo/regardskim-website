"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
          <a href="#how-it-works" className="transition-colors hover:text-warm-coral">How It Works</a>
          <a href="#pricing" className="transition-colors hover:text-warm-coral">Pricing</a>
          <a href="#faq" className="transition-colors hover:text-warm-coral">FAQ</a>
        </div>

        <motion.a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-coral text-sm"
          animate={prefersReducedMotion ? undefined : { boxShadow: ["0 4px 0 0 #c86354", "0 8px 16px rgba(233,124,107,0.35)", "0 4px 0 0 #c86354"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Start with Kim
        </motion.a>
      </nav>
    </header>
  );
}
