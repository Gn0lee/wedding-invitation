import React from 'react';
import { cn } from '@/lib/utils';

interface HeroTextColumnProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroTextColumn({ children, className, ...props }: HeroTextColumnProps) {
  return (
    <div className={cn('flex w-full shrink flex-col text-left', className)} {...props}>
      {children}
    </div>
  );
}
