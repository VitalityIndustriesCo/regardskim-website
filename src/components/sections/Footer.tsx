"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getHomeCopy, isLocale, languageOptions } from "@/lib/i18n/home";
import type { HomeCopy, SupportedLanguageCode } from "@/lib/i18n/types";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";

function localeFromPathname(pathname: string): SupportedLanguageCode {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : "en";
}

function resolveHref(href: string) {
  return href === "SHOPIFY_APP_STORE_INSTALL_URL" ? SHOPIFY_APP_STORE_INSTALL_URL : href;
}

type FooterProps = {
  copy?: HomeCopy["footer"];
  locale?: SupportedLanguageCode;
};

export default function Footer({ copy: copyProp, locale: localeProp }: FooterProps) {
  const pathname = usePathname();
  const locale = localeProp ?? localeFromPathname(pathname);
  const copy = copyProp ?? getHomeCopy(locale).footer;
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] py-12 dark:bg-[#20283A]">
      <div className="section-shell">
        {/* Top row: brand/subscribe + main 4 columns */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
          <div>
            <p className="font-display text-2xl font-bold text-ink">RegardsKim</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-white/80">
              {copy.description}
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <p className="mb-2 text-sm font-medium text-ink dark:text-white">{copy.subscribeHeading}</p>
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={copy.emailPlaceholder}
                  className="w-full rounded-lg border border-slate/20 bg-mist px-3 py-2 text-sm text-ink placeholder:text-slate/50 focus:border-brass focus:bg-white focus:outline-none focus:ring-2 focus:ring-brass/30 dark:bg-[#2A3347] dark:border-slate/40 dark:text-white dark:placeholder:text-slate/50 dark:focus:bg-[#2A3347]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-lg bg-brass px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-oxblood disabled:opacity-60"
                >
                  {status === "loading" ? "..." : copy.subscribeCta}
                </button>
              </div>
              {status === "success" && (
                <p className="mt-2 text-xs text-emerald-600">{copy.successMessage}</p>
              )}
              {status === "error" && (
                <p className="mt-2 text-xs text-red-600">{copy.errorMessage}</p>
              )}
            </form>

            {/* Company + Resources tucked under subscribe */}
            <div className="mt-8 grid grid-cols-2 gap-8">
              {copy.secondaryColumns.map((column) => (
                <div key={column.title}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-white/60">{column.title}</p>
                  <div className="mt-4 space-y-3 text-[0.9375rem] leading-6 text-slate-700 dark:text-white">
                    {column.links.map((link) => (
                      <Link key={link.href + link.label} href={resolveHref(link.href)} className="block hover:text-ink">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 xl:grid-cols-4">
            {copy.columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-white/60">{column.title}</p>
                <div className="mt-4 space-y-3 text-[0.9375rem] leading-6 text-slate-700 dark:text-white">
                  {column.links.map((link) => (
                    <Link key={link.href + link.label} href={resolveHref(link.href)} className="block hover:text-ink">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate/10 dark:border-slate/20 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold text-ink">{copy.tagline}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{copy.signoff}</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-2 sm:justify-end" aria-label={copy.languageHeading}>
              {languageOptions.map((language) => (
                <Link
                  key={language.code}
                  href={language.href}
                  className={`text-xs font-semibold hover:text-ink ${language.code === locale ? "text-ink" : "text-slate-600 dark:text-white/60"}`}
                  hrefLang={language.htmlLang}
                >
                  {language.label}
                </Link>
              ))}
            </div>
            <p className="dark:text-white/60">{copy.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
