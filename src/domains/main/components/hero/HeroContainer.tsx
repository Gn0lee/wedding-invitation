import clsx from 'clsx';
import React from 'react';

interface HeroContainerProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export function HeroContainer({ children, className, ...props }: HeroContainerProps) {
  return (
    <div
      className={clsx(
        'container z-10 m-auto flex flex-col px-4 pt-6 lg:flex-row lg:justify-around',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
