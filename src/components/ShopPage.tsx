/* =========================================================
   Shop page

   State ownership:
   - Storefront (shared across pages): cart, saved, search
     query, "favourites only" toggle.
   - ShopPage (page-local): filters, sort, page. These only
     matter here, so lifting them would just add props.

   Filtering/sorting/paging are pure functions in
   lib/shopFilters.ts; this component only wires them to UI.
   ========================================================= */

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, SlidersHorizontal, X } from 'lucide-react';

import { cats, isCategory, type Category } from '../data/cats';
import { matchesQuery, withIds, type FilteredProduct } from '../lib/filterProducts';
import { useI18n } from '../i18n';
import {
  EMPTY_FILTERS,
  SORT_KEYS,
  WEIGHTS,
  activeFilterCount,
  countBy,
  matchesFilters,
  paginate,
  sortProducts,
  type ShopFilters,
  type SortKey,
} from '../lib/shopFilters';
import type { ArtBox } from '../types/content';

import { Art } from './Art';
import { ShopFilterSidebar } from './ShopFilterSidebar';
import { ShopPagination } from './ShopPagination';

/* Category icons cropped from the shop-page reference sprite. */
const CATEGORY_ICONS: Record<Category, ArtBox> = {
  Sweets: [200, 348, 60, 60],
  Savouries: [335, 348, 60, 60],
  Mixtures: [471, 348, 60, 60],
  Chips: [607, 348, 60, 60],
  Combos: [742, 348, 60, 60],
  'Gift Boxes': [886, 348, 60, 60],
};

// Computed once: the catalogue is static.
const CATALOGUE = withIds();
const FACETS = {
  categories: countBy(CATALOGUE, cats, (p, c) => p.category === c),
  weights: countBy(CATALOGUE, WEIGHTS, (p, w) => p.sizes.includes(w)),
  noPreservatives: CATALOGUE.filter((p) => p.noPreservatives).length,
  vegetarian: CATALOGUE.filter((p) => p.vegetarian).length,
  inStock: CATALOGUE.filter((p) => p.inStock).length,
};

export function ShopPage({
  query,
  savedOnly,
  saved,
  onQueryChange,
  onSavedOnlyChange,
  renderCard,
}: {
  query: string;
  savedOnly: boolean;
  saved: number[];
  onQueryChange: (query: string) => void;
  onSavedOnlyChange: (value: boolean) => void;
  renderCard: (product: FilteredProduct) => React.ReactNode;
}) {
  const [filters, setFilters] = useState<ShopFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>('featured');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  // Deep link from the home page: /shop?category=Sweets.
  // Read in an effect (not in useState) so server and client
  // render the same first markup.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      'category'
    );
    // Validate, don't trust: the URL is user input.
    if (isCategory(requested)) {
      // One-off sync from the URL (an external system) after
      // hydration; a lazy useState initializer would cause an
      // SSR/client markup mismatch in the prerendered build.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters((f) => ({ ...f, categories: [requested] }));
    }
  }, []);

  // Any filter change sends the user back to page 1 -
  // otherwise they can land on an empty page 3.
  const updateFilters = (patch: Partial<ShopFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  const clearAll = () => {
    setFilters(EMPTY_FILTERS);
    onQueryChange('');
    onSavedOnlyChange(false);
    setPage(1);
  };

  const results = useMemo(() => {
    const list = CATALOGUE.filter(
      (p) =>
        matchesFilters(p, filters) &&
        matchesQuery(p, query) &&
        (!savedOnly || saved.includes(p.id))
    );
    return sortProducts(list, sort);
  }, [filters, sort, query, savedOnly, saved]);

  const current = paginate(results, page);
  const activeCount = activeFilterCount(filters);

  const goToPage = (n: number) => {
    setPage(n);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectCategory = (cat: Category | null) =>
    updateFilters({ categories: cat ? [cat] : [] });

  const isOnly = (cat: Category) =>
    filters.categories.length === 1 && filters.categories[0] === cat;

  return (
    <section className="shop-page">
      {/* ---------- Hero ---------- */}
      <div className="shop-banner">
        <div className="shop-banner-art">
          <Art
            source="shop-page"
            box={[562, 145, 462, 185]}
            alt={t.shop.bannerAlt}
          />
        </div>

        <div className="shop-banner-copy">
          <nav className="shop-breadcrumb" aria-label={t.shop.breadcrumb}>
            <Link href="/">{t.shop.home}</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{t.shop.shop}</span>
          </nav>
          <h1>{t.shop.title}</h1>
          <p>{t.shop.sub}</p>
        </div>
      </div>

      {/* ---------- Category shortcuts ---------- */}
      <div className="shop-cats" role="group" aria-label={t.shop.byCategory}>
        <button
          type="button"
          className={'shop-cat' + (!filters.categories.length ? ' active' : '')}
          aria-pressed={!filters.categories.length}
          onClick={() => selectCategory(null)}
        >
          <span className="shop-cat-icon all">
            <LayoutGrid size={30} strokeWidth={1.5} />
          </span>
          {t.shop.allProducts}
        </button>

        {cats.map((cat) => (
          <button
            key={cat}
            type="button"
            className={'shop-cat' + (isOnly(cat) ? ' active' : '')}
            aria-pressed={isOnly(cat)}
            onClick={() => selectCategory(cat)}
          >
            <span className="shop-cat-icon">
              <Art source="shop-page" box={CATEGORY_ICONS[cat]} alt="" />
            </span>
            {t.categories[cat]}
          </button>
        ))}
      </div>

      {/* ---------- Filters + results ---------- */}
      <div className={'shop-layout' + (filtersOpen ? ' filters-open' : '')}>
        <ShopFilterSidebar
          id="shop-filters"
          filters={filters}
          counts={FACETS}
          activeCount={activeCount}
          onChange={updateFilters}
          onClear={clearAll}
        />

        <div className="shop-main" ref={resultsRef}>
          <div className="shop-bar">
            <button
              type="button"
              className="shop-filter-toggle"
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
              onClick={() => setFiltersOpen((o) => !o)}
            >
              <SlidersHorizontal size={16} />
              {t.shop.filters}{activeCount ? ` (${activeCount})` : ''}
            </button>

            <p className="shop-count" aria-live="polite">
              {t.shop.count(results.length)}
            </p>

            <label className="shop-sort">
              <span>{t.shop.sortBy}</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  setPage(1);
                }}
              >
                {SORT_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t.shop.sort[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Search + favourites are set from the header, so show
              them here - hidden filters are a classic "where did
              my products go?" bug. */}
          {(query || savedOnly) && (
            <div className="shop-chips">
              {query && (
                <button type="button" onClick={() => onQueryChange('')}>
                  {t.shop.searchChip(query)} <X size={14} aria-label={t.shop.remove} />
                </button>
              )}
              {savedOnly && (
                <button type="button" onClick={() => onSavedOnlyChange(false)}>
                  {t.shop.favouritesChip} <X size={14} aria-label={t.shop.remove} />
                </button>
              )}
            </div>
          )}

          {current.items.length ? (
            <div className="shop-grid">
              {current.items.map((product) => (
                <Fragment key={product.id}>{renderCard(product)}</Fragment>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>{t.shop.emptyTitle}</h3>
              <p>{t.shop.emptyText}</p>
              <button className="btn" onClick={clearAll}>
                {t.shop.showAll}
              </button>
            </div>
          )}

          <ShopPagination
            page={current.page}
            pageCount={current.pageCount}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </section>
  );
}
