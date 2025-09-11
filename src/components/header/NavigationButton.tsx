'use client';

import { useSetAtom } from 'jotai';
import { Menu } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navigationDrawerOpenAtom } from '@/stores/navigation';

type NavigationButtonProps = Omit<
  ButtonProps,
  'children' | 'variant' | 'size' | 'aria-label' | 'onClick'
>;

export function NavigationButton({ className, ...props }: NavigationButtonProps) {
  const setDrawerOpen = useSetAtom(navigationDrawerOpenAtom);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'size-9 text-gray-50 backdrop-blur-md hover:bg-white/10 hover:text-white [&_svg]:!size-6',
        className,
      )}
      aria-label="메뉴 열기"
      onClick={() => setDrawerOpen(true)}
      {...props}
    >
      <Menu />
    </Button>
  );
}
