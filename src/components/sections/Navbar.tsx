"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/affiliate", label: "Affiliate" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-slate/15 bg-[#FFF9F3]/88 dark:bg-[#0C111B]/90 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_10px_30px_rgba(35,53,71,0.08)] backdrop-blur-xl"
            : "backdrop-blur-md"
        }`}
      >
        <nav className="section-shell flex h-20 items-center justify-between" aria-label="Primary">
          <Link href="/" className="font-display text-3xl font-extrabold tracking-tight text-ink">
            Regards Kim
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Link href="/founding" className="btn-primary">
              Lock in your spot
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate/15 bg-white dark:bg-[#1B2436] text-ink transition-all duration-200 hover:border-brass/40 hover:bg-[#FFF0ED] dark:hover:bg-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "top-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />

      <div
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col border-l border-slate/10 bg-white dark:bg-[#111827] shadow-[-8px_0_32px_rgba(0,0,0,0.12)] dark:shadow-[-8px_0_32px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-slate/10 px-6 py-5">
          <span className="font-display text-2xl font-bold text-ink">Menu</span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate/20 bg-mist text-ink transition-colors hover:bg-slate/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-mist"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate/10 pt-6">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium text-slate">Theme</span>
              <ThemeToggle />
            </div>
            <Link href="/founding" className="btn-primary w-full" onClick={closeMobileMenu}>
              Lock in your spot
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
