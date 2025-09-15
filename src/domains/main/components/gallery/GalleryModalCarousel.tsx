'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GalleryCarouselItem } from '@/domains/main/components/gallery/GalleryCarouselItem';
import { useGalleryCarousel } from '@/domains/main/hooks/useGalleryCarousel';

/**
 * 갤러리 썸네일을 클릭했을 때 뜨는 풀스크린 모달.
 * Intersection Observer 기반 좋아요 로딩과 startIndex로 애니메이션 없는 초기화
 */
export default function GalleryModalCarousel() {
  const { isOpen, initialIndex, items, hasMore, isValidating, setEmblaApi, close } =
    useGalleryCarousel();

  // 모달이 닫혀 있으면 아무것도 렌더하지 않음
  if (!isOpen) return null;

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90dvh] w-full max-w-[90dvw] md:max-w-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 size-5 rounded-full bg-gray-700/40 text-white hover:bg-gray-700/60 hover:text-gray-50"
            onClick={close}
          >
            <X size={16} />
          </Button>

          <Carousel
            opts={{
              loop: true,
              startIndex: initialIndex, // scrollTo 대신 초기 인덱스로 바로 설정
            }}
            setApi={setEmblaApi}
          >
            <CarouselContent>
              {items.map((item, index) => (
                <GalleryCarouselItem key={item.id} item={item} index={index} />
              ))}
              {hasMore && (
                <CarouselItem className="flex items-center justify-center">
                  {isValidating ? (
                    <Loader2 className="size-10 animate-spin text-gray-200" />
                  ) : (
                    <span className="text-sm text-gray-300">•••</span>
                  )}
                </CarouselItem>
              )}
            </CarouselContent>

            {/* 네비게이션 버튼 */}
            <CarouselPrevious className="left-2 size-5 border-none bg-gray-700/40 text-gray-50 hover:bg-gray-700/60 hover:text-gray-50" />
            <CarouselNext className="right-2 size-5 border-none bg-gray-700/40 text-gray-50 hover:bg-gray-700/70 hover:text-gray-50" />
          </Carousel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
