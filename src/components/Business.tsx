/* =========================================================
   Business sections

   Extracted from app/storefront.tsx (Phase 3, extraction #7).
   JSX, markup, class names, text and ordering unchanged. The
   original function read Storefront's `setEnquiry` directly;
   that is now the `onEnquire` prop, called with the exact same
   string arguments as before.

   Shared by three distinct contexts: twice directly on Home,
   once inside the Wholesale page, once inside the Bulk Orders
   page - Business itself does not know or care which. Bulk
   Orders and Wholesale remain two separate pages/components;
   this is a shared child, not a merged page.
   ========================================================= */

import { toast } from 'sonner';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Coins,
  Download,
  Gift,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Tag,
  Truck,
  Users,
} from 'lucide-react';

import type { EnquiryKind } from '../data/enquiries';
import { useI18n } from '../i18n';
import { Art } from './Art';
import { Lines } from './Lines';

/* Icons stay here; copy lives in t.business (keyed). */
const CELEBRATION_BENEFITS = [
  [Boxes, 'quantities'],
  [Tag, 'pricing'],
  [Gift, 'gifts'],
  [Leaf, 'fresh'],
] as const;

const WHOLESALE_BENEFITS = [
  [Leaf, 'flavours'],
  [ShieldCheck, 'quality'],
  [Truck, 'supply'],
  [Coins, 'pricing'],
] as const;

const PERFECT_FOR = [
  [Gift, 'weddings'],
  [BadgeCheck, 'engagements'],
  [Users, 'family'],
  [Leaf, 'festivals'],
  [Building2, 'corporate'],
] as const;

export function Business({
  wholesale = false,
  onEnquire,
}: {
  wholesale?: boolean;
  onEnquire: (kind: EnquiryKind) => void;
}) {
  const { t } = useI18n();
  const c = t.business.celebration;
  const w = t.business.wholesale;

  if (wholesale) {
    return (
      <>
        <section className="business-showcase wholesale-showcase">
        <div className="showcase-copy">
          <p className="eyebrow">{w.eyebrow}</p>

          <div className="showcase-flourish">
            — <Leaf size={20} /> —
          </div>

          <h1>
            <Lines lines={w.title} />
          </h1>

          <p className="showcase-lead">
            <Lines lines={w.lead} />
          </p>

          <div className="wholesale-hero-benefits">
            {WHOLESALE_BENEFITS.map(([Icon, key]) => (
              <article key={key}>
                <span><Icon /></span>
                <strong>{w.benefits[key]}</strong>
              </article>
            ))}
          </div>

          <div className="showcase-actions">
            <button
              className="btn"
              onClick={() =>
                onEnquire(
                  'Retail partnership'
                )
              }
            >
              {w.partner}
              <ArrowRight size={17} />
            </button>

            <button
              className="btn outline"
              onClick={() =>
                toast.success(w.catalogueToast)
              }
            >
              <Download size={18} />
              {w.catalogue}
            </button>
          </div>
        </div>

        <Art
          className="showcase-art"
          source="business"
          box={[482, 726, 542, 517]}
          alt={w.imageAlt}
        />
        </section>

      </>
    );
  }

  return (
    <>
      <section className="business-showcase celebration-showcase">
        <div className="showcase-copy">
          <p className="eyebrow">{c.eyebrow}</p>

          <div className="showcase-flourish">
            — <Leaf size={20} /> —
          </div>

          <h1>
            <Lines lines={c.title} />
          </h1>

          <p className="showcase-lead">
            <Lines lines={c.lead} />
          </p>

          <div className="celebration-benefits">
            {CELEBRATION_BENEFITS.map(([Icon, key]) => (
              <article key={key}>
                <span>
                  <Icon />
                </span>

                <h3>{c.benefits[key].title}</h3>
                <p>{c.benefits[key].desc}</p>
              </article>
            ))}
          </div>

          <div className="showcase-actions">
            <button
              className="btn"
              onClick={() =>
                onEnquire('Bulk order')
              }
            >
              {c.plan}
              <ArrowRight size={17} />
            </button>

            <button
              className="btn outline"
              onClick={() =>
                onEnquire(
                  'WhatsApp bulk order'
                )
              }
            >
              <MessageCircle size={19} />
              {c.whatsapp}
            </button>
          </div>

          <p className="script">
            <Lines lines={c.script} />
          </p>
        </div>

        <Art
          className="showcase-art"
          source="business"
          box={[490, 0, 534, 629]}
          alt={c.imageAlt}
        />
      </section>

      <div className="perfect-for">
        <strong>{c.perfectFor}</strong>

        {PERFECT_FOR.map(([Icon, key]) => (
          <span key={key}>
            <Icon />
            {c.occasions[key]}
          </span>
        ))}

        <em>
          <Lines lines={c.tagline} />
        </em>
      </div>
    </>
  );
}
