/* =========================================================
   Bulk quote request

   Validation and submission for the "Request a Quote" form,
   kept outside React so it can be unit tested.

   There is no backend yet, so a valid request is handed off
   to WhatsApp with every detail pre-filled. When an API
   exists (e.g. a Spring Boot `POST /api/quote-requests`),
   replace the body of submitQuote() - the form won't change.

   The WhatsApp message stays English in every UI language:
   select values are canonical English keys (data/bulk.ts),
   only their visible labels are translated.
   ========================================================= */

import { isEmail, isIndianMobile, messageLines, whatsappUrl } from './contact';
import type { FormErrorCode } from './formErrors';

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  quantity: string;
  message: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteRequest, FormErrorCode>>;

export const EMPTY_QUOTE: QuoteRequest = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  quantity: '',
  message: '',
};

/** yyyy-mm-dd for today in the user's timezone (what <input type=date> uses). */
export function todayISO(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function validateQuote(q: QuoteRequest, today = todayISO()): QuoteErrors {
  const errors: QuoteErrors = {};

  if (q.name.trim().length < 2) errors.name = 'nameRequired';
  if (!isIndianMobile(q.phone)) errors.phone = 'phoneInvalid';
  if (q.email.trim() && !isEmail(q.email)) errors.email = 'emailInvalid';
  if (!q.eventType) errors.eventType = 'eventTypeRequired';
  if (!q.date) errors.date = 'dateRequired';
  else if (q.date < today) errors.date = 'datePast';
  if (!q.quantity) errors.quantity = 'quantityRequired';

  return errors;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

export function quoteMessage(q: QuoteRequest) {
  return messageLines('Hello Ghaatu Mitai, I would like a quote for a bulk order.', [
    ['Name', q.name],
    ['Phone', q.phone],
    ['Email', q.email],
    ['Event', q.eventType],
    ['Date', q.date ? formatDate(q.date) : ''],
    ['Quantity', q.quantity],
    ['Details', q.message],
  ]);
}

export const GENERAL_WHATSAPP_URL = whatsappUrl(
  'Hello Ghaatu Mitai, I would like to know more about bulk orders.'
);

/** The single submission seam - swap for an API call later. */
export function submitQuote(q: QuoteRequest): { redirectUrl: string } {
  return { redirectUrl: whatsappUrl(quoteMessage(q)) };
}
