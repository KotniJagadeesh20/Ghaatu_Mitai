/* =========================================================
   Site header

   Extracted from app/storefront.tsx (Phase 3, extraction #10).
   Logo link, desktop nav (incl. the active-class expression),
   header-actions buttons/links, class names, aria-labels and
   DOM order are unchanged. Presentational only - all state
   stays owned by Storefront. Renames only:
   - setSearch(true)          -> onOpenSearch()
   - setSavedOnly(!savedOnly) -> onToggleSavedOnly()
   - setCartOpen(true)        -> onOpenCart()
   - setMenu(true)            -> onOpenMenu()
   The arrow-function call sites are kept as-is (not collapsed
   to `onClick={onOpenSearch}`) so no event object is ever
   passed to the callbacks, exactly as before.

   `savedCount` and `savedOnly` are part of the agreed API but
   the current header markup does not render either (the Heart
   link has no count/active state today). They are
   intentionally not destructured so no unused-var warning is
   introduced (same pattern as EnquiryDialog).
   ========================================================= */

import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu } from 'lucide-react';

import { nav } from '../data/nav';
import { useI18n } from '../i18n';
import { Art } from './Art';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface HeaderProps {
  page: string;

  count: number;
  savedCount: number;
  savedOnly: boolean;

  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onToggleSavedOnly: () => void;
}

export function Header({
  page,
  count,
  onOpenSearch,
  onOpenCart,
  onOpenMenu,
  onToggleSavedOnly,
}: HeaderProps) {
  const { t } = useI18n();

  return (
    <header>
      <Link
        className="logo"
        href="/"
        aria-label={t.header.homeLink}
      >
        <Art
          source="home"
          box={[66, 56, 139, 112]}
          alt={t.header.logoAlt}
        />
      </Link>

      <nav>
        {nav.map(({ key, href }) => (
          <Link
            key={href}
            className={
              (page === 'home' ? '/' : '/' + page) === href ? 'active' : ''
            }
            href={href}
          >
            {t.nav[key]}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher className="header-lang" />

        <button
          aria-label={t.header.search}
          onClick={() =>
            onOpenSearch()
          }
        >
          <Search />
        </button>

        <Link
          href="/shop?saved=true"
          aria-label={t.header.favourites}
          onClick={(event) => {
            if (page === 'shop') {
              event.preventDefault();
              onToggleSavedOnly();
            }
          }}
        >
          <Heart />
        </Link>

        <button
          className="bag"
          aria-label={t.header.openBag(count)}
          onClick={() =>
            onOpenCart()
          }
        >
          <ShoppingBag />
          <span>{count}</span>
        </button>

        <button
          className="mobile-menu"
          aria-label={t.header.openNav}
          onClick={() =>
            onOpenMenu()
          }
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
