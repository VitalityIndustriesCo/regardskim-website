"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getHomeCopy, isLocale, languageOptions } from "@/lib/i18n/home";
import type { HomeCopy, SupportedLanguageCode } from "@/lib/i18n/types";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

function localeFromPathname(pathname: string): SupportedLanguageCode {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : "en";
}

type NavbarProps = {
  copy?: HomeCopy["nav"];
  locale?: SupportedLanguageCode;
};

export default function Navbar({ copy: copyProp, locale: localeProp }: NavbarProps) {
  const pathname = usePathname();
  const locale = localeProp ?? localeFromPathname(pathname);
  const copy = copyProp ?? getHomeCopy(locale).nav;
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
        className={`sticky top-0 z-50 border-b border-slate/15 bg-[#FFF9F3]/88 dark:bg-[#090B13]/90 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_10px_30px_rgba(35,53,71,0.08)] backdrop-blur-xl"
            : "backdrop-blur-md"
        }`}
      >
        <nav className="section-shell flex h-20 items-center justify-between" aria-label="Primary">
          <Link href="/" className="shrink-0 font-display text-2xl font-extrabold tracking-normal text-ink lg:text-3xl">
            Regards Kim
          </Link>

          <div className="hidden items-center gap-4 text-[13px] font-semibold text-slate lg:gap-5 lg:text-sm min-[1120px]:flex">
            {copy.links.map((link) => (
              <Link key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-4 hidden shrink-0 items-center gap-3 lg:ml-6 min-[1120px]:flex">
            <label className="sr-only" htmlFor="language-switcher">
              {copy.languageLabel}
            </label>
            <div className="relative shrink-0">
              <select
                id="language-switcher"
                value={locale}
                onChange={(event) => {
                  window.location.href = languageOptions.find((language) => language.code === event.target.value)?.href ?? "/";
                }}
                className="h-11 w-[7.25rem] appearance-none rounded-full border border-slate/15 bg-white py-2 pl-4 pr-8 text-sm font-semibold text-slate shadow-sm transition-colors hover:text-ink dark:bg-[#1D2840]"
                aria-label={copy.languageLabel}
              >
                {languageOptions.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
                aria-hidden="true"
              />
            </div>
            <Link href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary min-w-[9.5rem] whitespace-nowrap px-5 text-center leading-none">
              {copy.installCta}
            </Link>
          </div>

          <div className="flex items-center gap-2 min-[1120px]:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate/15 bg-white dark:bg-[#1D2840] text-ink transition-all duration-200 hover:border-brass/40 hover:bg-[#FFF0ED] dark:hover:bg-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2"
            aria-label={mobileMenuOpen ? copy.closeMenuLabel : copy.openMenuLabel}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">{copy.toggleMenuLabel}</span>
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
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } min-[1120px]:hidden`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />

      <div
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col border-l border-slate/10 bg-white dark:bg-[#20283A] shadow-[-8px_0_32px_rgba(0,0,0,0.12)] dark:shadow-[-8px_0_32px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out min-[1120px]:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-slate/10 px-6 py-5">
          <span className="font-display text-2xl font-bold text-ink">{copy.menuLabel}</span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate/20 bg-mist text-ink transition-colors hover:bg-slate/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2"
            aria-label={copy.closeMenuLabel}
            onClick={closeMobileMenu}
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 py-6">
          <div className="flex flex-col gap-2">
            {copy.links.map((link) => (
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
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate" htmlFor="mobile-language-switcher">
                {copy.languageLabel}
              </label>
              <select
                id="mobile-language-switcher"
                value={locale}
                onChange={(event) => {
                  window.location.href = languageOptions.find((language) => language.code === event.target.value)?.href ?? "/";
                }}
                className="w-full rounded-lg border border-slate/15 bg-mist px-3 py-2 text-sm font-semibold text-ink"
              >
                {languageOptions.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            <Link href={SHOPIFY_APP_STORE_INSTALL_URL} className="btn-primary w-full" onClick={closeMobileMenu}>
              {copy.installCta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
