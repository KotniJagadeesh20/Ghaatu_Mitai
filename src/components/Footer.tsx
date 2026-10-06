/* =========================================================
   Site footer

   Extracted from app/storefront.tsx (Phase 3, extraction #11).
   Brand link, Quick Links (nav order), Customer Support
   buttons, Get in Touch lines, newsletter form (incl. its
   toast text), footer-bottom copy, class names, aria-labels
   and DOM order are unchanged.

   Not zero-prop: the Customer Support buttons and "Talk to us"
   open the EnquiryDialog via Storefront's `setEnquiry`. That
   is now the `onEnquire` prop, called with the exact same
   string arguments as before (same pattern as Business,
   BulkOrdersPage and WholesalePage). All state stays owned by
   Storefront. `toast` is the module-level sonner API; the
   <Toaster /> itself is still rendered by Storefront.
   ========================================================= */

import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

import { nav } from '../data/nav';
import { SUPPORT_TOPICS, type EnquiryKind } from '../data/enquiries';
import { useI18n } from '../i18n';
import { Art } from './Art';
import { Lines } from './Lines';

export interface FooterProps {
  onEnquire: (kind: EnquiryKind) => void;
}

export function Footer({ onEnquire }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link
            href="/"
            className="footer-brand"
          >
            <Art
              source="home"
              box={[66, 56, 139, 112]}
              alt={t.footer.logoAlt}
            />
          </Link>

          <p className="script">
            <Lines lines={t.footer.tagline} />
          </p>
        </div>

        <div>
          <h3>{t.footer.quickLinks}</h3>

          {nav.map(({ key, href }) => (
            <Link href={href} key={href}>
              {t.nav[key]}
            </Link>
          ))}
        </div>

        <div>
          <h3>{t.footer.support}</h3>

          {SUPPORT_TOPICS.map((topic) => (
            <button
              className="footer-support"
              key={topic}
              onClick={() => onEnquire(topic)}
            >
              {t.enquiry.kinds[topic]}
            </button>
          ))}
        </div>

        <div>
          <h3>{t.footer.getInTouch}</h3>

          <p className="contact-line">
            <MapPin size={16} />
            {t.footer.location}
          </p>

          <p className="contact-line">
            <Mail size={16} />
            hello@ghaatumitai.com
          </p>

          <button
            className="text-link"
            onClick={() =>
              onEnquire(
                'General enquiry'
              )
            }
          >
            {t.footer.talkToUs}
            <ArrowRight size={16} />
          </button>
        </div>

        <div>
          <h3>{t.footer.newsletterTitle}</h3>

          <p>
            <Lines lines={t.footer.newsletterText} />
          </p>

          <form
            className="newsletter"
            onSubmit={(event) => {
              event.preventDefault();

              toast.info(t.footer.newsletterToast);
            }}
          >
            <input
              type="email"
              aria-label={t.footer.newsletterEmailLabel}
              required
              placeholder={t.footer.newsletterPlaceholder}
            />

            <button
              className="btn"
              type="submit"
            >
              {t.footer.subscribe}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.footer.copyright(new Date().getFullYear())}</span>

        <span>{t.footer.madeWith}</span>
      </div>
    </footer>
  );
}
