/* =========================================================
   Bulk Orders page

   Layout follows the "Weddings & Bulk Orders" reference:
   hero -> popular products + occasions | quote form ->
   gift box banner.

   The page no longer reuses <Business> (that component is
   shared with Home and Wholesale, which keep their design).
   Content lives in data/bulk.ts; form rules in
   lib/quoteRequest.ts.
   ========================================================= */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { useI18n } from '../i18n';
import type { Localized } from '../i18n/config';
import type { Category } from '../data/cats';
import { Art } from './Art';
import { Lines } from './Lines';
import { QuoteForm } from './QuoteForm';
import {
  BULK_ART,
  bulkBenefits,
  celebrationProducts,
  occasions,
} from '../data/bulk';

const shopLink = (category: Category) =>
  '/shop?category=' + encodeURIComponent(category);

export function BulkOrdersPage() {
  const { t, tx } = useI18n();
  const b = t.bulk;
  /* Data labels mark the design's line break with "\n". */
  const lines = (label: Localized) => tx(label).split('\n');

  return (
    <div className="bulk-page">
      {/* ---------- Hero ---------- */}
      <section className="bulk-hero">
        <Art className="bulk-hero-leaves" source="bulk-page" box={BULK_ART.heroLeaves} alt="" />
        <div className="bulk-hero-art">
          <Art
            source="bulk-page"
            box={BULK_ART.hero}
            alt={b.heroAlt}
          />
        </div>

        <div className="bulk-hero-copy">
          <h1>
            <Lines lines={b.title} />
          </h1>
          <p className="bulk-hero-lead">{b.lead}</p>
          <p className="bulk-hero-text">{b.text}</p>

          <ul className="bulk-benefits">
            {bulkBenefits.map((item) => (
              <li key={item.label.en}>
                <Art className="bulk-benefit-icon" source="bulk-page" box={item.icon} alt="" />
                <span>
                  <Lines lines={lines(item.label)} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Products + occasions | quote ---------- */}
      <section className="bulk-main">
        <div className="bulk-left">
          <h2 className="bulk-title">{b.popularTitle}</h2>
          <p className="bulk-sub">{b.popularSub}</p>

          <ul className="bulk-products">
            {celebrationProducts.map((p) => (
              <li key={p.name.en}>
                <Link href={shopLink(p.category)}>
                  <Art source="bulk-page" box={p.box} alt="" />
                  <strong>{tx(p.name)}</strong>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="bulk-title occasions-title">{b.occasionsTitle}</h2>
          <ul className="bulk-occasions">
            {occasions.map((o) => (
              <li key={o.label.en}>
                <Art className="bulk-occasion-icon" source="bulk-page" box={o.icon} alt="" />
                <span>{tx(o.label)}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="bulk-quote" aria-labelledby="quote-title">
          <h2 id="quote-title">{b.quoteTitle}</h2>
          <p className="bulk-quote-intro">{b.quoteIntro}</p>
          <QuoteForm />
        </aside>
      </section>

      {/* ---------- Gift box banner ---------- */}
      <section className="bulk-gift">
        <div className="bulk-gift-art">
          <Art
            source="bulk-page"
            box={BULK_ART.giftBanner}
            alt={b.giftAlt}
          />
        </div>
        <div className="bulk-gift-copy">
          <h2>{b.giftTitle}</h2>
          <p>
            <Lines lines={b.giftText} />
          </p>
          <Link className="btn bulk-gift-btn" href={shopLink('Gift Boxes')}>
            {b.giftCta} <ArrowRight size={17} />
          </Link>
        </div>
        <p className="bulk-gift-script" aria-hidden="true">
          <Lines lines={b.giftScript} />
        </p>
      </section>
    </div>
  );
}
