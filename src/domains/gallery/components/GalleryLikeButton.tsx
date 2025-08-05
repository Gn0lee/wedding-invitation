'use client';

import { Heart } from 'lucide-react';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types';

interface GalleryLikeButtonProps {
  item: GalleryItemType;
}

export function GalleryLikeButton({ item }: GalleryLikeButtonProps) {
  return (
    <div className="absolute bottom-3 right-4 flex flex-col items-center gap-1 rounded-full bg-gray-700/20 p-2 text-white backdrop-blur-sm">
      <Heart
        size={16}
        className={`${
          item.isLikedByUser ? 'fill-red-500 text-red-500' : 'fill-transparent stroke-white'
        } cursor-pointer`}
      />
      <span className="text-xs font-medium">{item.likes}</span>
    </div>
  );
}
