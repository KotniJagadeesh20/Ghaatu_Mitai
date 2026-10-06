/* =========================================================
   Pricing helpers

   One place for pack-size maths. Before this, the 250g/500g/
   1kg multiplier lived inline in storefront.tsx and every
   consumer re-derived prices by hand.
   ========================================================= */

import type { Product } from '../types/product';

export function multiplier(size: string) {
  return size === '1kg' ? 4 : size === '500g' ? 2 : size === '100g' ? 0.4 : 1;
}

export function packPrice(product: Product, size: string) {
  return Math.round(product.price * multiplier(size));
}

export function defaultSize(product: Product) {
  return product.sizes[0];
}

/** Cheapest pack - what "Price Range" filters and "Price" sorts use. */
export function startingPrice(product: Product) {
  return packPrice(product, defaultSize(product));
}
