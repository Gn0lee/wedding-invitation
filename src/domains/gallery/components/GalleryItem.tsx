'use client';

import { motion } from 'framer-motion';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GallerySkeleton } from '@/domains/gallery/components/GallerySkeleton';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types/items';
import { galleryModalOpenAtom, galleryModalInitialIndexAtom } from '@/stores/galleryModal';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
}

export function GalleryItem({ item, index }: GalleryItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const setModalOpen = useSetAtom(galleryModalOpenAtom);
  const setModalInitialIndex = useSetAtom(galleryModalInitialIndexAtom);

  const handleClick = () => {
    setModalInitialIndex(index);
    setModalOpen(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // 에러가 나도 스켈레톤은 사라지게
  };

  return (
    <motion.div
      className="w-full cursor-pointer overflow-hidden rounded-lg"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      layoutId={`gallery-item-${item.id}`}
    >
      <AspectRatio ratio={item.width / item.height} className="relative w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 size-full">
            <GallerySkeleton />
          </div>
        )}
        <Image
          src={item.src}
          alt={item.name}
          width={item.width}
          height={item.height}
          priority={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </AspectRatio>
    </motion.div>
  );
}
