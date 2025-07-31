import React from 'react';
import { cn } from '@/lib/utils';

interface HeroBottomContentProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroBottomContent({ children, className, ...props }: HeroBottomContentProps) {
  return (
    <div className={cn('w-full flex-1 pt-4', className)} {...props}>
      {children}
    </div>
  );
}
