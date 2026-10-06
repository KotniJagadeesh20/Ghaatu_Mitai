/* =========================================================
   Language switcher

   A two-option segmented control rather than a dropdown:
   with only two languages, both choices stay visible and
   switching is one tap.

   Accessibility:
   - role="group" + aria-label names the control.
   - aria-pressed exposes which language is active.
   - Each option carries lang={code}, so a screen reader
     pronounces "తెలుగు" with a Telugu voice even while the
     page is in English (and vice versa).
   - Labels are written in their own script: a Telugu reader
     looks for "తెలుగు", not "Telugu".
   ========================================================= */

import { LOCALES, LOCALE_NAMES, LOCALE_SHORT } from '../i18n/config';
import { useI18n } from '../i18n';

export function LanguageSwitcher({
  className = '',
  variant = 'compact',
}: {
  className?: string;
  /** compact: "EN | తె" for the header. full: "English | తెలుగు". */
  variant?: 'compact' | 'full';
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={`lang-switch lang-switch--${variant} ${className}`.trim()}
      role="group"
      aria-label={t.language.label}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            className={active ? 'active' : ''}
            aria-pressed={active}
            // The visible label may be an abbreviation; give the full name.
            aria-label={variant === 'compact' ? LOCALE_NAMES[code] : undefined}
            title={active ? undefined : t.language.switchTo(LOCALE_NAMES[code])}
            onClick={() => setLocale(code)}
          >
            {variant === 'compact' ? LOCALE_SHORT[code] : LOCALE_NAMES[code]}
          </button>
        );
      })}
    </div>
  );
}
