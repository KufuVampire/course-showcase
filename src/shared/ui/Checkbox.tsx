import { useId, type InputHTMLAttributes } from 'react';
import { cx } from '@/shared/lib/cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
}

export function Checkbox({
  label,
  error,
  hint,
  id,
  className = '',
  required,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id || `checkbox-${generatedId}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1 text-left">
      <label htmlFor={inputId} className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          id={inputId}
          type="checkbox"
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={cx(errorId, hintId) || undefined}
          className={cx(
            'mt-0.5 h-4 w-4 rounded-sm border-border accent-primary cursor-pointer transition-colors',
            className
          )}
          {...rest}
        />
        <span className="text-caption text-ink-muted leading-tight">
          {label}
          {required && (
            <span className="text-danger ml-1" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>

      {error ? (
        <span id={errorId} className="text-caption text-danger pl-6.5" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className="text-caption text-ink-muted pl-6.5">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
