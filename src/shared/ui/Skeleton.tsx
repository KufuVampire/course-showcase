import type { HTMLAttributes } from 'react';
import { cx } from '@/shared/lib/cx';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export function Skeleton({ variant = 'rectangular', className = '', ...rest }: SkeletonProps) {
  const variantStyles = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm h-4 my-1',
  };

  return (
    <div
      {...rest}
      aria-hidden="true"
      className={cx('bg-border/60 animate-pulse', variantStyles[variant], className)}
    />
  );
}
