/* =========================================================
   Product card

   Presentational only: the caller passes the resolved `size`
   and `price`, and owns cart/saved state.

   `variant="shop"` follows the shop page design (rating under
   the title). The home "Best Sellers" layout is unchanged.
   Badges, ratings and pack sizes now come from product data
   instead of hard-coded id checks.
   ========================================================= */

import { Heart, ShoppingCart } from 'lucide-react';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

import { Art } from './Art';
import { StarRating } from './StarRating';
import type { FilteredProduct } from '../lib/filterProducts';
import { useI18n } from '../i18n';

export function ProductCard({
  product,
  isSaved,
  size,
  price,
  onAdd,
  onToggleSaved,
  onSizeChange,
  variant = 'home',
}: {
  product: FilteredProduct;
  isSaved: boolean;
  size: string;
  price: number;
  onAdd: (id: number) => void;
  onToggleSaved: (id: number) => void;
  onSizeChange: (id: number, size: string) => void;
  variant?: 'home' | 'shop';
}) {
  const { t, tx } = useI18n();
  const name = tx(product.name);

  const rating = (
    <StarRating rating={product.rating} reviews={product.reviews} />
  );

  return (
    <article className={'product product--' + variant}>
      <div className="product-photo">
        <Art source={product.source} box={product.box} alt={name} />

        {product.badge && (
          <span
            className={
              'badge' + (product.badge === 'New' ? ' badge--new' : '')
            }
          >
            {t.badges[product.badge]}
          </span>
        )}

        <button
          className={'heart ' + (isSaved ? 'liked' : '')}
          aria-label={t.product.save(name)}
          aria-pressed={isSaved}
          onClick={() => onToggleSaved(product.id)}
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="product-info">
        <h3>{name}</h3>

        {variant === 'shop' && rating}

        <p>{tx(product.desc)}</p>

        <RadioGroup
          className="pack-options"
          value={size}
          onValueChange={(value) => onSizeChange(product.id, value)}
          aria-label={t.product.packSize(name)}
        >
          {product.sizes.map((weight) => (
            <label key={weight} className={size === weight ? 'chosen' : ''}>
              <RadioGroupItem value={weight} className="sr-only" />
              {weight}
            </label>
          ))}
        </RadioGroup>

        <strong className="product-price">₹{price}</strong>

        {variant === 'home' && rating}

        <div className="product-buttons">
          <button
            className="btn add"
            disabled={!product.inStock}
            onClick={() => onAdd(product.id)}
          >
            <ShoppingCart size={18} />
            {product.inStock ? t.product.addToCart : t.product.outOfStock}
          </button>

          <button
            className={'save-product ' + (isSaved ? 'liked' : '')}
            aria-label={t.product.save(name)}
            aria-pressed={isSaved}
            onClick={() => onToggleSaved(product.id)}
          >
            <Heart size={22} />
          </button>
        </div>
      </div>
    </article>
  );
}
