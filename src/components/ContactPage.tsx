/* =========================================================
   Contact page

   Extracted from app/storefront.tsx (Phase 3, extraction #12).
   The `page === 'contact'` branch's JSX - Title props, contact
   card, copy, class names and DOM order - is unchanged. The
   original read Storefront's `setEnquiry` directly; that is now
   the `onEnquire` prop, called with the exact same string
   argument ('General enquiry'). All state stays owned by
   Storefront.

   Imports are limited to what this JSX actually uses (Title,
   Mail, ArrowRight). Art, Link, MapPin, Clock and Phone are not
   referenced by the contact branch, so importing them would
   only add unused-import warnings. The address/email lines live
   in Footer, and the "Closing" band is shared by every route
   (it stays in Storefront, outside <main>).
   ========================================================= */

import { ArrowRight, Mail } from 'lucide-react';

import type { EnquiryKind } from '../data/enquiries';
import { useI18n } from '../i18n';
import { Title } from './Title';

export interface ContactPageProps {
  onEnquire: (kind: EnquiryKind) => void;
}

export function ContactPage({ onEnquire }: ContactPageProps) {
  const { t } = useI18n();

  return (
    <section className="section contact">
      <Title
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        sub={t.contact.sub}
      />

      <div className="contact-card">
        <Mail size={35} />

        <h3>{t.contact.cardTitle}</h3>

        <p>{t.contact.cardText}</p>

        <button
          className="btn"
          onClick={() =>
            onEnquire(
              'General enquiry'
            )
          }
        >
          {t.contact.write}
          <ArrowRight size={17} />
        </button>

        <small>{t.contact.note}</small>
      </div>
    </section>
  );
}
