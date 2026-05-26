import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

export const locales = ["en", "es", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Type-safe translations derived from en.json structure */
export type Translations = typeof en;

const localeData: Record<string, Translations> = { en, es, fr, de };

/**
 * Returns typed translations for the given locale.
 * Falls back to English if the locale is not found.
 */
export function useTranslations(locale: string): Translations {
  return localeData[locale] ?? en;
}
