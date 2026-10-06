/* =========================================================
   Contact helpers shared by every enquiry form.
   ========================================================= */

import { WHATSAPP_NUMBER } from '../config/business';

/** Accepts 98765 43210, +91 98765-43210, 09876543210 ... */
export function normalisePhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

export function isIndianMobile(phone: string) {
  return /^[6-9]\d{9}$/.test(normalisePhone(phone));
}

export function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Joins "Label: value" lines, dropping empty optional values. */
export function messageLines(intro: string, fields: [string, string][]) {
  return [
    intro,
    '',
    ...fields
      .filter(([, value]) => value.trim())
      .map(([label, value]) => `${label}: ${value.trim()}`),
  ].join('\n');
}
