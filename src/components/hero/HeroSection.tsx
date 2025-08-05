import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function HeroSection({ children, className, ...props }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex w-svw h-svh max-w snap-start pt-[72px] text-gray-50 md:max-w-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
