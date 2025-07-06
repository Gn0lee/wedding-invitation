import clsx from 'clsx';
import React from 'react';

interface HeroTitleProps extends React.ComponentProps<'h2'> {
  children?: React.ReactNode;
}

export function HeroTitle({ children, className, ...props }: HeroTitleProps) {
  return (
    <h2 className={clsx('font-bmJua text-4xl font-medium leading-snug', className)} {...props}>
      {children}
    </h2>
  );
}
