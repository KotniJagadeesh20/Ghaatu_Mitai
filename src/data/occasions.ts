/* =========================================================
   Occasions (Home page "Made for Every Occasion" grid)

   Moved from src/components/HomePage.tsx (Phase 15.0a).
   Previously four parallel arrays zipped by position; values
   and order are unchanged.
   ========================================================= */

import type { Occasion } from '../types/content';

export const homeOccasions: readonly Occasion[] = [
  {
    title: { en: 'Evening Chai', te: 'సాయంత్రం చాయ్' },
    href: '/shop',
    description: { en: 'Something crunchy for every conversation.', te: 'ప్రతి కబుర్లకీ కరకరలాడే తోడు.' },
    box: [28, 791, 305, 178],
    icon: [44, 947, 47, 47],
  },
  {
    title: { en: 'Gifting', te: 'కానుకలు' },
    href: '/shop?category=Gift%20Boxes',
    description: { en: 'Sweet boxes made for sharing.', te: 'పంచుకోవడానికే చేసిన స్వీట్ బాక్సులు.' },
    box: [349, 791, 303, 178],
    icon: [361, 947, 47, 47],
  },
  {
    title: { en: 'Weddings & Celebrations', te: 'పెళ్లిళ్లు & వేడుకలు' },
    href: '/bulk-orders',
    description: { en: 'Traditional flavours for your special moments.', te: 'మీ ప్రత్యేక క్షణాలకు సంప్రదాయ రుచులు.' },
    box: [669, 791, 300, 178],
    icon: [689, 947, 47, 47],
  },
  {
    title: { en: 'Wholesale', te: 'హోల్‌సేల్' },
    href: '/wholesale',
    description: { en: 'Bring Ghaatu Mitai to your store.', te: 'ఘాటు మిఠాయిని మీ షాప్‌కి తీసుకురండి.' },
    box: [984, 791, 302, 178],
    icon: [1002, 947, 47, 47],
  },
];
