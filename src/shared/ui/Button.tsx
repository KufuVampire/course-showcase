import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  iconOnly?: boolean;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:brightness-110 active:brightness-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  secondary:
    'bg-surface-sunken text-ink hover:brightness-105 active:brightness-95 hover:bg-border/40 active:bg-border/60 focus-visible:ring-2 focus-visible:ring-ink-muted focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  accent:
    'bg-accent text-on-accent hover:brightness-110 active:brightness-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  outline:
    'border border-border text-ink bg-transparent hover:brightness-105 hover:bg-surface-sunken active:brightness-95 active:bg-border/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ghost:
    'text-ink-muted hover:text-ink hover:brightness-105 hover:bg-surface-sunken active:brightness-95 active:bg-border/30 focus-visible:ring-2 focus-visible:ring-primary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-caption h-9 py-1.5 px-3 rounded-sm gap-1.5',
  md: 'text-body h-11 py-2 px-5 rounded-md gap-2 font-medium',
  lg: 'text-body h-12 py-3 px-7 rounded-md gap-2.5 font-semibold',
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'w-9 h-9 p-1.5 rounded-sm',
  md: 'w-11 h-11 p-2.5 rounded-md',
  lg: 'w-12 h-12 p-3 rounded-md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  iconOnly = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center transition-[filter,background-color,border-color,color] duration-fast cursor-pointer select-none outline-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed text-center';

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = props;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const {
    type = 'button',
    disabled,
    ...buttonRest
  } = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} disabled={disabled || isLoading} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
