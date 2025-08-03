'use client';

import { KakaoIcon } from '@/components/icons/kakao-icon';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

export function KakaoShare() {
  const handleKakaoShare = () => {
    // TODO: 카카오 공유하기 기능 구현
    console.log('카카오 공유하기 기능이 구현될 예정입니다.');
  };

  return (
    <DialogClose asChild>
      <Button
        onClick={handleKakaoShare}
        variant="outline"
        className="w-full justify-center gap-3 border-none bg-kakao text-kakao-text hover:bg-kakao/80 "
        aria-label="카카오 공유하기"
      >
        <KakaoIcon className="size-5" />
        카카오톡 공유하기
      </Button>
    </DialogClose>
  );
}
