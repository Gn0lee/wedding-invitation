'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function LogoutButton() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button
      onClick={signOut}
      variant="ghost"
      size="icon"
      className="size-9 text-gray-50 hover:bg-white/10 hover:text-white [&_svg]:!size-6"
      aria-label="로그아웃"
    >
      <LogOut />
    </Button>
  );
}
