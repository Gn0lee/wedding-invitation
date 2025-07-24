import clsx from 'clsx';
import React from 'react';

interface HeroTextColumnProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroTextColumn({ children, className, ...props }: HeroTextColumnProps) {
  return (
    <div className={clsx('flex w-full shrink flex-col text-left', className)} {...props}>
      {children}
    </div>
  );
}
