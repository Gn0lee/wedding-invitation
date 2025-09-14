import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative mx-auto flex w-svw min-h-dvh pt-[72px] text-gray-50 md:max-w-2xl',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

HeroSection.displayName = 'HeroSection';
