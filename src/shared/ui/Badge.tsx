import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'accent'
  | 'consult'
  | 'success'
  | 'warning'
  | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-sunken text-ink-muted border border-border',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  accent: 'bg-accent/15 text-ink border border-accent/30',
  consult: 'bg-type-consult/15 text-type-consult border border-type-consult/30',
  success: 'bg-success/15 text-success border border-success/30',
  warning: 'bg-warning/15 text-warning border border-warning/30',
  danger: 'bg-danger/15 text-danger border border-danger/30',
};

const sizeStyles = {
  sm: 'text-caption py-0.5 px-2 rounded-sm font-medium',
  md: 'text-caption py-1 px-3 rounded-md font-medium',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 leading-none tracking-normal ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};
