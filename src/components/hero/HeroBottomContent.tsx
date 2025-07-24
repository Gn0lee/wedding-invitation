import clsx from 'clsx';
import React from 'react';

interface HeroBottomContentProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroBottomContent({ children, className, ...props }: HeroBottomContentProps) {
  return (
    <div className={clsx('w-full flex-1 pt-4', className)} {...props}>
      {children}
    </div>
  );
}
