# Design: Multi-Language Internationalization (i18n)

## Technical Approach

Astro native i18n with zero external deps. Subdirectory routing via `getStaticPaths` in a catch-all `[...locale].astro`. JSON locale files imported with `as const` + typed aggregator. Components receive `{ locale, t }` via props threading. SEO via `getAbsoluteLocaleUrlList` hreflang, per-locale canonical, translated JSON-LD, and `@astrojs/sitemap` i18n config.

## Architecture Decisions

### Decision: Catch-all page vs individual locale pages

| Option | Tradeoff |
|--------|----------|
| `[...locale].astro` + `getStaticPaths` | DRY; 1 template for 4 outputs; easy to add locales |
| Individual `es/index.astro`, `fr/`... | Explicit per-locale; duplicates layout and imports |

**Choice**: `[...locale].astro`. One file → 4 static pages. Aligns with Astro's `i18n.routing` intent. Adding a 5th locale is one line in the locale list + one JSON file.

### Decision: JSON locale files vs `.ts` files

| Option | Tradeoff |
|--------|----------|
| JSON (`.json`) | Standard, human-editable, translator-ready |
| TypeScript (`.ts`) | Direct `as const` inference, no JSON parse |

**Choice**: JSON. `import en from "./locales/en.json" with { type: "json" }` plus `as const` and a typed aggregator in `ui.ts` gives the same compile-time safety. JSON is the translator convention.

### Decision: Props threading vs global/singleton

| Option | Tradeoff |
|--------|----------|
| `{ locale, t }` passed to every component | Explicit data flow, testable, no side effects |
| `Astro.locale` + ambient `t()` | Implicit, magic imports, harder to test |

**Choice**: Props threading. `getStaticPaths` → `[...locale].astro` → `BaseLayout` → children. No ambient imports. Each `.astro` file declares what it needs.

### Decision: Data files stay structural, translations provide text

| Option | Tradeoff |
|--------|----------|
| Data files keep IDs/URLs/numbers; text in JSON | Clean separation; products.ts has zero locale awareness |
| Per-locale data files | Duplication across 4 copies; field drift guaranteed |

**Choice**: Data files (`products.ts`, `certifications.ts`, `site.ts`) retain structural data only. Translatable text lives in JSON under `product.*`, `cert.*`, `meta.*` namespaces. Components pick text from translations, not data imports.

### Decision: Sitemap: built-in i18n config vs custom

| Option | Tradeoff |
|--------|----------|
| `sitemap({ i18n: { locales, defaultLocale } })` | One-liner, auto-generates locale alternates |
| Custom `sitemap.xml` | Full control, more maintenance |

**Choice**: Built-in. Hooks into the existing `@astrojs/sitemap` integration with no new code.

## Data Flow

