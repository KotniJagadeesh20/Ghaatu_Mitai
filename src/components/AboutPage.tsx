/* =========================================================
   About page

   Extracted from app/storefront.tsx (Phase 13.4).
   JSX, markup, class names, text and ordering are unchanged.
   One substitution only:

   - `showJourneyLink={(page as string) === 'home'}` became
     `showJourneyLink={false}`: the branch only rendered when
     `page === 'about'`, so the expression was always false.

   Reads no Storefront state and takes no props.
   ========================================================= */

import { useI18n } from '../i18n';
import { Benefits } from './Benefits';
import { Story } from './Story';

export function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      {<Story showJourneyLink={false} />}
      {<Benefits />}

      <div className="quote">
        {t.about.quote}

        <small>{t.about.quoteSmall}</small>
      </div>
    </>
  );
}
