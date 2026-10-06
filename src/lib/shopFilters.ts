/* =========================================================
   Shop filtering, sorting and pagination

   Pure functions only (no React) so they are trivial to unit
   test and reuse - e.g. if filtering later moves server-side,
   these become the API contract.
   ========================================================= */

import type { Category } from '../data/cats';
import type { PackSize } from '../types/product';
import type { FilteredProduct } from './filterProducts';
import { startingPrice } from './pricing';

export const PRICE_MIN = 0;
/** Upper handle at this value means "no upper limit" (₹1,000+). */
export const PRICE_MAX = 1000;
export const PAGE_SIZE = 8;
export const WEIGHTS: PackSize[] = ['100g', '250g', '500g', '1kg'];

/** Labels live in the i18n dictionary (t.shop.sort[key]). */
export const SORT_KEYS = ['featured', 'price-asc', 'price-desc', 'rating', 'reviews'] as const;

export type SortKey = (typeof SORT_KEYS)[number];

export interface ShopFilters {
  categories: Category[];
  price: [number, number];
  weights: PackSize[];
  noPreservatives: boolean;
  vegetarian: boolean;
  inStock: boolean;
}

export const EMPTY_FILTERS: ShopFilters = {
  categories: [],
  price: [PRICE_MIN, PRICE_MAX],
  weights: [],
  noPreservatives: false,
  vegetarian: false,
  inStock: false,
};

/** Number of active filter groups - drives the "Clear all" / mobile badge. */
export function activeFilterCount(f: ShopFilters) {
  return (
    (f.categories.length ? 1 : 0) +
    (f.price[0] > PRICE_MIN || f.price[1] < PRICE_MAX ? 1 : 0) +
    (f.weights.length ? 1 : 0) +
    Number(f.noPreservatives) +
    Number(f.vegetarian) +
    Number(f.inStock)
  );
}

export function matchesFilters(p: FilteredProduct, f: ShopFilters) {
  const price = startingPrice(p);
  const upper = f.price[1] >= PRICE_MAX ? Infinity : f.price[1];

  return (
    (!f.categories.length || f.categories.includes(p.category)) &&
    price >= f.price[0] &&
    price <= upper &&
    (!f.weights.length || f.weights.some((w) => p.sizes.includes(w))) &&
    (!f.noPreservatives || p.noPreservatives) &&
    (!f.vegetarian || p.vegetarian) &&
    (!f.inStock || p.inStock)
  );
}

export function sortProducts(list: FilteredProduct[], sort: SortKey) {
  const sorted = [...list]; // never mutate the caller's array
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => startingPrice(a) - startingPrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => startingPrice(b) - startingPrice(a));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case 'reviews':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted.sort((a, b) => a.featured - b.featured);
  }
}

export function paginate<T>(list: T[], page: number, size = PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(list.length / size));
  const current = Math.min(Math.max(1, page), pageCount);
  return {
    items: list.slice((current - 1) * size, current * size),
    page: current,
    pageCount,
  };
}

/** Facet counts over the whole catalogue (like the design's fixed counts). */
export function countBy<K extends string>(
  list: FilteredProduct[],
  keys: readonly K[],
  test: (p: FilteredProduct, key: K) => boolean
) {
  return Object.fromEntries(
    keys.map((k) => [k, list.filter((p) => test(p, k)).length])
  ) as Record<K, number>;
}
