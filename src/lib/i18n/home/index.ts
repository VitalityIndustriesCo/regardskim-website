import { absoluteUrl } from "@/lib/seo";
import { deHomeCopy } from "@/lib/i18n/home/de";
import { enHomeCopy } from "@/lib/i18n/home/en";
import { esHomeCopy } from "@/lib/i18n/home/es";
import { frHomeCopy } from "@/lib/i18n/home/fr";
import { nlHomeCopy } from "@/lib/i18n/home/nl";
import { daHomeCopy } from "@/lib/i18n/home/da";
import { svHomeCopy } from "@/lib/i18n/home/sv";
import { ptBrHomeCopy } from "@/lib/i18n/home/pt-br";
import { zhCnHomeCopy } from "@/lib/i18n/home/zh-cn";
import { languageOptions, locales, type HomeCopy, type Locale, type SupportedLanguageCode } from "@/lib/i18n/types";

export const homeCopies = {
  en: enHomeCopy,
  de: deHomeCopy,
  es: esHomeCopy,
  fr: frHomeCopy,
  nl: nlHomeCopy,
  da: daHomeCopy,
  sv: svHomeCopy,
  "pt-br": ptBrHomeCopy,
  "zh-cn": zhCnHomeCopy,
} satisfies Record<SupportedLanguageCode, HomeCopy>;

export { enHomeCopy, languageOptions, locales };
export type { HomeCopy, Locale, SupportedLanguageCode };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getHomeCopy(locale: SupportedLanguageCode = "en") {
  return homeCopies[locale];
}

export function getLocalePath(locale: SupportedLanguageCode) {
  return locale === "en" ? "/" : `/${locale}`;
}

export function getLanguageAlternates() {
  return Object.fromEntries(
    languageOptions.map((language) => [language.htmlLang, absoluteUrl(language.href)])
  );
}
