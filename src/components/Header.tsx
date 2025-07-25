import { ExternalLink } from '@/components/header/ExternalLink';
import { KakaoShare } from '@/components/header/KakaoShare';

interface HeaderProps {
  leftChildren?: React.ReactNode;
}

export function Header({ leftChildren }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10  size-full h-[72px] px-6 py-4 md:h-[88px] md:px-12 lg:h-[104px] lg:px-16">
      <div className="container m-auto flex h-full items-center justify-between">
        {leftChildren}
        <div className="flex items-center space-x-4">
          <ExternalLink />
          <KakaoShare />
        </div>
      </div>
    </header>
  );
}
