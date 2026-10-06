/* =========================================================
   Community images (Home page "Moments from Our Community")

   Moved from src/components/HomePage.tsx (Phase 15.0a).
   Previously an x-offset array plus a parallel alt array;
   crops, alt text and order are unchanged.
   ========================================================= */

import type { CommunityImage } from '../types/content';

export const communityImages: readonly CommunityImage[] = [
  { box: [21, 600, 150, 220], alt: { en: 'A cup of evening chai', te: 'ఒక కప్పు సాయంత్రం చాయ్' } },
  { box: [184, 600, 150, 220], alt: { en: 'Fresh jantikalu', te: 'తాజా జంతికలు' } },
  { box: [350, 600, 150, 220], alt: { en: 'A festive sweet spread', te: 'పండుగ స్వీట్ల విందు' } },
  { box: [520, 600, 150, 220], alt: { en: 'Ghaatu Mitai gift boxes', te: 'ఘాటు మిఠాయి గిఫ్ట్ బాక్సులు' } },
  { box: [688, 600, 150, 220], alt: { en: 'A crisp banana chip', te: 'కరకరలాడే అరటి చిప్' } },
  { box: [856, 600, 150, 220], alt: { en: 'Packaged traditional snacks', te: 'ప్యాక్ చేసిన సంప్రదాయ స్నాక్స్' } },
];
