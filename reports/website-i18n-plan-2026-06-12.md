# RegardsKim Website I18n Plan - 2026-06-12

## Scope
- Add a compact English homepage section about multilingual support after ProofBand.
- Localize the homepage into `de`, `es`, `fr`, `nl`, `da`, `sv`, `pt-br`, and `zh-cn`.
- Keep the product name as `Regards Kim` or `RegardsKim`; allow `Kind regards, Kim`-style signatures only.

## Architecture
- Dependency-free copy dictionaries under `src/lib/i18n/`.
- Homepage sections accept typed copy props with English defaults so existing pages keep working.
- Localized route lives at `src/app/(marketing)/[locale]/page.tsx` with static params and `dynamicParams = false`.
- Navbar/Footer get a small language switcher and localized homepage labels where used.
- Homepage FAQ content moves into the dictionary for localized homepages while `src/lib/faq-data.ts` remains available elsewhere.

## Progress
- [x] Repository and homepage structure inspected.
- [x] English dictionary and shared i18n types created.
- [x] New multilingual support section added to English homepage.
- [x] Homepage sections refactored to consume copy props with English defaults.
- [x] Eight translated dictionaries added and type-checked.
- [x] Localized route, metadata, hreflang, structured data, and sitemap added.
- [x] Verification gate completed: lint, build, server/curl checks, source checks, sitemap, naming grep.
- [ ] Local commit created.

## Notes / Decisions
- Root layout currently sets `<html lang="en">`; localized pages still inherit this. Changing it per locale would require a broader layout restructure around route groups, so this remains a known limitation rather than a brittle hack.
- Middleware matcher is currently `/` plus app routes only, so locale marketing paths pass through untouched.

## Verification Evidence
- `npm run lint` passed.
- `npm run build` passed; Next statically generated `/de`, `/es`, `/fr`, `/nl`, `/da`, `/sv`, `/pt-br`, and `/zh-cn` under `● /[locale]`.
- `npm start -- -p 3016` served the production build locally.
- Runtime checks:
  - `/` contains the new `Multilingual support` / `Reply in your customer's language` section.
  - `/de` renders German hero, language section, FAQ schema, and translated metadata/hreflang.
  - `/zh-cn` renders Simplified Chinese hero, language section, FAQ schema, and translated metadata/hreflang.
  - `/about`, `/pricing`, and `/demo` return `200`; `/xx` returns `404`.
  - `/de` source includes canonical `https://regardskim.com/de` and hreflang alternates for all 9 languages plus `x-default`.
  - `/sitemap.xml` includes all 8 locale URLs.
- Naming grep across changed and new repo files only found allowed signature cases such as `Kind regards, Kim`, localized equivalents, and the comparison reply sign-off name.
- Shopify grep across changed and new repo files confirms Shopify mentions remain present.
