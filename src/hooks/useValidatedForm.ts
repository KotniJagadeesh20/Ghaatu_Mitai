/* =========================================================
   useValidatedForm

   Small controlled-form helper shared by the Bulk quote and
   Wholesale enquiry forms (no form library needed for two
   forms). It owns values + "touched" state and returns:

   - field(name): spread onto an input/select/textarea
   - errorFor(name): the message to show, or undefined
   - handleSubmit(onValid): validates, focuses the first
     invalid control, and only calls onValid when clean

   Errors show once a field is blurred or after the first
   submit attempt - never while the user is still starting.
   ========================================================= */

import { useId, useState } from 'react';

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function useValidatedForm<
  T extends { [K in keyof T]: string },
  /** Whatever the validator returns: here, FormErrorCode. */
  E extends string = string,
>(initial: T, validate: (values: T) => Partial<Record<keyof T, E>>) {
  const uid = useId();
  const [values, setValues] = useState<T>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const idFor = (name: keyof T) => `${uid}-${String(name)}`;

  const errorFor = (name: keyof T): E | undefined =>
    submitted || touched[name] ? errors[name] : undefined;

  const field = (name: keyof T) => ({
    id: idFor(name),
    name: String(name),
    value: values[name],
    onChange: (e: React.ChangeEvent<Control>) =>
      setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    'aria-invalid': errorFor(name) ? true : undefined,
    'aria-describedby': errorFor(name) ? `${idFor(name)}-error` : undefined,
  });

  const handleSubmit =
    (onValid: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);

      const first = Object.keys(errors)[0];
      if (first) {
        e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      onValid(values);
    };

  const reset = () => {
    setValues(initial);
    setTouched({});
    setSubmitted(false);
  };

  return { values, setValues, field, errorFor, idFor, handleSubmit, reset };
}
