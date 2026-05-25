import en from "./locales/en.json";

export const locales = ["en", "es", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Type-safe translations derived from en.json structure */
export type Translations = typeof en;

/**
 * Returns typed translations for the given locale.
 * Falls back to English for locales whose JSON files
 * have not yet been created (es, fr, de come in PR 3).
 */
export function useTranslations(locale: string): Translations {
  // Only en.json exists in PR 1. Fall back to English
  // for es, fr, de until their locale files are created.
  if (locale === "en") return en;
  return en;
}
