/* =========================================================
   Navigation links

   Shared by the desktop header nav (Header.tsx), the
   mobile-nav sheet (MobileNavSheet.tsx) and the footer's
   "Quick Links" (Footer.tsx). Labels come from t.nav[key].
   ========================================================= */

export const nav = [
  { key: 'home', href: '/' },
  { key: 'shop', href: '/shop' },
  { key: 'about', href: '/about' },
  { key: 'bulkOrders', href: '/bulk-orders' },
  { key: 'wholesale', href: '/wholesale' },
  { key: 'contact', href: '/contact' },
] as const;

export type NavKey = (typeof nav)[number]['key'];
