import clsx from 'clsx';
import { ReactNode } from 'react';

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function HeroSection({ children, className, ...props }: HeroSectionProps) {
  return (
    <section
      className={clsx(
        'relative mx-auto flex aspect-[375/667] h-screen max-w-[100vw] snap-start pt-[72px] text-gray-50 md:pt-[88px] lg:pt-[104px]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
