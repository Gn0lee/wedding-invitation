import { ReactNode } from 'react';
import { cn } from '@/lib/tw';

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function HeroSection({ children, className, ...props }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative mx-auto flex aspect-[375/667] h-screen max-w-[100vw] snap-start pt-[72px] text-gray-50',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
