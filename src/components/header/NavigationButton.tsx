'use client';

import { useSetAtom } from 'jotai';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigationDrawerOpenAtom } from '@/stores/navigation';

export function NavigationButton() {
  const setDrawerOpen = useSetAtom(navigationDrawerOpenAtom);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 text-gray-50 hover:bg-white/10 hover:text-white [&_svg]:!size-6"
      aria-label="메뉴 열기"
      onClick={() => setDrawerOpen(true)}
    >
      <Menu />
    </Button>
  );
}
