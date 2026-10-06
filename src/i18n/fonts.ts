/* =========================================================
   Telugu web fonts (Noto Sans/Serif Telugu, SIL OFL - see
   public/fonts/NOTO-TELUGU-OFL.txt)

   The brand fonts (DM Sans, DM Serif Display, Caveat) have
   no Telugu glyphs. Instead of editing every font-family in
   globals.css, we register Noto Telugu UNDER THE BRAND
   FAMILY NAMES with a Telugu-only unicode-range. The browser
   then uses Noto for Telugu characters and the brand font for
   everything else, automatically, in both languages.

   unicode-range also means these files are only downloaded
   when Telugu text is actually on screen - English visitors
   pay nothing.

   These rules must come AFTER the brand @font-face rules:
   for overlapping faces the last declared wins per character.
   ========================================================= */

const TELUGU_RANGE = 'U+0951-0952,U+0964-0965,U+0C00-0C7F,U+1CDA,U+1CF2,U+200C-200D,U+25CC';

const FACES: [family: string, weight: number, file: string][] = [
  ['DM Sans', 400, 'te-sans-400.woff2'],
  ['DM Sans', 600, 'te-sans-600.woff2'],
  ['DM Serif Display', 400, 'te-serif-400.woff2'],
  ['Caveat', 500, 'te-sans-500.woff2'],
];

/** @font-face CSS; `base` is the deploy base path ending in "/". */
export function teluguFontFaces(base: string) {
  return FACES.map(
    ([family, weight, file]) =>
      `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(${base}fonts/${file}) format('woff2');unicode-range:${TELUGU_RANGE}}`
  ).join('\n');
}
