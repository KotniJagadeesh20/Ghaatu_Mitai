/* =========================================================
   Content types (Phase 15.0a)

   Shapes for the static content moved out of component JSX.
   Type-only - no runtime code.

   `ArtBox` is the [x, y, width, height] crop that <Art> already
   accepts (`box: readonly number[]`). Product references stay
   numeric array positions for now (`productIndex`); 15.0b
   replaces them with stable slugs.
   ========================================================= */

import type { Localized } from '../i18n/config';

export type ArtBox = readonly [number, number, number, number];

export interface Occasion {
  title: Localized;
  href: string;
  description: Localized;
  /** The photo. Its bottom edge cuts through the icon's centre. */
  box: ArtBox;
  /** The full round icon (incl. white ring), from the same sprite. */
  icon: ArtBox;
}

export interface CommunityImage {
  box: ArtBox;
  alt: Localized;
}
