/* =========================================================
   Enquire About Wholesale form

   Same building blocks as the Bulk quote form:
   hooks/useValidatedForm + FormField + lib/wholesaleEnquiry.
   `presetType` lets page CTAs ("Become a Retail Partner")
   pre-select the business type.
   ========================================================= */

import { forwardRef, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { BUSINESS_TYPES, MONTHLY_VOLUMES } from '../data/wholesale';
import { useValidatedForm } from '../hooks/useValidatedForm';
import {
  EMPTY_ENQUIRY,
  WHOLESALE_WHATSAPP_URL,
  submitEnquiry,
  validateEnquiry,
} from '../lib/wholesaleEnquiry';
import { useI18n } from '../i18n';
import { FormField } from './FormField';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WholesaleEnquiryForm = forwardRef<
  HTMLInputElement,
  { presetType?: string }
>(function WholesaleEnquiryForm({ presetType }, firstFieldRef) {
  const form = useValidatedForm(EMPTY_ENQUIRY, validateEnquiry);
  const { field, errorFor, idFor, values, setValues } = form;
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const { t } = useI18n();
  const w = t.wholesaleForm;
  const err = (code?: keyof typeof t.form.errors) => code && t.form.errors[code];

  // Apply a CTA's preset without overwriting a choice the
  // user already made.
  useEffect(() => {
    if (!presetType) return;
    setValues((v) => (v.businessType ? v : { ...v, businessType: presetType }));
  }, [presetType, setValues]);

  const onValid = () => {
    const { redirectUrl } = submitEnquiry(values);
    window.open(redirectUrl, '_blank', 'noopener');
    setSentUrl(redirectUrl);
  };

  if (sentUrl) {
    return (
      <div className="quote-success" role="status">
        <CheckCircle2 size={40} strokeWidth={1.5} />
        <h3>{t.form.thanks(values.name.trim().split(' ')[0])}</h3>
        <p>{w.success(values.businessName.trim())}</p>
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
          {w.another}
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" noValidate onSubmit={form.handleSubmit(onValid)}>
      <div className="quote-grid">
        <FormField id={idFor('businessName')} label={w.businessName} required error={err(errorFor('businessName'))}>
          <input {...field('businessName')} ref={firstFieldRef} autoComplete="organization" placeholder={w.businessNamePlaceholder} />
        </FormField>

        {/* value = canonical English key, text = translated label. */}
        <FormField id={idFor('businessType')} label={w.businessType} required error={err(errorFor('businessType'))}>
          <select {...field('businessType')} className={values.businessType ? '' : 'placeholder'}>
            <option value="" disabled>{w.businessTypePlaceholder}</option>
            {BUSINESS_TYPES.map((key) => (
              <option key={key} value={key}>{t.form.businessTypes[key]}</option>
            ))}
          </select>
        </FormField>

        <FormField id={idFor('city')} label={w.city} required error={err(errorFor('city'))}>
          <input {...field('city')} autoComplete="address-level2" placeholder={w.cityPlaceholder} />
        </FormField>

        <FormField id={idFor('volume')} label={w.volume} optionalHint={false}>
          <select {...field('volume')} className={values.volume ? '' : 'placeholder'}>
            <option value="">{w.volumePlaceholder}</option>
            {MONTHLY_VOLUMES.map((key) => (
              <option key={key} value={key}>{t.form.volumes[key]}</option>
            ))}
          </select>
        </FormField>

        <FormField id={idFor('name')} label={t.form.name} required error={err(errorFor('name'))}>
          <input {...field('name')} autoComplete="name" placeholder={t.form.namePlaceholder} />
        </FormField>

        <FormField id={idFor('phone')} label={t.form.phone} required error={err(errorFor('phone'))}>
          <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.form.phonePlaceholder} />
        </FormField>

        <FormField id={idFor('email')} label={t.form.email} required error={err(errorFor('email'))}>
          <input {...field('email')} type="email" autoComplete="email" placeholder={t.form.emailPlaceholder} />
        </FormField>

        <FormField id={idFor('message')} label={t.form.message}>
          <textarea {...field('message')} rows={2} maxLength={1000} placeholder={t.form.messagePlaceholder} />
        </FormField>
      </div>

      <button className="btn quote-submit" type="submit">
        {w.submit} <ArrowRight size={17} />
      </button>

      <a className="ws-wa-link" href={WHOLESALE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        {w.whatsapp}
      </a>
    </form>
  );
});
