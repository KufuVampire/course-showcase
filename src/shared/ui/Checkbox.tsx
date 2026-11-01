import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check } from 'lucide-react';
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
  disabled,
  checked,
  defaultChecked,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id || `checkbox-${generatedId}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1 text-left">
      <label
        htmlFor={inputId}
        className={cn(
          'group flex items-start gap-2.5 cursor-pointer select-none',
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        )}
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            required={required}
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={Boolean(error)}
            aria-describedby={cn(errorId, hintId) || undefined}
            className="peer sr-only"
            {...rest}
          />
          <div
            className={cn(
              'w-4.5 h-4.5 rounded-sm border transition-[background-color,border-color,box-shadow] duration-fast flex items-center justify-center',
              // !checked: transparent background
              'bg-transparent border-border group-hover:border-ink-muted/80',
              // checked: accent primary fill
              'peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100',
              // keyboard a11y focus
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface',
              // error state
              error ? 'border-danger peer-checked:border-danger peer-checked:bg-danger' : '',
              className
            )}
          >
            <Check
              className="w-3.5 h-3.5 text-on-primary opacity-0 scale-75 transition-all duration-fast stroke-[3]"
              aria-hidden="true"
            />
          </div>
        </div>

        <span className="text-caption text-ink-muted leading-tight group-hover:text-ink transition-colors">
          {label}
          {required && (
            <span className="text-danger ml-1" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>

      {error ? (
        <span id={errorId} className="text-caption text-danger pl-7" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className="text-caption text-ink-muted pl-7">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
