import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useI18n } from '../i18n';

export function ShopPagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const { t } = useI18n();

  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav className="shop-pagination" aria-label={t.shop.pagination}>
      <button
        type="button"
        aria-label={t.shop.previous}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={n === page ? 'current' : ''}
          aria-current={n === page ? 'page' : undefined}
          aria-label={t.shop.page(n)}
          onClick={() => onPageChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label={t.shop.next}
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
