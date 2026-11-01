import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
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
          aria-describedby={cn(errorId, hintId) || undefined}
          className={cn(
            'mt-0.5 h-4 w-4 rounded-sm border-border accent-primary cursor-pointer transition-colors shrink-0',
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
