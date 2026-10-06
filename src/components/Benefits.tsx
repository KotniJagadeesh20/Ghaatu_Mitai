/* =========================================================
   Benefits

   Icons live here; copy lives in t.benefits, keyed (not
   positional) so reordering can't mismatch icon and text.
   ========================================================= */

import { Leaf, Heart, Truck, Users } from 'lucide-react';

import { useI18n } from '../i18n';

const ITEMS = [
  [Leaf, 'recipes'],
  [Heart, 'quality'],
  [Truck, 'delivery'],
  [Users, 'bulk'],
] as const;

export function Benefits() {
  const { t } = useI18n();

  return (
    <div className="benefits">
      {ITEMS.map(([Icon, key]) => (
        <div key={key}>
          <Icon size={30} />

          <span>
            <strong>{t.benefits[key].title}</strong>
            <small>{t.benefits[key].desc}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
