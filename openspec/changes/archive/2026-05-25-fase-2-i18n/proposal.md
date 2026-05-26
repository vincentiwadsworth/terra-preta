# Proposal: Multi-Language Internationalization (i18n)

## Intent

Terra Preta's landing page is English-only. We need subdirectory i18n (`/es/`, `/fr/`, `/de/`) with Astro native routing, type-safe translations, and full SEO support.

## Scope

### In Scope
- Astro `i18n` config: subdirectory routing, `prefixDefaultLocale: false`
- JSON locale files (`src/i18n/locales/`) with type-safe `as const` accessor
- Routes: `/` (en), `/es/`, `/fr/`, `/de/` via `getStaticPaths`
- Language switcher in header (native names)
- hreflang, per-locale canonical, translated metadata, `inLanguage` on JSON-LD
- Multilingual sitemap
- Translate all hardcoded UI strings
- Base path `/terra-preta` preserved

### Out of Scope
RTL, runtime locale switching, PDF translation, third-party i18n libs, MT translation

## Capabilities

### New Capabilities
- `i18n-routing`: Subdirectory routing with `getStaticPaths`
- `i18n-translations`: JSON locale files with type-safe accessors
- `i18n-seo`: hreflang, canonical, metadata, structured data per locale
- `i18n-language-switcher`: Locale selection UI with native names

### Modified Capabilities
- None

## Approach

1. **Config**: Add `i18n` block to `astro.config.mjs` (en/es/fr/de, no prefix)
2. **Translations**: `src/i18n/locales/*.json` + type-safe `ui.ts` — zero deps
3. **Routing**: `index.astro` → `[...locale].astro` with `getStaticPaths` (4 entries)
4. **Layout**: `BaseLayout.astro` gets locale prop, sets `<html lang>`, hreflang, canonical, JSON-LD
5. **Components**: Hardcoded strings → `t('key')`. Data files gain locale exports
6. **Switcher**: `LanguageSwitcher.astro` using `getRelativeLocaleUrl()`
7. **Sitemap**: Add `i18n` config to existing `@astrojs/sitemap`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modified | Add `i18n` config, update sitemap |
| `src/pages/[...locale].astro` | New | Catch-all route replacing `index.astro` |
| `src/layouts/BaseLayout.astro` | Modified | Locale prop, hreflang, per-locale metadata |
| `src/components/Header.astro` | Modified | Add LanguageSwitcher |
| `src/components/LanguageSwitcher.astro` | New | Locale selection UI |
| `src/i18n/` | New | Locale JSON files + type-safe accessor |
| `src/data/*.ts` | Modified | Locale-aware exports |
| `src/components/sections/*.astro` (7) | Modified | Replace strings with `t()` calls |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| GitHub Pages 404 on locale paths | Medium | SSG generates all 4 static HTML files |
| Translation key drift | Medium | TypeScript `keyof typeof` catches at build |
| Base path breaks locale URLs | Low | `getRelativeLocaleUrl()` is base-path-aware |

## Rollback

Revert `astro.config.mjs` i18n block, restore `index.astro`, delete `src/i18n/` and `LanguageSwitcher.astro`.

## Dependencies

Astro 6, `@astrojs/sitemap` (both installed). No new packages.

## Success Criteria

- [ ] Build produces `index.html`, `es/index.html`, `fr/index.html`, `de/index.html`
- [ ] Each page: correct `<html lang>`, canonical, 3 hreflang alternates
- [ ] Switcher renders on all 4 pages with correct active state
- [ ] Zero hardcoded English strings in rendered output
- [ ] Sitemap includes all 4 locale variants
- [ ] All routes accessible on GitHub Pages
