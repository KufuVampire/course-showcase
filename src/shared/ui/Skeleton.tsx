import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  className = '',
  ...rest
}) => {
  const variantStyles = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-sm h-4 my-1',
  };

  return (
    <div
      className={`bg-border/60 animate-pulse ${variantStyles[variant]} ${className}`}
      aria-hidden="true"
      {...rest}
    />
  );
};
