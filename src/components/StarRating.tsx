/* Star rating with fractional fill (e.g. 4.5 stars).
   A muted row of stars with a clipped filled row on top -
   no images, scales with font-size. */

import { useI18n } from '../i18n';

export function StarRating({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  const { t } = useI18n();
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div
      className="rating"
      aria-label={t.product.rating(rating, reviews)}
    >
      <span className="stars" aria-hidden="true">
        ★★★★★
        <span className="stars-fill" style={{ width: percent + '%' }}>
          ★★★★★
        </span>
      </span>{' '}
      <span className="rating-count" aria-hidden="true">
        ({reviews})
      </span>
    </div>
  );
}
