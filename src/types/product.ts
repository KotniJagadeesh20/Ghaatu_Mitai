/* =========================================================
   Product types

   Single source of truth for the catalogue shape. Everything
   the shop page filters, sorts or displays lives on the
   product itself, so no component needs hard-coded
   `product.id < 5` / `[0, 2].includes(id)` style checks.
   ========================================================= */

import type { ArtBox } from './content';
import type { Category } from '../data/cats';
import type { Localized } from '../i18n/config';

export type PackSize = '100g' | '250g' | '500g' | '1kg';

export type ProductBadge = 'Best Seller' | 'New';

export interface Product {
  /** English name is canonical: used in WhatsApp orders to the business. */
  name: Localized;
  category: Category;
  /** Price of a 250g pack. Other packs scale via multiplier() in lib/pricing. */
  price: number;
  desc: Localized;
  /** Sprite the photo is cropped from (see data/dims.ts). */
  source: string;
  box: ArtBox;
  /** Pack sizes on sale, smallest first. The first one is the default. */
  sizes: readonly PackSize[];
  rating: number;
  reviews: number;
  badge?: ProductBadge;
  /** Lower comes first when sorting by "Featured". */
  featured: number;
  inStock: boolean;
  noPreservatives: boolean;
  vegetarian: boolean;
}
