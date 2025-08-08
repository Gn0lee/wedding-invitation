'use client';

import { LogoutButton } from '@/components/header/LogoutButton';
import { ShareDialog } from '@/components/header/ShareDialog';
import { VideoControlPopover } from '@/components/header/VideoControlPopover';

interface HeaderProps {
  leftChildren?: React.ReactNode;
}

export function Header({ leftChildren }: HeaderProps) {
  return (
    <header className="fixed top-0 z-10 size-full h-[72px] px-4 py-6 md:px-0">
      <div className="flex h-full items-center justify-center">
        <div className="m-auto flex size-full items-center justify-between px-0 md:max-w-2xl md:px-4">
          {leftChildren}
          <div className="flex items-center space-x-4">
            <VideoControlPopover />
            <ShareDialog />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
