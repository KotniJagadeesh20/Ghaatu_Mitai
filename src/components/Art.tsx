/* =========================================================
   Artwork component

   Extracted from app/storefront.tsx (Phase 3, extraction #2).
   Props, JSX, styles, calculations and defaults unchanged.
   ========================================================= */

import { dims } from '../data/dims';
import { asset } from '../lib/asset';

export function Art({
  source,
  box,
  alt,
  className = '',
  style,
}: {
  source: string;
  box: readonly number[];
  alt: string;
  className?: string;
  /** Extra styles for the wrapper, e.g. positioning. */
  style?: React.CSSProperties;
}) {
  const [x, y, w, h] = box;

  return (
    <div
      className={'art ' + className}
      style={{
        ...style,
        aspectRatio: `${w}/${h}`,
      }}
    >
      <img
        src={asset(`/images/${source}.png`)}
        alt={alt}
        draggable={false}
        style={{
          width: dims[source][0] / w * 100 + '%',
          maxWidth: 'none',
          left: -x / w * 100 + '%',
          top: 0,
          transform: `translateY(${
            -y / dims[source][1] * 100
          }%)`,
        }}
      />
    </div>
  );
}
