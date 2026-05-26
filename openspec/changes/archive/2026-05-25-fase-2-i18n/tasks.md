# Tasks: Multi-Language Internationalization (i18n)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 550–650 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: Foundation → PR 2: Integration → PR 3: Content |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Config + i18n infra + route | PR 1 → main | Base for everything. Verifiable: `astro build` → 4 HTML files. |
| 2 | Layout SEO + LanguageSwitcher + nav | PR 2 → main | Builds on PR 1. Verifiable: hreflang, canonical, keyboard nav. |
| 3 | Remaining locales + section translations + data cleanup | PR 3 → main | Builds on PR 2. Verifiable: zero hardcoded strings, sitemap. |

## Phase 1: Foundation (PR 1)

- [x] 1.1 Add `i18n` block to `astro.config.mjs`: en/es/fr/de, `prefixDefaultLocale: false`, `routing: "prefix"` + wire into `@astrojs/sitemap` `i18n` config
- [x] 1.2 Create `src/i18n/ui.ts` with `locales`, `Locale` type, `useTranslations(locale)` typed accessor via `import type { JSONSchema }` pattern
- [x] 1.3 Create `src/i18n/locales/en.json` with all 10 namespaces (`nav`, `hero`, `howWeWork`, `product`, `origin`, `certifications`, `export`, `socialProof`, `contact`, `footer`, `meta`)
- [x] 1.4 Create `src/pages/[...locale].astro` with `getStaticPaths` returning 3 non-default entries (es/fr/de); `src/pages/index.astro` handles English
- [x] 1.5 ~~Delete `src/pages/index.astro`~~ Updated to keep `index.astro` for English root; `[...locale].astro` serves es/fr/de subdirectories
- [x] 1.6 Verify: `astro build` → `dist/index.html`, `dist/es/index.html`, `dist/fr/index.html`, `dist/de/index.html`

## Phase 2: Integration (PR 2)

- [x] 2.1 Modify `src/layouts/BaseLayout.astro` — accept `locale: Locale` + `t: Translations` props; emit `<html lang={locale}>`, hreflang via `getAbsoluteLocaleUrlList()`, canonical via `getAbsoluteLocaleUrl()`, per-locale `<title>` + `<meta>`, `inLanguage` on JSON-LD
- [x] 2.2 Create `src/components/LanguageSwitcher.astro` — native names, `aria-current="page"`, `aria-label` per locale, `getRelativeLocaleUrl()` for hrefs, no flags
- [x] 2.3 Modify `src/components/Header.astro` — import LanguageSwitcher, translate `navLinks` labels via `t['nav'].*`
- [x] 2.4 Modify `src/components/Footer.astro` — translate headings, labels, bottom-bar text via `t['footer'].*`
- [x] 2.5 Modify `src/components/shared/SkipLink.astro` — accept `t` prop, use `t['nav'].skipToContent`

## Phase 3: Content Migration (PR 3)

- [x] 3.1 Create `src/i18n/locales/es.json`, `fr.json`, `de.json` — all keys matching `en.json` schema, translated content per locale
- [x] 3.2 Modify `HeroSection.astro`, `HowWeWorkSection.astro`, `ProductSection.astro`, `OriginSection.astro` — accept `{ locale, t }` props, replace all hardcoded strings with `t('sectionName.*')`
- [x] 3.3 Modify `CertificationsSection.astro`, `ExportSection.astro`, `SocialProofSection.astro`, `ContactSection.astro` — same pattern as 3.2
- [x] 3.4 Modify `src/data/site.ts` — remove translatable strings (tagline, description); keep structural fields only

## Phase 4: Verification (manual)

- [ ] 4.1 `astro build` + `npx tsc --noEmit` — verify type safety, 4 HTML outputs, no missing translation keys
- [ ] 4.2 View-source each locale: confirm `<html lang>`, 5 hreflang links, canonical URL, JSON-LD `inLanguage`
- [ ] 4.3 Check LanguageSwitcher: active locale highlighted, `aria-current`, keyboard tab-through works, all links point to correct locale paths
- [ ] 4.4 Grep `src/` for remaining hardcoded English strings — zero tolerance
- [ ] 4.5 Inspect `sitemap-index.xml` for all 4 locale variants per page
