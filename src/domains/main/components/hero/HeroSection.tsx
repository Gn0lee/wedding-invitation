import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function HeroSection({
  children,
  className,

  ...props
}: SectionProps) {
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
