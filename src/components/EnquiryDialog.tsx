/* =========================================================
   Enquiry dialog

   Extracted from app/storefront.tsx (Phase 3, extraction #9.3d).
   Dialog/DialogContent/DialogTitle/DialogDescription usage,
   the "Order summary" branch (cart lines, `Total: ₹{total}`,
   "Online ordering is coming soon."), the form (labels,
   inputs, required flags, textarea placeholder/rows),
   FormData usage, the draft string format, the data:text/plain
   download Link and its filename, class names and DOM
   hierarchy are all unchanged.

   Renames only: `!!enquiry` -> `open`, the inline close
   handler -> `onOpenChange`, `setDraft` -> `onDraftChange`.
   All state stays owned by Storefront:
   - The close-reset (clear enquiry AND draft when the dialog
     closes via X, Escape or overlay) moved VERBATIM into
     Storefront's onOpenChange callback, so its timing is
     identical to before extraction.
   - `onEnquiryChange` is part of the agreed API but is not
     read here: the dialog never changes the title itself, so
     it is intentionally not destructured.
   - `multiplier` is read since Phase 15.1 (below).

   Pre-existing behaviour intentionally NOT changed: email is
   `required` here while other forms mark it optional; draft
   wording; download format. `Link` is imported from
   'next/link' so the Vite alias (src/compat/next-link.tsx)
   and legacy resolution both apply, exactly as before.

   Phase 15.1: the Order summary branch gains an "Order on
   WhatsApp" link (wa.me). Its message is built from the same
   cart, products, multiplier() and `total` that this branch
   renders (src/lib/orderSummary.ts). Nothing else changes:
   the order lines, total and copy are untouched, and the
   enquiry form and its Download TXT are not modified. It is a
   plain <a>, not next/link, because vinext's next/link drops
   non-route hrefs in the legacy build (see KNOWN_ISSUES #7).
   ========================================================= */

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { products } from '../data/products';
import type { EnquiryKind } from '../data/enquiries';
import { useI18n } from '../i18n';
import type { CartItem } from '../types/cart';
import {
  orderLines,
  formatWhatsAppOrder,
  whatsAppOrderUrl,
} from '../lib/orderSummary';

export interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** '' = closed. The canonical (English) kind, see data/enquiries. */
  enquiry: EnquiryKind | '';
  draft: string;

  cart: CartItem[];
  total: number;
  multiplier: (size: string) => number;

  onDraftChange: (draft: string) => void;
  onEnquiryChange: (kind: EnquiryKind) => void;
}

export function EnquiryDialog({
  open,
  onOpenChange,
  enquiry,
  draft,
  cart,
  total,
  multiplier,
  onDraftChange,
}: EnquiryDialogProps) {
  const { t, tx } = useI18n();
  const isOrder = enquiry === 'Order summary';

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogTitle>{enquiry && t.enquiry.kinds[enquiry]}</DialogTitle>

        <DialogDescription>
          {isOrder ? t.enquiry.orderDescription : t.enquiry.formDescription}
        </DialogDescription>

        {isOrder ? (
          <>
            <div>
              {cart.map(
                (item) => (
                  <p
                    key={
                      item.id +
                      item.size
                    }
                  >
                    {item.qty} ×{' '}
                    {tx(products[item.id].name)}{' '}
                    ({item.size})
                  </p>
                )
              )}

              <strong>{t.enquiry.total(total)}</strong>
            </div>

            <p>{t.enquiry.comingSoon}</p>

            {cart.length > 0 && (
              <a
                className="btn"
                href={whatsAppOrderUrl(
                  formatWhatsAppOrder(
                    orderLines(cart, multiplier),
                    total
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} />
                {t.enquiry.orderOnWhatsApp}
              </a>
            )}
          </>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              // The prepared text stays English in every UI
              // language: it is meant for the business.

              const form =
                new FormData(
                  event.currentTarget
                );

              onDraftChange(
                `${enquiry}\nName: ${form.get(
                  'name'
                )}\nEmail: ${form.get(
                  'email'
                )}\nDetails: ${form.get(
                  'details'
                )}`
              );
            }}
          >
            <label>
              {t.enquiry.name}

              <input
                name="name"
                required
                className="form-input"
              />
            </label>

            <label>
              {t.enquiry.email}

              <input
                name="email"
                type="email"
                required
                className="form-input"
              />
            </label>

            <label>
              {t.enquiry.details}

              <textarea
                name="details"
                required
                className="form-input"
                rows={4}
                placeholder={t.enquiry.detailsPlaceholder}
              />
            </label>

            <button
              className="btn"
              type="submit"
            >
              {t.enquiry.prepare}
              <ArrowRight size={16} />
            </button>

            {draft && (
              <div className="draft">
                <p>{t.enquiry.ready}</p>

                <Link
                  className="text-link"
                  href={
                    'data:text/plain;charset=utf-8,' +
                    encodeURIComponent(
                      draft
                    )
                  }
                  download="ghaatu-mitai-enquiry.txt"
                >
                  {t.enquiry.download}
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
