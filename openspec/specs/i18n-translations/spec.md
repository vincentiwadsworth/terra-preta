# i18n Translations Specification

## Purpose

Type-safe translation system via JSON locale files organized by namespace, zero deps.

## Requirements

### Requirement: Namespaced JSON Locale Files

One JSON file per locale with namespaces: `nav`, `hero`, `origin`, `certifications`, `product`, `export`, `socialProof`, `contact`, `footer`, `meta`. Every key MUST exist across all 4 locales.

#### Scenario: Missing key fails build
- GIVEN a key in `en.json` but not `es.json`
- WHEN TypeScript compiles
- THEN compilation MUST fail

### Requirement: Type-Safe Accessor

`useTranslations(locale)` MUST return a deeply typed object from `as const` data. Invalid keys SHALL be compile-time errors.

#### Scenario: Valid key returns string
- GIVEN `useTranslations("es")`
- WHEN accessing `t("nav.products")`
- THEN the value SHALL be the Spanish translation

#### Scenario: Invalid key
- GIVEN `useTranslations("fr")`
- WHEN accessing a missing key
- THEN TypeScript MUST reject the expression

### Requirement: String-Only Values

All translation values SHALL be strings. Nested objects or markup MUST NOT appear in translations.
