/* Label + control + error message, wired for screen readers.
   The control itself is passed as children so each form keeps
   full control over input types and attributes. */

import { useI18n } from '../i18n';

export function FormField({
  id,
  label,
  required = false,
  error,
  wide = false,
  optionalHint = true,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  wide?: boolean;
  /** Append "(Optional)" to non-required labels. */
  optionalHint?: boolean;
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <div className={'quote-field' + (wide ? ' wide' : '')}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            {' '}*
          </span>
        ) : optionalHint ? (
          ` ${t.form.optional}`
        ) : null}
      </label>
      {children}
      {error && (
        <small className="field-error" id={`${id}-error`}>
          {error}
        </small>
      )}
    </div>
  );
}
