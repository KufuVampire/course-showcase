import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:opacity-90 active:opacity-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  secondary:
    'bg-surface-sunken text-ink hover:bg-border/40 active:bg-border/60 focus-visible:ring-2 focus-visible:ring-ink-muted focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  accent:
    'bg-accent text-on-accent hover:opacity-90 active:opacity-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  outline:
    'border border-border text-ink bg-transparent hover:bg-surface-sunken active:bg-border/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ghost:
    'text-ink-muted hover:text-ink hover:bg-surface-sunken active:bg-border/30 focus-visible:ring-2 focus-visible:ring-primary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-caption py-1.5 px-3 rounded-sm gap-1.5',
  md: 'text-body py-2.5 px-5 rounded-md gap-2 font-medium',
  lg: 'text-body py-3.5 px-7 rounded-md gap-2.5 font-semibold text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all cursor-pointer select-none outline-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...rest}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
