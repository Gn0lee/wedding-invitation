'use client';

import { LogOut } from 'lucide-react';
import { ExternalLink } from '@/components/header/ExternalLink';
import { KakaoShare } from '@/components/header/KakaoShare';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  leftChildren?: React.ReactNode;
}

export function Header({ leftChildren }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10  size-full h-[72px] px-4 py-6">
      <div className="container m-auto flex h-full items-center justify-between">
        {leftChildren}
        <div className="flex items-center space-x-4">
          <ExternalLink />
          <KakaoShare />
          {user && (
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-200"
            >
              <LogOut className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
