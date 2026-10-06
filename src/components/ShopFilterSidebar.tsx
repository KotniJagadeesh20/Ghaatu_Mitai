/* =========================================================
   Shop filter sidebar

   Controlled component: it renders `filters` and reports
   changes through `onChange(patch)`. It holds no filter state
   itself, only which sections are expanded.
   ========================================================= */

import { ChevronDown, Leaf } from 'lucide-react';

import { Lines } from './Lines';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';

import { cats } from '../data/cats';
import { useI18n } from '../i18n';
import type { PackSize } from '../types/product';
import {
  PRICE_MAX,
  PRICE_MIN,
  WEIGHTS,
  type ShopFilters,
} from '../lib/shopFilters';

type Counts = {
  categories: Record<string, number>;
  weights: Record<PackSize, number>;
  noPreservatives: number;
  vegetarian: number;
  inStock: number;
};

function toggle<T>(list: T[], value: T) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

const rupees = (value: number) =>
  '₹' + value.toLocaleString('en-IN') + (value >= PRICE_MAX ? '+' : '');

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible defaultOpen className="filter-section">
      <CollapsibleTrigger className="filter-section-trigger">
        {title}
        <ChevronDown size={16} aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent className="filter-section-body">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={'filter-check' + (count ? '' : ' is-empty')}>
      <input
        type="checkbox"
        checked={checked}
        disabled={!count && !checked}
        onChange={onChange}
      />
      <span>
        {label} <small>({count})</small>
      </span>
    </label>
  );
}

export function ShopFilterSidebar({
  filters,
  counts,
  activeCount,
  onChange,
  onClear,
  id,
}: {
  filters: ShopFilters;
  counts: Counts;
  activeCount: number;
  onChange: (patch: Partial<ShopFilters>) => void;
  onClear: () => void;
  id?: string;
}) {
  const { t } = useI18n();
  const f = t.filters;

  return (
    <aside className="shop-sidebar" id={id} aria-label={f.label}>
      <div className="filter-card">
        {activeCount > 0 && (
          <button type="button" className="filter-clear" onClick={onClear}>
            {f.clear(activeCount)}
          </button>
        )}

        <Section title={f.categories}>
          {cats.map((cat) => (
            <Check
              key={cat}
              label={t.categories[cat]}
              count={counts.categories[cat] ?? 0}
              checked={filters.categories.includes(cat)}
              onChange={() =>
                onChange({ categories: toggle(filters.categories, cat) })
              }
            />
          ))}
        </Section>

        {/* Price is always visible in the design, so no collapse. */}
        <div className="filter-section">
          <p className="filter-section-trigger as-label">{f.price}</p>
          <div className="filter-section-body">
            <Slider
              className="price-slider"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50}
              minStepsBetweenThumbs={1}
              value={filters.price}
              onValueChange={(value) =>
                onChange({ price: [value[0], value[1]] })
              }
              aria-label={f.price}
            />
            <div className="price-labels">
              <span>{rupees(filters.price[0])}</span>
              <span>{rupees(filters.price[1])}</span>
            </div>
          </div>
        </div>

        <Section title={f.weight}>
          {WEIGHTS.map((weight) => (
            <Check
              key={weight}
              label={weight}
              count={counts.weights[weight]}
              checked={filters.weights.includes(weight)}
              onChange={() =>
                onChange({ weights: toggle(filters.weights, weight) })
              }
            />
          ))}
        </Section>

        <Section title={f.dietary}>
          <Check
            label={f.noPreservatives}
            count={counts.noPreservatives}
            checked={filters.noPreservatives}
            onChange={() =>
              onChange({ noPreservatives: !filters.noPreservatives })
            }
          />
          <Check
            label={f.vegetarian}
            count={counts.vegetarian}
            checked={filters.vegetarian}
            onChange={() => onChange({ vegetarian: !filters.vegetarian })}
          />
        </Section>

        <Section title={f.availability}>
          <Check
            label={f.inStock}
            count={counts.inStock}
            checked={filters.inStock}
            onChange={() => onChange({ inStock: !filters.inStock })}
          />
        </Section>
      </div>

      <div className="shop-promise">
        <Leaf size={30} aria-hidden="true" />
        <p>
          <strong>
            <Lines lines={f.promise} />
          </strong>
          {f.promiseBrand[0]}
          <b>{f.promiseBrand[1]}</b>
        </p>
      </div>
    </aside>
  );
}
