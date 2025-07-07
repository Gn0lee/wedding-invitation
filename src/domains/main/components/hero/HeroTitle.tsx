import clsx from 'clsx';
import React from 'react';

interface HeroTitleProps extends React.ComponentProps<'h2'> {
  children?: React.ReactNode;
}

export function HeroTitle({ children, className, ...props }: HeroTitleProps) {
  return (
    <h2
      className={clsx('font-bmJua text-5xl font-medium leading-tight tracking-wide', className)}
      {...props}
    >
      {children}
    </h2>
  );
}
