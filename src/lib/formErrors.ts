/* =========================================================
   Form error codes

   Validators return CODES, not sentences. The UI translates
   a code with t.form.errors[code]. This keeps lib/ free of
   UI language, keeps validators unit-testable without i18n,
   and means one rule can't drift between English and Telugu
   wording. (Same idea as returning an error code from a
   Spring Boot API and letting the client localise it.)
   ========================================================= */

export const FORM_ERROR_CODES = [
  'nameRequired',
  'phoneInvalid',
  'emailInvalid',
  'emailRequired',
  'eventTypeRequired',
  'dateRequired',
  'datePast',
  'quantityRequired',
  'businessNameRequired',
  'businessTypeRequired',
  'cityRequired',
] as const;

export type FormErrorCode = (typeof FORM_ERROR_CODES)[number];
