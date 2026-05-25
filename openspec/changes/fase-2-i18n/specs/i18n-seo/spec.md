# i18n SEO Specification

## Purpose

Per-locale SEO: hreflang, canonical URLs, translated metadata, JSON-LD, multilingual sitemap.

## Requirements

### Requirement: Hreflang

Every page MUST include reciprocal hreflang for all 4 locales plus `x-default`.

#### Scenario: 5 links on Spanish page
- GIVEN Spanish page renders
- THEN `<head>` MUST contain `hreflang="en"`, `"es"`, `"fr"`, `"de"`, `"x-default"`
- AND each `href` MUST point to the correct locale URL

### Requirement: Per-Locale Canonical

Each page SHALL set a canonical URL matching its own locale.

#### Scenario: French canonical
- GIVEN French page
- THEN `<link rel="canonical">` MUST end with `/terra-preta/fr/`

### Requirement: JSON-LD inLanguage

Structured data SHALL include `inLanguage` matching the page locale.

#### Scenario: German JSON-LD
- GIVEN German page renders
- THEN `inLanguage` MUST be `"de"`
- AND `description` MUST be the German translation

### Requirement: Multilingual Sitemap

Sitemap SHALL include all 4 locale variants per page.

#### Scenario: Sitemap coverage
- GIVEN build produces a sitemap
- THEN en, es, fr, de MUST exist for every page

### Requirement: Translated Metadata

`<title>` and `<meta name="description">` SHALL use the current locale's `meta` translation.
