/* =========================================================
   Home page

   Extracted from app/storefront.tsx (Phase 13.2).
   JSX, markup, class names, text, ordering and inline arrays
   are unchanged. Two substitutions only:

   - The original branch read Storefront's `setEnquiry`
     directly (passed to both Business sections); that is now
     the `onEnquire` prop, forwarded unchanged.
   - `showJourneyLink={(page as string) === 'home'}` became
     `showJourneyLink={true}`: the branch only rendered when
     `page === 'home'`, so the expression was always true.

   `catalogue` is Storefront's own function, passed through
   unchanged and called with no arguments exactly as before.
   All state (category, query, saved, sizes, cart, enquiry)
   stays owned by Storefront.
   ========================================================= */

import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

import { cats } from '../data/cats';
import { homeOccasions } from '../data/occasions';
import { communityImages } from '../data/community';

import type { EnquiryKind } from '../data/enquiries';
import { useI18n } from '../i18n';

import { Art } from './Art';
import { Lines } from './Lines';
import { Title } from './Title';
import { Benefits } from './Benefits';
import { WholesaleReasons } from './WholesaleReasons';
import { Story } from './Story';
import { Business } from './Business';

/**
 * Position an icon crop over its photo crop, in percentages of
 * the photo, so it stays aligned at every card width.
 * (left/width are % of the photo's width, top is % of its height.)
 */
function iconPlacement(photo: readonly number[], icon: readonly number[]) {
  const [px, py, pw, ph] = photo;
  const [ix, iy, iw] = icon;
  return {
    left: `${((ix - px) / pw) * 100}%`,
    top: `${((iy - py) / ph) * 100}%`,
    width: `${(iw / pw) * 100}%`,
  };
}

export function HomePage({
  catalogue,
  onEnquire,
}: {
  catalogue: () => React.ReactNode;
  onEnquire: (kind: EnquiryKind) => void;
}) {
  const { t, tx } = useI18n();

  return (
    <>
      <section className="hero">
        <div className="hero-photo">
          <Art
            source="home"
            box={[449, 142, 575, 636]}
            alt={t.home.heroAlt}
          />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <Lines lines={t.home.eyebrow} />
          </p>

          <h1 className="brand-wordmark">
            <span className="sr-only">{t.home.brandSr}</span>

            <Art
              source="home"
              box={[54, 283, 394, 127]}
              alt=""
            />
          </h1>

          <Art
            className="hero-handwriting"
            source="home"
            box={[53, 430, 420, 66]}
            alt={t.home.handwritingAlt}
          />

          <p className="intro">
            <Lines lines={t.home.intro} />
          </p>

          <div className="actions">
            <Link
              className="btn"
              href="/shop"
            >
              {t.home.shopCta}
              <ArrowRight size={17} />
            </Link>

            <Link
              className="btn outline"
              href="/bulk-orders"
            >
              {t.home.bulkCta}
            </Link>
          </div>
        </div>
      </section>

      {<Benefits />}

      <section className="section categories">
        <Art
          className="corner-leaf"
          source="home"
          box={[0, 895, 98, 109]}
          alt=""
        />

        <Art
          className="corner-leaf right"
          source="home"
          box={[0, 895, 98, 109]}
          alt=""
        />

        <Title
          eyebrow={t.home.categoriesEyebrow}
          title={t.home.categoriesTitle}
          sub={t.home.categoriesSub}
        />

        <div className="category-grid">
          {cats.map((categoryName, i) => (
            <Link
              href={
                '/shop?category=' +
                encodeURIComponent(
                  categoryName
                )
              }
              key={categoryName}
            >
              <Art
                source="home"
                box={
                  [
                    [27, 1019, 143, 143],
                    [190, 1019, 143, 143],
                    [355, 1019, 143, 143],
                    [523, 1019, 143, 143],
                    [691, 1019, 143, 143],
                    [855, 1019, 143, 143],
                  ][i]
                }
                alt={t.categories[categoryName]}
              />

              <h3>{t.categories[categoryName]}</h3>

              <span className="round-arrow">
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="quote">
        <Art
          className="quote-leaf"
          source="home"
          box={[0, 1330, 119, 206]}
          alt=""
        />

        {t.home.quote}

        <div className="quote-ornament">
          — <Leaf /> —
        </div>

        <small>{t.home.quoteSmall}</small>
      </div>

      <section className="section">
        <div className="heading-row">
          <Art
            className="best-note"
            source="shop"
            box={[36, 26, 139, 121]}
            alt={t.home.bestNoteAlt}
          />

          <Title
            eyebrow={t.home.bestEyebrow}
            title={t.home.bestTitle}
            sub={t.home.bestSub}
          />

          <Link
            href="/shop"
            className="text-link"
          >
            {t.home.viewAll}
            <ArrowRight size={18} />
          </Link>
        </div>

        {catalogue()}
      </section>

      <section className="section occasions">
        <Title
          title={t.home.occasionsTitle}
          sub={t.home.occasionsSub}
        />

        <div className="occasion-grid">
          {homeOccasions.map((occasion) => (
            <Link
              key={occasion.href}
              href={occasion.href}
            >
              <div className="occasion-media">
                <Art
                  source="shop"
                  box={occasion.box}
                  alt={tx(occasion.title)}
                />

                {/* The photo crop cuts the round icon in half; lay the
                    full icon over it so it overlaps onto the card. */}
                <Art
                  className="occasion-icon"
                  source="shop"
                  box={occasion.icon}
                  alt=""
                  style={iconPlacement(occasion.box, occasion.icon)}
                />
              </div>

              <div>
                <h3>{tx(occasion.title)}</h3>

                <p>{tx(occasion.description)}</p>

                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {<Story showJourneyLink={true} />}
      {<Benefits />}
      {<Business onEnquire={onEnquire} />}
      {<Business wholesale onEnquire={onEnquire} />}
      {<WholesaleReasons />}

      <section className="section">
        <Title
          eyebrow={t.home.communityEyebrow}
          title={t.home.communityTitle}
          sub={t.home.communitySub}
        />

        <div className="community">
          {communityImages.map(
            (image) => (
              <Art
                key={image.alt.en}
                source="community"
                box={image.box}
                alt={tx(image.alt)}
              />
            )
          )}
        </div>
      </section>
    </>
  );
}
