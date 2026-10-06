/* =========================================================
   Cart types

   Moved from app/storefront.tsx (Phase 3, extraction #9.3c).
   Type-only - no runtime code. Shape unchanged. Lives under
   src/ so extracted components (CartSheet, and EnquiryDialog
   in #9.3d) can import it without src/components depending
   back on app/storefront.tsx.
   ========================================================= */

export type CartItem = {
  id: number;
  size: string;
  qty: number;
};
