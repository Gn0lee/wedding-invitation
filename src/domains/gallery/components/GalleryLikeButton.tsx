'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { KakaoLoginButton } from '@/components/KakaoLoginButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGalleryLike } from '@/domains/gallery/hooks/useGalleryLike';
import { useAuth } from '@/hooks/useAuth';

interface GalleryLikeButtonProps {
  imageId: string;
  index: number; // 이미지의 인덱스
  shouldLoad?: boolean; // Intersection Observer로 결정된 로딩 여부
}

export function GalleryLikeButton({ imageId, index, shouldLoad = false }: GalleryLikeButtonProps) {
  const { user } = useAuth();
  const { data, toggleLike, isMutating } = useGalleryLike(imageId, index, shouldLoad);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleClick = async () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    await toggleLike();
  };

  return (
    <>
      <div className="absolute bottom-3 right-4 flex min-w-8 flex-col items-center gap-1 rounded-full bg-gray-700/20 p-2 text-white backdrop-blur-sm">
        {data ? (
          <button disabled={isMutating} onClick={handleClick}>
            <Heart
              size={16}
              className={`${
                data?.isLikedByUser ? 'fill-red-500 text-red-500' : 'fill-transparent stroke-white'
              } transition-colors duration-200`}
            />
          </button>
        ) : (
          <div className="min-h-4" />
        )}
        <span className="min-h-4 text-xs font-medium">{data?.likes}</span>
      </div>

      {/* 로그인 유도 다이얼로그 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>로그인이 필요합니다</DialogTitle>
            <DialogDescription className="text-gray-300/80">
              마음에 드는 사진에 좋아요를 남겨보세요!
            </DialogDescription>
          </DialogHeader>
          <KakaoLoginButton
            buttonProps={{ className: 'w-full text-kakao-text bg-kakao hover:bg-kakao/80' }}
            innerText="카카오로 로그인"
            next="/gallery"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
