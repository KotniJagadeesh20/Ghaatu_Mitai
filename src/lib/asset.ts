/* =========================================================
   Asset URL helper

   Extracted from app/storefront.tsx (Phase 3, extraction #2).
   Implementation and behavior unchanged. BASE_PATH is moved
   alongside asset() since it was only ever used internally by
   asset() in the original file (verified: no other reference).
   ========================================================= */

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
