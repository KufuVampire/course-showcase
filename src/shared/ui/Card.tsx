import React from 'react';

export type CardVariant = 'raised' | 'sunken' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  raised: 'bg-surface-raised border border-border shadow-card',
  sunken: 'bg-surface-sunken border border-border/80',
  outlined: 'bg-transparent border border-border',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  variant = 'raised',
  padding = 'md',
  hoverable = false,
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      className={`rounded-lg transition-all ${variantStyles[variant]} ${paddingStyles[padding]} ${
        hoverable ? 'hover:shadow-pop hover:border-primary/40' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
