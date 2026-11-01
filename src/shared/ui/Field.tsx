import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, leftElement, rightElement, id, className = '', ...rest }, ref) => {
    const inputId = id || (label ? `field-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-caption font-medium text-ink select-none">
            {label}
            {rest.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3.5 text-ink-muted pointer-events-none flex items-center">
              {leftElement}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-surface-raised border rounded-md text-body text-ink placeholder:text-ink-muted/60 transition-colors py-2.5 px-3.5 outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              leftElement ? 'pl-10' : ''
            } ${rightElement ? 'pr-10' : ''} ${
              error ? 'border-danger focus:ring-danger' : 'border-border'
            } ${className}`}
            {...rest}
          />

          {rightElement && (
            <div className="absolute right-3.5 text-ink-muted flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-caption text-danger" role="alert">
            {error}
          </span>
        ) : hint ? (
          <span className="text-caption text-ink-muted">{hint}</span>
        ) : null}
      </div>
    );
  }
);

Field.displayName = 'Field';
