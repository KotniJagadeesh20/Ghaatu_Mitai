/* =========================================================
   Wholesale enquiry

   Same seam as lib/quoteRequest.ts: validation is pure, and
   submitEnquiry() is the only thing to replace once a real
   endpoint exists (e.g. Spring Boot POST /api/wholesale-enquiries).
   ========================================================= */

import { isEmail, isIndianMobile, messageLines, whatsappUrl } from './contact';
import type { FormErrorCode } from './formErrors';

export interface WholesaleEnquiry {
  businessName: string;
  businessType: string;
  city: string;
  volume: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof WholesaleEnquiry, FormErrorCode>>;

export const EMPTY_ENQUIRY: WholesaleEnquiry = {
  businessName: '',
  businessType: '',
  city: '',
  volume: '',
  name: '',
  phone: '',
  email: '',
  message: '',
};

export function validateEnquiry(e: WholesaleEnquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.businessName.trim().length < 2) errors.businessName = 'businessNameRequired';
  if (!e.businessType) errors.businessType = 'businessTypeRequired';
  if (e.city.trim().length < 2) errors.city = 'cityRequired';
  if (e.name.trim().length < 2) errors.name = 'nameRequired';
  if (!isIndianMobile(e.phone)) errors.phone = 'phoneInvalid';
  if (!e.email.trim()) errors.email = 'emailRequired';
  else if (!isEmail(e.email)) errors.email = 'emailInvalid';
  return errors;
}

export function enquiryMessage(e: WholesaleEnquiry) {
  return messageLines('Hello Ghaatu Mitai, I am interested in a wholesale partnership.', [
    ['Business', e.businessName],
    ['Type', e.businessType],
    ['City', e.city],
    ['Monthly volume', e.volume],
    ['Name', e.name],
    ['Phone', e.phone],
    ['Email', e.email],
    ['Details', e.message],
  ]);
}

export const WHOLESALE_WHATSAPP_URL = whatsappUrl(
  'Hello Ghaatu Mitai, I would like to know more about wholesale supply.'
);

export function submitEnquiry(e: WholesaleEnquiry): { redirectUrl: string } {
  return { redirectUrl: whatsappUrl(enquiryMessage(e)) };
}