```
                    getStaticPaths()
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
       {locale:"en"} {locale:"es"} ... {locale:"de"}
              │
              ▼
    [...locale].astro
              │
    useTranslations(locale) ──► src/i18n/locales/{lc}.json
              │
              ▼
    BaseLayout({ locale, t })
     ├─ <html lang={locale}>
     ├─ <link rel="alternate" hreflang="...">  ← getAbsoluteLocaleUrlList()
     ├─ <link rel="canonical">                 ← getAbsoluteLocaleUrl()
     ├─ <title>{t('meta.title')}
     ├─ JSON-LD { inLanguage: locale }
     │
     ├─ Header({ locale, t })
     │    └─ LanguageSwitcher({ currentLocale })
     │
     └─ Sections({ locale, t })
          strings via t('hero.title'), t('product.description'), etc.
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/i18n/locales/en.json` | Create | English translations, namespaced by section |
| `src/i18n/locales/es.json` | Create | Spanish translations |
| `src/i18n/locales/fr.json` | Create | French translations |
| `src/i18n/locales/de.json` | Create | German translations |
| `src/i18n/ui.ts` | Create | `useTranslations(locale)`, `locales` array, `Locale` type |
| `src/pages/[...locale].astro` | Create | Catch-all route with `getStaticPaths` (4 entries) |
| `src/components/LanguageSwitcher.astro` | Create | Locale picker: native names, `aria-current`, `getRelativeLocaleUrl()` |
| `astro.config.mjs` | Modify | Add `i18n` block, update sitemap with `i18n` config |
| `src/layouts/BaseLayout.astro` | Modify | Add `locale: Locale` to Props; hreflang via `getAbsoluteLocaleUrlList()`; per-locale `<title>`, `<meta>`, JSON-LD |
| `src/components/Header.astro` | Modify | Import LanguageSwitcher; translate `navLinks` labels via `t()` |
| `src/components/Footer.astro` | Modify | Translate headings, labels, bottom-bar text via `t()` |
| `src/components/shared/SkipLink.astro` | Modify | Translate "Skip to content" via prop |
| `src/components/sections/HeroSection.astro` | Modify | Replace strings with `t()` calls |
| `src/components/sections/HowWeWorkSection.astro` | Modify | Translate step titles, descriptions |
| `src/components/sections/ProductSection.astro` | Modify | Translate headings, description, characteristics |
| `src/components/sections/OriginSection.astro` | Modify | Translate narrative text, stats labels |
| `src/components/sections/CertificationsSection.astro` | Modify | Translate badge text, authority, labels |
| `src/components/sections/ExportSection.astro` | Modify | Translate column headings, body text |
| `src/components/sections/SocialProofSection.astro` | Modify | Translate heading, fallback text |
| `src/components/sections/ContactSection.astro` | Modify | Translate heading, labels, response text |
| `src/components/shared/SectionHeading.astro` | Modify | No structural changes; content comes from t() in parent |
| `src/data/site.ts` | Modify | Remove `tagline`, `description` from export (now in translations) |
| `src/data/products.ts` | Modify | Remove `description`, `subtitle` from export (now in translations) |
| `src/data/certifications.ts` | Modify | Remove `badgeText`, `authority` strings from export (now in translations) |
| `src/pages/index.astro` | Delete | Replaced by `[...locale].astro` |

## Interfaces / Contracts

```typescript
// src/i18n/ui.ts
export const locales = ["en", "es", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Aggregates JSON locale data into type-safe accessor
export function useTranslations(locale: Locale): Translations {
  const file = /* dynamic import of src/i18n/locales/{locale}.json */;
  return new Proxy(file, ...); // or direct typed return
}
```

```typescript
// Translation namespaces (enforced by en.json structure):
type Translations = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  howWeWork: Record<string, string>;
  product: Record<string, string>;
  origin: Record<string, string>;
  certifications: Record<string, string>;
  export: Record<string, string>;
  socialProof: Record<string, string>;
  contact: Record<string, string>;
  footer: Record<string, string>;
  meta: Record<string, string>;
};

// Component props pattern:
interface Props {
  locale: Locale;
  t: Translations;
}
```

## GitHub Pages

All routes are SSG output — no runtime URL rewriting needed. `astro build` produces `dist/index.html`, `dist/es/index.html`, `dist/fr/index.html`, `dist/de/index.html`. GitHub Pages serves them directly. The existing `<base href>` in `BaseLayout` and `getRelativeLocaleUrl()` in the switcher are base-path-aware — they handle both root deployment (`terrapreta.lat`) and subpath (`terrapreta.lat/terra-preta`) identically.

## Testing Strategy

No automated test runner. Manual verification:

| Check | Method |
|-------|--------|
| Build output | `astro build` → verify 4 `index.html` at correct paths |
| Type safety | `npx tsc --noEmit` catches missing keys across locales |
| HTML structure | View-source each locale: `<html lang>`, hreflang (5 links), canonical, JSON-LD `inLanguage` |
| Switcher | Visual: active locale highlighted, `aria-current="page"`, correct `href` |
| Strings | Grep source for hardcoded English after migration |
| Sitemap | Inspect `sitemap-index.xml` for 4 locale variants |

## Migration / Rollout

No migration required — greenfield i18n addition on a single-page site. Rollback: remove `i18n` from `astro.config.mjs`, restore `src/pages/index.astro`, delete `src/i18n/` and `LanguageSwitcher.astro`.

## Open Questions

- Translation quality: AI-generated first draft vs human review for non-English content?
- 404 page: should it be locale-aware or stay English-only?
