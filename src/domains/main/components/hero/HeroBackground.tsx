import Image from 'next/image';
import clsx from 'clsx';
import React from 'react';

interface HeroBackgroundProps extends React.ComponentProps<'div'> {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export function HeroBackground({ src, alt, className, children, ...props }: HeroBackgroundProps) {
  return (
    <div className={clsx('absolute inset-0 z-0', className)} {...props}>
      <Image src={src} alt={alt} fill />
      {children}
    </div>
  );
}
