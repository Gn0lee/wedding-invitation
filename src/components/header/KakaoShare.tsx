'use client';

import { KakaoIcon } from '@/components/icons/kakao-icon';
import { Button } from '@/components/ui/button';

export function KakaoShare() {
  const handleKakaoShare = () => {
    // TODO: 카카오 공유하기 기능 구현
    console.log('카카오 공유하기 기능이 구현될 예정입니다.');
  };

  return (
    <Button
      onClick={handleKakaoShare}
      variant="ghost"
      size="icon"
      className="size-9 text-gray-50 hover:bg-white/10 hover:text-white [&_svg]:!size-6"
      aria-label="카카오 공유하기"
    >
      <KakaoIcon />
    </Button>
  );
}
