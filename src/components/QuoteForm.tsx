/* =========================================================
   Request a Quote form (Bulk Orders page)

   Form state/validation wiring: hooks/useValidatedForm.
   Business rules + submission: lib/quoteRequest.
   ========================================================= */

import { forwardRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { EVENT_TYPES, QUANTITY_OPTIONS } from '../data/bulk';
import { useValidatedForm } from '../hooks/useValidatedForm';
import {
  EMPTY_QUOTE,
  GENERAL_WHATSAPP_URL,
  submitQuote,
  todayISO,
  validateQuote,
} from '../lib/quoteRequest';
import { useI18n } from '../i18n';
import { FormField } from './FormField';
import { WhatsAppIcon } from './WhatsAppIcon';

export const QuoteForm = forwardRef<HTMLInputElement>(function QuoteForm(
  _props,
  firstFieldRef
) {
  const form = useValidatedForm(EMPTY_QUOTE, validateQuote);
  const { field, errorFor, idFor, values } = form;
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const { t } = useI18n();
  const err = (code?: keyof typeof t.form.errors) => code && t.form.errors[code];

  const onValid = () => {
    const { redirectUrl } = submitQuote(values);
    window.open(redirectUrl, '_blank', 'noopener');
    setSentUrl(redirectUrl);
  };

  if (sentUrl) {
    return (
      <div className="quote-success" role="status">
        <CheckCircle2 size={40} strokeWidth={1.5} />
        <h3>{t.form.thanks(values.name.trim().split(' ')[0])}</h3>
        <p>{t.quote.success}</p>
        <a className="btn" href={sentUrl} target="_blank" rel="noopener noreferrer">
          {t.form.openWhatsAppAgain}
        </a>
        <button
          type="button"
          className="quote-link"
          onClick={() => {
            form.reset();
            setSentUrl(null);
          }}
        >
          {t.quote.another}
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" noValidate onSubmit={form.handleSubmit(onValid)}>
      <div className="quote-grid">
        <FormField id={idFor('name')} label={t.form.fullName} required error={err(errorFor('name'))}>
          <input {...field('name')} ref={firstFieldRef} autoComplete="name" placeholder={t.form.namePlaceholder} />
        </FormField>

        <FormField id={idFor('phone')} label={t.form.phone} required error={err(errorFor('phone'))}>
          <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.form.phonePlaceholder} />
        </FormField>

        <FormField id={idFor('email')} label={t.form.email} wide error={err(errorFor('email'))}>
          <input {...field('email')} type="email" autoComplete="email" placeholder={t.form.emailPlaceholder} />
        </FormField>

        {/* value = canonical English key (goes to the business),
            text = translated label. Without an explicit value the
            browser would submit the Telugu text. */}
        <FormField id={idFor('eventType')} label={t.quote.eventType} required error={err(errorFor('eventType'))}>
          <select {...field('eventType')} className={values.eventType ? '' : 'placeholder'}>
            <option value="" disabled>{t.quote.eventTypePlaceholder}</option>
            {EVENT_TYPES.map((key) => (
              <option key={key} value={key}>{t.form.eventTypes[key]}</option>
            ))}
          </select>
        </FormField>

        <FormField id={idFor('date')} label={t.quote.date} required error={err(errorFor('date'))}>
          <input {...field('date')} type="date" min={todayISO()} />
        </FormField>

        <FormField id={idFor('quantity')} label={t.quote.quantity} required wide error={err(errorFor('quantity'))}>
          <select {...field('quantity')} className={values.quantity ? '' : 'placeholder'}>
            <option value="" disabled>{t.quote.quantityPlaceholder}</option>
            {QUANTITY_OPTIONS.map((key) => (
              <option key={key} value={key}>{t.form.quantities[key]}</option>
            ))}
          </select>
        </FormField>

        <FormField id={idFor('message')} label={t.form.message} wide>
          <textarea {...field('message')} rows={2} maxLength={1000} placeholder={t.form.messagePlaceholder} />
        </FormField>
      </div>

      <button className="btn quote-submit" type="submit">
        {t.quote.submit} <ArrowRight size={17} />
      </button>

      <p className="quote-or"><span>{t.quote.or}</span></p>

      <a className="btn wa-btn" href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        {t.quote.whatsapp}
      </a>

      <p className="quote-note">{t.quote.note}</p>
    </form>
  );
});
