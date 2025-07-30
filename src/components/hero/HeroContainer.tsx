import React from 'react';
import { cn } from '@/lib/tw';

interface HeroContainerProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroContainer({ children, className, ...props }: HeroContainerProps) {
  return (
    <div className={cn('z-10 flex size-full flex-col px-4 py-6', className)} {...props}>
      {children}
    </div>
  );
}
