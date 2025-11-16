import React from 'react';
import { cn } from '@/lib/utils';

interface HeroContainerProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroContainer({ children, className, ...props }: HeroContainerProps) {
  return (
    <div className={cn('z-10 flex size-full flex-col px-4 pb-8 pt-2', className)} {...props}>
      {children}
    </div>
  );
}
