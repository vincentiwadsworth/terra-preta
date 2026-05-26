# i18n Routing Specification

## Purpose

Locale-aware URL routing via Astro subdirectory strategy for SSG on GitHub Pages.

## Requirements

### Requirement: Locale-Prefixed Routes

Build MUST generate HTML for all 4 locales (en, es, fr, de). English at root; others at `/{locale}/`. Base path `/terra-preta` MUST be preserved.

#### Scenario: All pages build
- GIVEN production build
- THEN `dist/index.html`, `dist/es/index.html`, `dist/fr/index.html`, `dist/de/index.html` MUST exist

#### Scenario: Unknown locale
- GIVEN an unsupported locale
- WHEN no matching route exists
- THEN the system MUST resolve to English at root

### Requirement: getStaticPaths Completeness

`getStaticPaths` MUST return exactly 4 entries (one per locale). Each entry SHALL set `params.locale` and `props.locale`.

#### Scenario: Default locale unprefixed
- GIVEN `prefixDefaultLocale: false`
- THEN `/terra-preta/` serves English, `/terra-preta/es/` serves Spanish
