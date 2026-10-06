/* =========================================================
   Product categories

   These English values are canonical KEYS, not display text:
   they appear in URLs (/shop?category=Gift%20Boxes), product
   data and filters. Never translate them in place - display
   labels come from the i18n dictionary (t.categories[cat]).
   ========================================================= */

export const cats = [
  'Sweets',
  'Savouries',
  'Mixtures',
  'Chips',
  'Combos',
  'Gift Boxes',
] as const;

export type Category = (typeof cats)[number];

export function isCategory(value: unknown): value is Category {
  return typeof value === 'string' && (cats as readonly string[]).includes(value);
}
