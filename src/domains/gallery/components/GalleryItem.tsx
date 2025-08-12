'use client';

import { motion } from 'framer-motion';
import { useSetAtom } from 'jotai';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types/items';
import { galleryModalOpenAtom, galleryModalInitialIndexAtom } from '@/stores/galleryModal';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
}

export function GalleryItem({ item, index }: GalleryItemProps) {
  const setModalOpen = useSetAtom(galleryModalOpenAtom);
  const setModalInitialIndex = useSetAtom(galleryModalInitialIndexAtom);

  const handleClick = () => {
    setModalInitialIndex(index);
    setModalOpen(true);
  };

  return (
    <motion.div
      className="w-full cursor-pointer overflow-hidden rounded-lg"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layoutId={`gallery-item-${item.id}`}
    >
      <AspectRatio ratio={item.width / item.height} className="relative w-full">
        <Image
          src={item.src}
          alt={item.name}
          width={item.width}
          height={item.height}
          priority={false}
          placeholder={item.blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={item.blurDataUrl || undefined}
        />
      </AspectRatio>
    </motion.div>
  );
}
