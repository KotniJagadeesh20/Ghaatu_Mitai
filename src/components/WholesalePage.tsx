/* =========================================================
   Wholesale page

   Layout follows the "Bring Ghaatu Mitai to Your Store"
   reference: hero -> partner types -> [range, why | enquiry form]
   -> CTA band.

   No longer uses <Business wholesale> / <WholesaleReasons>;
   those remain for other pages (WholesaleReasons is on Home).
   Content: data/wholesale.ts. Form: WholesaleEnquiryForm.
   ========================================================= */

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import { useI18n } from '../i18n';
import type { Localized } from '../i18n/config';
import type { Category } from '../data/cats';
import { Art } from './Art';
import { Lines } from './Lines';
import { WholesaleEnquiryForm } from './WholesaleEnquiryForm';
import {
  WHOLESALE_ART,
  heroBenefits,
  partnerTypes,
  productRange,
  whyChoose,
} from '../data/wholesale';
import { asset } from '../lib/asset';

const CATALOGUE_URL = asset('/wholesale-catalogue.txt');
const CATALOGUE_FILE = 'Ghaatu-Mitai-Wholesale-Catalogue.txt';

const shopLink = (category: Category) =>
  '/shop?category=' + encodeURIComponent(category);

function Check() {
  return (
    <svg className="ws-check" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" />
      <path d="m4.6 8.2 2.2 2.2 4.6-4.7" />
    </svg>
  );
}

/* Plain <a download>, not <Link>: it's a file, not a route. */
function CatalogueLink({ className, label }: { className: string; label: string }) {
  return (
    <a className={className} href={CATALOGUE_URL} download={CATALOGUE_FILE}>
      <Download size={17} />
      {label}
    </a>
  );
}

export function WholesalePage() {
  const { t, tx } = useI18n();
  const w = t.wholesalePage;
  /* Data labels mark the design's line break with "\n". */
  const lines = (label: Localized) => tx(label).split('\n');
  const formRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [presetType, setPresetType] = useState<string>();

  const becomePartner = () => {
    setPresetType('Retail Store'); // canonical key, see data/wholesale
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    firstFieldRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="ws-page">
      {/* ---------- Hero ---------- */}
      <section className="ws-hero">
        <Art className="ws-hero-leaves" source="wholesale-page" box={WHOLESALE_ART.heroLeaves} alt="" />
        <div className="ws-hero-art">
          <Art
            source="wholesale-page"
            box={WHOLESALE_ART.hero}
            alt={w.heroAlt}
          />
        </div>

        <div className="ws-hero-copy">
          <p className="ws-eyebrow">{w.eyebrow}</p>
          <h1>
            <Lines lines={w.title} />
          </h1>
          <p className="ws-hero-lead">{w.lead}</p>

          <ul className="ws-benefits">
            {heroBenefits.map((b) => (
              <li key={b.label.en}>
                <Art className="ws-icon" source="wholesale-page" box={b.icon} alt="" />
                <span>
                  <Lines lines={lines(b.label)} />
                </span>
              </li>
            ))}
          </ul>

          <div className="ws-hero-actions">
            <button type="button" className="btn ws-btn-dark" onClick={becomePartner}>
              {w.partner} <ArrowRight size={17} />
            </button>
            <CatalogueLink className="btn ws-btn-outline" label={w.catalogue} />
          </div>
        </div>
      </section>

      {/* ---------- Partner types ---------- */}
      <section className="ws-partners">
        {partnerTypes.map((p) => (
          <article key={p.title.en}>
            <Art source="wholesale-page" box={p.image} alt={tx(p.alt)} />
            <div>
              <h2>{tx(p.title)}</h2>
              <p>{tx(p.desc)}</p>
              <ul>
                {p.points.map((point) => (
                  <li key={point.en}>
                    <Check />
                    {tx(point)}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* ---------- Main two-column area ---------- */}
      <section className="ws-main">
        <div className="ws-left">
          <h2 className="ws-title">{w.rangeTitle}</h2>
          <p className="ws-sub">{w.rangeSub}</p>
          <ul className="ws-range">
            {productRange.map((r) => (
              <li key={r.category}>
                <Link href={shopLink(r.category)}>
                  <Art source="wholesale-page" box={r.box} alt="" />
                  <span>{t.categories[r.category]}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="ws-why">
            <h2 className="ws-title">{w.whyTitle}</h2>
            <ul>
              {whyChoose.map((item) => (
                <li key={item.label.en}>
                  <Art className="ws-icon" source="wholesale-page" box={item.icon} alt="" />
                  <span>
                    <Lines lines={lines(item.label)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ws-right">
          <div className="ws-enquiry" ref={formRef} aria-labelledby="ws-enquiry-title" role="region">
            <h2 id="ws-enquiry-title">{w.enquiryTitle}</h2>
            <p>{w.enquiryIntro}</p>
            <WholesaleEnquiryForm ref={firstFieldRef} presetType={presetType} />
          </div>
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="ws-band">
        <Art className="ws-band-leaves" source="wholesale-page" box={WHOLESALE_ART.bandLeaves} alt="" />
        <div className="ws-band-copy">
          <h2>{w.bandTitle}</h2>
          <p>{w.bandText}</p>
        </div>
        <div className="ws-band-actions">
          <CatalogueLink className="btn ws-btn-ghost" label={w.bandCatalogue} />
          <button type="button" className="btn ws-btn-light" onClick={becomePartner}>
            {w.partner} <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
