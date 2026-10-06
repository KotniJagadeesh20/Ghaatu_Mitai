/* =========================================================
   Enquiry kinds

   The value passed to onEnquire() / EnquiryDialog. Like
   categories, these English strings are canonical keys: the
   prepared enquiry text (sent to the business) uses them
   as-is, while the dialog title is translated via
   t.enquiry.kinds[kind].
   ========================================================= */

export const SUPPORT_TOPICS = [
  'Track Your Order',
  'Shipping & Delivery',
  'Returns & Refunds',
  'FAQs',
  'Terms & Conditions',
  'Privacy Policy',
] as const;

export type SupportTopic = (typeof SUPPORT_TOPICS)[number];

export type EnquiryKind =
  | 'Order summary'
  | 'General enquiry'
  | 'Retail partnership'
  | 'Bulk order'
  | 'WhatsApp bulk order'
  | SupportTopic;
