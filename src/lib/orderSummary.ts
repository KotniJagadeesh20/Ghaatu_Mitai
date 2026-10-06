/* =========================================================
   Order summary (Phase 15.1)

   Pure helpers for the cart's Order summary - no React, no
   state, no I/O. Line amounts use the same expression as
   Storefront's `total` (price x multiplier(size) x qty), and
   the Total line uses Storefront's `total` itself, so the
   message always matches what the Order summary dialog shows.

   The message is ALWAYS English (product.name.en), whatever
   language the visitor browses in: it is read by the
   business, and one consistent format is easier to process.
   ========================================================= */

import { products } from '../data/products';
import { WHATSAPP_NUMBER } from '../config/business';
import type { CartItem } from '../types/cart';

export interface OrderLine {
  name: string;
  size: string;
  qty: number;
  amount: number;
}

export function orderLines(
  cart: CartItem[],
  multiplier: (size: string) => number
): OrderLine[] {
  return cart.map((item) => ({
    name: products[item.id].name.en,
    size: item.size,
    qty: item.qty,
    amount: products[item.id].price * multiplier(item.size) * item.qty,
  }));
}

export function formatWhatsAppOrder(
  lines: OrderLine[],
  total: number
): string {
  return [
    '🛒 GHAATU MITAI ORDER',
    '',
    ...lines.map(
      (line, index) =>
        `${index + 1}. ${line.name} (${line.size}) × ${line.qty} — ₹${line.amount}`
    ),
    '',
    `Total: ₹${total}`,
    '',
    'Name:',
    'Phone:',
    'Delivery Address:',
  ].join('\n');
}

export function whatsAppOrderUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
