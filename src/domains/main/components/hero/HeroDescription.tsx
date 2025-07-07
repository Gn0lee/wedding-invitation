import clsx from 'clsx';
import React from 'react';

interface HeroDescriptionProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroDescription({ children, className, ...props }: HeroDescriptionProps) {
  return (
    <div
      className={clsx('mt-8 space-y-1 text-sm font-light leading-snug tracking-wide', className)}
      {...props}
    >
      {children}
    </div>
  );
}
