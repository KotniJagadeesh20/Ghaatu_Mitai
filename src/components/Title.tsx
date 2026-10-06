/* =========================================================
   Section title

   Extracted from app/storefront.tsx (Phase 3, extraction #3).
   Props, JSX, styles, and behavior unchanged.
   ========================================================= */

import { Art } from './Art';

export function Title({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <h2>
        <Art
          source="home"
          box={[337, 924, 46, 43]}
          alt=""
        />

        {title}

        <Art
          source="home"
          box={[337, 924, 46, 43]}
          alt=""
        />
      </h2>

      {sub && <p>{sub}</p>}
    </div>
  );
}
