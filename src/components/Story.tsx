/* =========================================================
   Story

   Extracted from app/storefront.tsx (Phase 3, extraction #6).
   JSX and behavior unchanged. The original function read
   Storefront's `page` only to decide whether to show the
   "Our journey" CTA (`page === 'home'`) - that single boolean
   is now the component's only prop, computed by the caller,
   rather than passing the whole `page` value through.
   ========================================================= */

import { Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useI18n } from '../i18n';
import { Art } from './Art';
import { Lines } from './Lines';

export function Story({
  showJourneyLink,
}: {
  showJourneyLink: boolean;
}) {
  const { t } = useI18n();

  return (
    <section className="story split">
      <Art
        source="story"
        box={[0, 0, 756, 714]}
        alt={t.story.imageAlt}
      />

      <div className="split-copy">
        <Art
          className="story-memories"
          source="story"
          box={[1262, 49, 273, 651]}
          alt={t.story.memoriesAlt}
        />

        <p className="eyebrow">{t.story.eyebrow}</p>

        <h2>
          <Lines lines={t.story.title} />
        </h2>

        <div className="flourish">
          — <Leaf /> —
        </div>

        {t.story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {showJourneyLink && (
          <Link
            className="btn"
            href="/about"
          >
            {t.story.journey}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </section>
  );
}
