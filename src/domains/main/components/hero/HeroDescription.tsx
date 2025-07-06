import clsx from 'clsx';
import React from 'react';

interface HeroDescriptionProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroDescription({ children, className, ...props }: HeroDescriptionProps) {
  return (
    <div className={clsx('mt-4 space-y-1 text-sm md:text-base', className)} {...props}>
      {children}
    </div>
  );
}
