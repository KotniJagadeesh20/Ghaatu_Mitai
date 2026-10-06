/* =========================================================
   Artwork / Sprite dimensions

   Extracted from app/storefront.tsx (Phase 3, extraction #1).
   Values unchanged - see the Art component in app/storefront.tsx
   for how these are used.
   ========================================================= */

export const dims: Record<string, number[]> = {
  home: [1024, 1536],
  shop: [1312, 1199],
  story: [1536, 1024],
  business: [1024, 1536],
  community: [1024, 1536],
  // Shop page reference art: hero, category icons and the
  // three products not present in shop.png.
  'shop-page': [1024, 1536],
  // Bulk Orders page reference art: hero, product tiles,
  // occasion icons, gift banner and review avatars.
  'bulk-page': [1024, 1536],
  // Wholesale page reference art.
  'wholesale-page': [1024, 1536],
};
