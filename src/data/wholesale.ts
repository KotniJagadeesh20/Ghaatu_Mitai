/* =========================================================
   Wholesale page content

   All `box` crops refer to the 'wholesale-page' sprite
   (see data/dims.ts). Same split as data/bulk.ts: Localized
   content vs. English form-option KEYS.
   ========================================================= */

import type { Category } from './cats';
import type { Localized } from '../i18n/config';
import type { ArtBox } from '../types/content';
import type { IconItem } from './bulk';

export const heroBenefits: readonly IconItem[] = [
  { label: { en: 'Authentic\nFlavours', te: 'అసలైన\nరుచులు' }, icon: [61, 296, 52, 52] },
  { label: { en: 'Consistent\nQuality', te: 'నిలకడైన\nనాణ్యత' }, icon: [151, 296, 52, 52] },
  { label: { en: 'Reliable\nSupply', te: 'నమ్మకమైన\nసరఫరా' }, icon: [242, 296, 52, 52] },
  { label: { en: 'Competitive\nWholesale Pricing', te: 'పోటీ\nహోల్‌సేల్ ధరలు' }, icon: [349, 296, 52, 52] },
];

export const partnerTypes: readonly {
  title: Localized;
  desc: Localized;
  points: readonly Localized[];
  image: ArtBox;
  alt: Localized;
}[] = [
  {
    title: { en: 'For Supermarkets', te: 'సూపర్‌మార్కెట్ల కోసం' },
    desc: {
      en: 'Ready-to-display packaged products with strong shelf appeal.',
      te: 'షెల్ఫ్‌పై ఆకట్టుకునే, నేరుగా పెట్టుకోగల ప్యాక్ చేసిన ఉత్పత్తులు.',
    },
    points: [
      { en: 'Wide product range', te: 'విస్తృత ఉత్పత్తుల శ్రేణి' },
      { en: 'Attractive packaging', te: 'ఆకర్షణీయమైన ప్యాకేజింగ్' },
      { en: 'Steady supply', te: 'నిరంతర సరఫరా' },
      { en: 'Marketing support', te: 'మార్కెటింగ్ సహకారం' },
    ],
    image: [47, 497, 121, 152],
    alt: { en: 'Supermarket aisle with a shopping trolley', te: 'షాపింగ్ ట్రాలీతో సూపర్‌మార్కెట్ వరుస' },
  },
  {
    title: { en: 'For Retailers', te: 'రిటైలర్ల కోసం' },
    desc: {
      en: 'Flexible quantities and wholesale pricing.',
      te: 'అవసరానికి తగిన పరిమాణాలు, హోల్‌సేల్ ధరలు.',
    },
    points: [
      { en: 'Low minimum order quantity', te: 'తక్కువ కనీస ఆర్డర్ పరిమాణం' },
      { en: 'Best-in-class pricing', te: 'అత్యుత్తమ ధరలు' },
      { en: 'Regular supply', te: 'క్రమం తప్పని సరఫరా' },
      { en: 'Fast and reliable delivery', te: 'వేగవంతమైన, నమ్మకమైన డెలివరీ' },
    ],
    image: [368, 497, 115, 152],
    alt: { en: 'Store shelf stocked with Ghaatu Mitai packs', te: 'ఘాటు మిఠాయి ప్యాకెట్లతో నిండిన షాప్ షెల్ఫ్' },
  },
  {
    title: { en: 'For Distributors', te: 'డిస్ట్రిబ్యూటర్ల కోసం' },
    desc: {
      en: 'Talk to us about becoming a distribution partner.',
      te: 'డిస్ట్రిబ్యూషన్ భాగస్వామి కావడం గురించి మాతో మాట్లాడండి.',
    },
    points: [
      { en: 'Pan India supply', te: 'దేశవ్యాప్త సరఫరా' },
      { en: 'Exclusive distribution support', te: 'ప్రత్యేక డిస్ట్రిబ్యూషన్ సహకారం' },
      { en: 'Growing demand', te: 'పెరుగుతున్న డిమాండ్' },
      { en: 'Long-term partnership', te: 'దీర్ఘకాలిక భాగస్వామ్యం' },
    ],
    image: [689, 497, 120, 152],
    alt: { en: 'Stacked Ghaatu Mitai shipping cartons', te: 'పేర్చిన ఘాటు మిఠాయి కార్టన్లు' },
  },
];

/** Labels come from t.categories - these ARE shop categories. */
export const productRange: readonly { category: Category; box: ArtBox }[] = [
  { category: 'Sweets', box: [44, 735, 86, 77] },
  { category: 'Savouries', box: [141, 735, 86, 77] },
  { category: 'Mixtures', box: [238, 735, 86, 77] },
  { category: 'Chips', box: [337, 735, 86, 77] },
  { category: 'Combos', box: [433, 735, 87, 77] },
  { category: 'Gift Boxes', box: [530, 735, 87, 77] },
];

export const whyChoose: readonly IconItem[] = [
  { label: { en: 'Consistent\nQuality', te: 'నిలకడైన\nనాణ్యత' }, icon: [88, 897, 54, 54] },
  { label: { en: 'Reliable\nSupply', te: 'నమ్మకమైన\nసరఫరా' }, icon: [227, 897, 54, 54] },
  { label: { en: 'Wholesale\nPricing', te: 'హోల్‌సేల్\nధరలు' }, icon: [371, 897, 54, 54] },
  { label: { en: 'Careful\nPackaging', te: 'జాగ్రత్తైన\nప్యాకేజింగ్' }, icon: [515, 897, 54, 54] },
];

export const BUSINESS_TYPES = [
  'Supermarket',
  'Retail Store',
  'Distributor',
  'Sweet Shop / Bakery',
  'Online Seller',
  'Other',
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const MONTHLY_VOLUMES = [
  'Under 50 kg',
  '50 – 200 kg',
  '200 – 500 kg',
  '500 kg or more',
  'Not sure yet',
] as const;

export type MonthlyVolume = (typeof MONTHLY_VOLUMES)[number];

export const WHOLESALE_ART = {
  hero: [494, 88, 530, 391],
  heroLeaves: [0, 140, 48, 115],
  bandLeaves: [0, 1260, 96, 62],
} as const satisfies Record<string, ArtBox>;
