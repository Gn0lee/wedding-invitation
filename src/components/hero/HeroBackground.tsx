import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import React from 'react';

type RequiredImageProps = Pick<ImageProps, 'src' | 'alt'> &
  Partial<Omit<ImageProps, 'src' | 'alt'>>;

interface HeroBackgroundProps {
  image: RequiredImageProps; // src, alt는 필수, 나머지는 선택
  container?: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactNode;
}

export function HeroBackground({
  image: { src, alt, ...rest },
  container,
  children,
}: HeroBackgroundProps) {
  return (
    <div {...container} className={clsx('absolute inset-0 z-0', container?.className)}>
      <Image src={src} alt={alt} {...rest} />
      {children}
    </div>
  );
}
