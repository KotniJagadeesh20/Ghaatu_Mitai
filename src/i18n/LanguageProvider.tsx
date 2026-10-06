'use client';

/* =========================================================
   Language provider

   Why client-side and not /te/... routes: the site is a
   static export (next.config output: 'export', GitHub Pages)
   and also ships a Vite entry, so there is no server or
   middleware to negotiate a locale per request. A provider
   works the same in both entries with zero routing changes.

   Hydration: the prerendered HTML is English. We start every
   render in DEFAULT_LOCALE and only switch after mount, so
   server and client markup match (same pattern ShopPage uses
   for ?category=). Trade-off: a returning Telugu visitor sees
   English for one frame on a hard reload.

   Resolution order on first load:
     1. the visitor's saved choice (localStorage)
     2. the browser language (te-IN -> Telugu)
     3. DEFAULT_LOCALE
   ========================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
  type Localized,
} from './config';
import { MESSAGES, type Messages } from './messages';

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI dictionary for the active language. */
  t: Messages;
  /** Pick the active language from a `Localized` content field. */
  tx: (value: Localized) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    // Private mode / storage disabled: fall through, never crash.
    return null;
  }
}

function detectBrowserLocale(): Locale | null {
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return null;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  /**
   * Fix the language instead of detecting it - for tests, and
   * for locale-prefixed routes (/te/...) if those are added
   * later. When set, stored/browser preferences are ignored.
   */
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);

  useEffect(() => {
    if (initialLocale) return;
    const initial = readStoredLocale() ?? detectBrowserLocale();
    // One-off sync from browser storage after hydration; see header.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial) setLocaleState(initial);

    // Keep other open tabs in step when the visitor switches.
    const onStorage = (event: StorageEvent) => {
      if (event.key === LOCALE_STORAGE_KEY && isLocale(event.newValue)) {
        setLocaleState(event.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [initialLocale]);

  // <html lang> drives screen-reader pronunciation, browser
  // translation prompts, hyphenation and our :lang(te) CSS.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = MESSAGES[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Choice still applies for this visit.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: MESSAGES[locale],
      tx: (field) => field[locale],
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used inside <LanguageProvider>');
  }
  return value;
}
