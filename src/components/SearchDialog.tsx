/* =========================================================
   Search dialog

   Extracted from app/storefront.tsx (Phase 3, extraction #9.3b).
   Markup, classes, Dialog configuration, title/description
   text, input attributes (autoFocus, placeholder), the inline
   name filter, result ordering, keys, the "250g · ₹price" label
   and the Plus icon are all unchanged.

   Renames only: `search` -> `open`, `setSearch` ->
   `onOpenChange`, `setQuery` -> `onQueryChange`, `add` ->
   `onAdd`. All state stays owned by Storefront:
   - `query` is shared with the Shop page's search input and
     filterProducts(), so this stays a controlled input.
   - `add()` resolves the pack size via Storefront's sizeFor(),
     so a result adds the size last chosen on that product's
     card even though the label always reads "250g". That is
     pre-existing behavior and is intentionally NOT changed here.

   The inline filter intentionally does NOT use filterProducts():
   it ignores category/favourites, exactly as before extraction.
   ========================================================= */

import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { products } from '../data/products';
import { defaultSize, startingPrice } from '../lib/pricing';
import { matchesQuery } from '../lib/filterProducts';
import { useI18n } from '../i18n';

export function SearchDialog({
  open,
  onOpenChange,
  query,
  onQueryChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onAdd: (id: number) => void;
}) {
  const { t, tx } = useI18n();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogTitle>{t.search.title}</DialogTitle>

        <DialogDescription>{t.search.description}</DialogDescription>

        <input
          className="form-input"
          autoFocus
          placeholder={t.search.placeholder}
          value={query}
          onChange={(event) =>
            onQueryChange(
              event.target.value
            )
          }
        />

        <div className="search-results">
          {products
            .map((product, id) => ({
              ...product,
              id,
            }))
            .filter((product) => matchesQuery(product, query))
            .map((product) => (
              <button
                key={product.id}
                onClick={() =>
                  onAdd(product.id)
                }
              >
                <span>
                  {tx(product.name)}

                  <small>
                    {defaultSize(product)} · ₹
                    {startingPrice(product)}
                  </small>
                </span>

                <Plus size={18} />
              </button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
