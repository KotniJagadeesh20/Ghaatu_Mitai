/* =========================================================
   Bulk Orders page content

   Static content kept out of the JSX so copy/image changes
   never touch component code. All `box` crops refer to the
   'bulk-page' sprite (see data/dims.ts).

   Two kinds of text live here:
   - Localized content (labels, names) - shown as-is.
   - Form option KEYS (EVENT_TYPES, QUANTITY_OPTIONS) - the
     English value is what reaches the business on WhatsApp;
     the visible label comes from the i18n dictionary.
   ========================================================= */

import type { Category } from './cats';
import type { Localized } from '../i18n/config';
import type { ArtBox } from '../types/content';

export interface IconItem {
  /** "\n" marks the design's line break. */
  label: Localized;
  icon: ArtBox;
}

export const bulkBenefits: readonly IconItem[] = [
  { label: { en: 'Custom\nQuantities', te: 'మీకు కావాల్సిన\nపరిమాణం' }, icon: [64, 333, 48, 48] },
  { label: { en: 'Bulk\nPricing', te: 'బల్క్\nధరలు' }, icon: [170, 333, 48, 48] },
  { label: { en: 'Custom\nGift Boxes', te: 'ప్రత్యేక\nగిఫ్ట్ బాక్సులు' }, icon: [276, 333, 48, 48] },
  { label: { en: 'Freshly\nPrepared', te: 'తాజాగా\nతయారీ' }, icon: [382, 333, 48, 48] },
];

export const celebrationProducts: readonly {
  name: Localized;
  box: ArtBox;
  /** Where the tile links to in the shop. */
  category: Category;
}[] = [
  { name: { en: 'Boondi Laddu', te: 'బూందీ లడ్డు' }, box: [43, 506, 134, 92], category: 'Sweets' },
  { name: { en: 'Kaju Katli', te: 'కాజు కట్లీ' }, box: [190, 506, 137, 92], category: 'Sweets' },
  { name: { en: 'Ghaatu Mixture', te: 'ఘాటు మిక్చర్' }, box: [340, 506, 140, 92], category: 'Mixtures' },
  { name: { en: 'Jantikalu', te: 'జంతికలు' }, box: [493, 506, 138, 92], category: 'Savouries' },
  { name: { en: 'Arati Chips', te: 'అరటి చిప్స్' }, box: [43, 640, 134, 92], category: 'Chips' },
  { name: { en: 'Ribbon Pakoda', te: 'రిబ్బన్ పకోడి' }, box: [190, 640, 137, 92], category: 'Savouries' },
  { name: { en: 'Assorted Sweet Boxes', te: 'అసార్టెడ్ స్వీట్ బాక్సులు' }, box: [340, 640, 140, 92], category: 'Gift Boxes' },
  { name: { en: 'Custom Gift Hampers', te: 'ప్రత్యేక గిఫ్ట్ హ్యాంపర్లు' }, box: [493, 640, 138, 92], category: 'Gift Boxes' },
];

export const occasions: readonly IconItem[] = [
  { label: { en: 'Weddings', te: 'పెళ్లిళ్లు' }, icon: [63, 832, 48, 48] },
  { label: { en: 'Engagements', te: 'నిశ్చితార్థాలు' }, icon: [163, 832, 48, 48] },
  { label: { en: 'Family Functions', te: 'కుటుంబ వేడుకలు' }, icon: [263, 832, 48, 48] },
  { label: { en: 'Festivals', te: 'పండుగలు' }, icon: [363, 832, 48, 48] },
  { label: { en: 'Corporate Events', te: 'కార్పొరేట్ ఈవెంట్లు' }, icon: [463, 832, 48, 48] },
  { label: { en: 'Return Gifts', te: 'రిటర్న్ గిఫ్ట్‌లు' }, icon: [564, 832, 48, 48] },
];

export const EVENT_TYPES = [
  'Wedding',
  'Engagement',
  'Family Function',
  'Festival',
  'Corporate Event',
  'Return Gifts',
  'Other',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const QUANTITY_OPTIONS = [
  'Up to 5 kg',
  '5 – 10 kg',
  '10 – 25 kg',
  '25 – 50 kg',
  '50 kg or more',
  'Not sure yet',
] as const;

export type QuantityOption = (typeof QUANTITY_OPTIONS)[number];

export const BULK_ART = {
  hero: [440, 107, 584, 324],
  heroLeaves: [0, 108, 62, 106],
  giftBanner: [0, 946, 480, 155],
  whatsapp: [746, 879, 22, 22],
} as const satisfies Record<string, ArtBox>;
