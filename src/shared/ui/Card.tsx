import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type CardVariant = 'raised' | 'sunken' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  as?: 'div' | 'article' | 'section';
  children?: ReactNode;
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

export function Card({
  variant = 'raised',
  padding = 'md',
  hoverable = false,
  as: Component = 'div',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg transition-[border-color,box-shadow] duration-fast',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable ? 'hover:shadow-pop hover:border-primary/40' : '',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
