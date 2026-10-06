/* =========================================================
   Locale configuration

   Single source of truth for the supported languages. Adding
   a language = add it here, then TypeScript points at every
   dictionary and every `Localized` content field that is now
   missing a translation (they are all required, not optional).
   ========================================================= */

export const LOCALES = ['en', 'te'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Each language's name written in its own script (what users scan for). */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  te: 'తెలుగు',
};

/** Short label for the compact header switch. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  te: 'తె',
};

/** localStorage key for the visitor's explicit choice. */
export const LOCALE_STORAGE_KEY = 'gm.locale';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * A piece of content written in every supported language.
 * Used for data-file content (product names, occasions...),
 * where keeping both languages next to the item is easier to
 * maintain than a separate key -> text lookup.
 */
export type Localized = Readonly<Record<Locale, string>>;
