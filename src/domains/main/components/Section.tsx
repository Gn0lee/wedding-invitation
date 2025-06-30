import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: string; // tailwind 배경색 클래스명 (예: 'bg-blue-100')
  textColor?: string; // tailwind 텍스트색 클래스명 (예: 'text-blue-900')
}

export function Section({
  children,
  className,
  bgColor = '',
  textColor = '',
  ...props
}: SectionProps) {
  return (
    <section
      className={clsx(
        'flex h-full snap-start items-center justify-center pt-[48px] md:pt-[64px] lg:pt-[80px]',
        bgColor,
        textColor,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
