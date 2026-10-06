/* =========================================================
   Wholesale reasons

   Icons here, copy in t.wholesaleReasons (keyed).
   ========================================================= */

import { Leaf, BadgeCheck, Package, Coins, ShieldCheck } from 'lucide-react';

import { useI18n } from '../i18n';

const REASONS = [
  [BadgeCheck, 'quality'],
  [Package, 'supply'],
  [Coins, 'pricing'],
  [ShieldCheck, 'packaging'],
] as const;

export function WholesaleReasons() {
  const { t } = useI18n();

  return (
    <section className="wholesale-reasons">
      <h2>
        <Leaf />
        {t.wholesaleReasons.title}
        <Leaf />
      </h2>

      <div>
        {REASONS.map(([Icon, key]) => (
          <article key={key}>
            <Icon />

            <span>
              <strong>{t.wholesaleReasons[key].title}</strong>
              <small>{t.wholesaleReasons[key].desc}</small>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
