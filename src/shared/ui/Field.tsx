import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '@/shared/lib/cx';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export function Field({
  label,
  error,
  hint,
  leftElement,
  rightElement,
  id,
  className = '',
  required,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const inputId = id || (label ? `field-${generatedId}` : undefined);
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-caption font-medium text-ink select-none">
          {label}
          {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftElement && (
          <div className="absolute left-3.5 text-ink-muted pointer-events-none flex items-center">
            {leftElement}
          </div>
        )}

        <input
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={cx(errorId, hintId) || undefined}
          className={cx(
            'w-full bg-surface-raised border rounded-md text-body text-ink placeholder:text-ink-muted/60 transition-colors py-2.5 px-3.5 outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed',
            leftElement ? 'pl-10' : '',
            rightElement ? 'pr-10' : '',
            error ? 'border-danger focus:ring-danger' : 'border-border',
            className
          )}
          {...rest}
        />

        {rightElement && (
          <div className="absolute right-3.5 text-ink-muted flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <span id={errorId} className="text-caption text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className="text-caption text-ink-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
