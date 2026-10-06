/* =========================================================
   Product filtering (home page "Best Sellers" + empty state)

   Same predicate as before. The shop page has its own richer
   filters in lib/shopFilters.ts.
   ========================================================= */

import { products } from '../data/products';
import type { Product } from '../types/product';

export type FilteredProduct = Product & { id: number };

/** Products with their stable array-position id attached. */
export function withIds(): FilteredProduct[] {
  return products.map((product, id) => ({ ...product, id }));
}

/**
 * Search matches every language, not just the active one: a
 * Telugu visitor may still type "laddu", and vice versa.
 */
export function matchesQuery(product: Product, query: string) {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return true;
  return Object.values(product.name).some((name) =>
    name.toLocaleLowerCase().includes(q)
  );
}

export function filterProducts({
  all,
  category,
  query,
  savedOnly,
  saved,
}: {
  all: boolean;
  category: string;
  query: string;
  savedOnly: boolean;
  saved: number[];
}): FilteredProduct[] {
  return withIds().filter(
    (product) =>
      (all || product.id < 5) &&
      (category === 'All' || product.category === category) &&
      matchesQuery(product, query) &&
      (!savedOnly || saved.includes(product.id))
  );
}
