'use client';

import { LogoutButton } from '@/components/header/LogoutButton';
import { ShareDialog } from '@/components/header/ShareDialog';

interface HeaderProps {
  leftChildren?: React.ReactNode;
}

export function Header({ leftChildren }: HeaderProps) {
  return (
    <header className="fixed top-0 z-10 size-full h-[72px] px-4 py-6">
      <div className="flex h-full items-center justify-center">
        <div className="container m-auto flex h-full max-w-[calc(100vh*375/667-32px)] items-center justify-between">
          {leftChildren}
          <div className="flex items-center space-x-4">
            <ShareDialog />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
