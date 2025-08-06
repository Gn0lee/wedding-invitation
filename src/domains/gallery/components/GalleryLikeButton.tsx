'use client';

import { Heart } from 'lucide-react';
import { useGalleryLike } from '@/domains/gallery/hooks/useGalleryLike';

interface GalleryLikeButtonProps {
  imageId: string;
  isSelected?: boolean; // 선택된 이미지인지 여부
}

export function GalleryLikeButton({ imageId, isSelected = false }: GalleryLikeButtonProps) {
  const { data, isLoading, toggleLike } = useGalleryLike(imageId, isSelected);

  const handleClick = async () => {
    await toggleLike();
  };

  // 로딩 중이거나 데이터가 없으면 기본 상태 표시
  if (isLoading || !data) {
    return (
      <div className="absolute bottom-3 right-4 flex flex-col items-center gap-1 rounded-full bg-gray-700/20 p-2 text-white backdrop-blur-sm">
        <Heart size={16} className="fill-transparent stroke-white" />
        <span className="text-xs font-medium">0</span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-3 right-4 flex flex-col items-center gap-1 rounded-full bg-gray-700/20 p-2 text-white backdrop-blur-sm">
      <Heart
        size={16}
        className={`${
          data.isLikedByUser ? 'fill-red-500 text-red-500' : 'fill-transparent stroke-white'
        } cursor-pointer transition-colors duration-200`}
        onClick={handleClick}
      />
      <span className="text-xs font-medium">{data.likes}</span>
    </div>
  );
}
