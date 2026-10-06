/* =========================================================
   Cart sheet

   Extracted from app/storefront.tsx (Phase 3, extraction #9.3c).
   Markup, classes, aria-labels, keys (`item.id + item.size`),
   the Art usage, price display (`price * multiplier(size)`),
   the free-shipping copy and its `total > 999` /
   `1000 - total` logic, the Review order button and the
   empty-state `/shop` Link are all unchanged.

   All state stays owned by Storefront. The cart, derived
   `count`/`total` and the `multiplier()` helper are passed in
   rather than recomputed or moved (same precedent as
   ProductCard). Handler bodies were NOT changed - they moved
   verbatim into Storefront's callbacks:
   - onChangeQty -> Storefront's change(index, delta)
   - onRemove    -> the original non-functional
                    `setCart(cart.filter((_, key) => key !== index))`
                    (intentionally not converted to an updater)
   - onReviewOrder -> setEnquiry('Order summary') THEN
                    setCartOpen(false), same order as before

   `Link` is imported from 'next/link' so the Vite alias /
   legacy resolution applies here too (src/compat/next-link.tsx).
   ========================================================= */

import Link from 'next/link';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { Art } from './Art';
import { products } from '../data/products';
import { useI18n } from '../i18n';
import type { CartItem } from '../types/cart';

export function CartSheet({
  open,
  onOpenChange,
  cart,
  count,
  total,
  multiplier,
  onChangeQty,
  onRemove,
  onReviewOrder,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  count: number;
  total: number;
  multiplier: (size: string) => number;
  onChangeQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onReviewOrder: () => void;
}) {
  const { t, tx } = useI18n();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="cart-panel">
        <SheetTitle>{t.cart.title(count)}</SheetTitle>

        <SheetDescription>{t.cart.description}</SheetDescription>

        {cart.length ? (
          <>
            <div className="cart-items">
              {cart.map(
                (item, index) => (
                  <div
                    className="cart-item"
                    key={
                      item.id +
                      item.size
                    }
                  >
                    <Art
                      source={products[item.id].source}
                      box={
                        products[
                          item.id
                        ].box
                      }
                      alt={tx(products[item.id].name)}
                    />

                    <div>
                      <h3>{tx(products[item.id].name)}</h3>

                      <p>
                        {item.size} · ₹
                        {
                          products[
                            item.id
                          ].price *
                            multiplier(
                              item.size
                            )
                        }
                      </p>

                      <div className="quantity">
                        <button
                          onClick={() =>
                            onChangeQty(
                              index,
                              -1
                            )
                          }
                          aria-label={t.cart.decrease}
                        >
                          <Minus size={14} />
                        </button>

                        <span>
                          {item.qty}
                        </span>

                        <button
                          onClick={() =>
                            onChangeQty(
                              index,
                              1
                            )
                          }
                          aria-label={t.cart.increase}
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          onClick={() =>
                            onRemove(
                              index
                            )
                          }
                          aria-label={t.cart.remove(tx(products[item.id].name))}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="cart-total">
              <strong>
                {t.cart.subtotal}
                <span>
                  ₹{total}
                </span>
              </strong>

              <p>
                {total > 999
                  ? t.cart.freeShipping
                  : t.cart.addMore(1000 - total)}
              </p>

              <button
                className="btn"
                onClick={() =>
                  onReviewOrder()
                }
              >
                {t.cart.review}
                <ArrowRight size={17} />
              </button>

              <small>{t.cart.previewNote}</small>
            </div>
          </>
        ) : (
          <div className="empty">
            <ShoppingBag size={40} />

            <h3>{t.cart.emptyTitle}</h3>

            <Link
              className="btn"
              href="/shop"
            >
              {t.cart.explore}
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
