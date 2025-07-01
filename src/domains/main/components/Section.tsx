import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({
  children,
  className,

  ...props
}: SectionProps) {
  return (
    <section
      className={clsx(
        'flex h-full snap-start items-center justify-center pt-[72px] md:pt-[88px] lg:pt-[104px]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
