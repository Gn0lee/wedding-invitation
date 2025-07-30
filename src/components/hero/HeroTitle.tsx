import React from 'react';
import { cn } from '@/lib/tw';

interface HeroTitleProps extends React.ComponentProps<'h2'> {
  children?: React.ReactNode;
}

export function HeroTitle({ children, className, ...props }: HeroTitleProps) {
  return (
    <h2
      className={cn('font-bmJua text-5xl font-medium leading-tight tracking-wide', className)}
      {...props}
    >
      {children}
    </h2>
  );
}
