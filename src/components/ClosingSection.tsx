/* =========================================================
   Closing section

   Extracted from app/storefront.tsx (Phase 13.5).
   JSX, markup, class names, text, hrefs and ordering are
   unchanged (indentation only). Rendered once by Storefront
   after <main>, on every page. Reads no Storefront state and
   takes no props.
   ========================================================= */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { useI18n } from '../i18n';
import { Art } from './Art';
import { Lines } from './Lines';

export function ClosingSection() {
  const { t } = useI18n();

  return (
    <section className="closing">
      <div>
        <p className="eyebrow">{t.closing.eyebrow}</p>

        <h2>
          <Lines lines={t.closing.title} />
        </h2>

        <p>
          <Lines lines={t.closing.text} />
        </p>

        <div className="actions">
          <Link
            className="btn light"
            href="/shop"
          >
            {t.closing.shopNow}
            <ArrowRight size={17} />
          </Link>

          <Link
            className="btn light-outline"
            href="/contact"
          >
            {t.closing.talkToUs}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <Art
        source="community"
        box={[558, 860, 466, 318]}
        alt={t.closing.imageAlt}
      />
    </section>
  );
}
