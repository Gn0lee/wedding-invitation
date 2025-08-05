'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { GalleryCommentOverlay } from '@/domains/gallery/components/GalleryCommentOverlay';
import { GalleryLikeButton } from '@/domains/gallery/components/GalleryLikeButton';
import { useGalleryItems } from '@/domains/gallery/hooks/useGalleryItems';
import { galleryModalAtom } from '@/stores/galleryModal';

/**
 * 갤러리 썸네일을 클릭했을 때 뜨는 풀스크린 모달의 최소 골격.
 * 아직 캐러셀 기능은 없고, 선택된 단일 이미지만 표시한다.
 */
export default function GalleryModalCarousel() {
  // 모달 오픈 상태 & 선택 인덱스
  const [modal, setModal] = useAtom(galleryModalAtom);
  // 갤러리 전체 아이템과 무한 스크롤 로직
  const { items, hasMore, isValidating, loadMore } = useGalleryItems();

  // 캐러셀 API 보관
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  const close = () => setModal((m) => ({ ...m, open: false }));

  // 선택 또는 재초기화 시 마지막 슬라이드에 도달하면 loadMore 실행
  useEffect(() => {
    if (!emblaApi) return;

    const loaderIndex = hasMore ? items.length : -1; // 로더 슬라이드(마지막)

    const maybeLoadMore = () => {
      // 아직 불러올 게 없거나 이미 요청 중이면 중단
      if (!hasMore || isValidating) return;

      const current = emblaApi.selectedScrollSnap();
      // 로더 슬라이드가 선택됐을 때만 호출
      if (current === loaderIndex) {
        console.log('Loader slide reached. current:', current, 'loaderIndex:', loaderIndex);
        loadMore();
      }
    };

    maybeLoadMore(); // 초기 한 번
    emblaApi.on('select', maybeLoadMore);
    emblaApi.on('reInit', maybeLoadMore);
    return () => {
      emblaApi.off('select', maybeLoadMore);
      emblaApi.off('reInit', maybeLoadMore);
    };
  }, [emblaApi, items.length, hasMore, isValidating, loadMore]);

  // 모달이 닫혀 있으면 아무것도 렌더하지 않음
  if (!modal.open) return null;

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
          className="relative max-h-[90svh] w-full max-w-[90svw] md:max-w-lg"
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

          <Carousel opts={{ loop: true, startIndex: modal.index }} setApi={setEmblaApi}>
            <CarouselContent>
              {items.map((it) => (
                <CarouselItem key={it.id} className="m-auto">
                  <div
                    className="relative overflow-hidden rounded-xl"
                    style={{
                      aspectRatio: `${it.width} / ${it.height}`,
                    }}
                  >
                    <Image
                      src={it.src}
                      alt={it.name}
                      fill
                      className="object-contain"
                      priority={false}
                    />

                    {/* 좋아요 버튼 */}
                    <GalleryLikeButton item={it} />

                    {/* 코멘트 영역 */}
                    {(it.brideComment || it.groomComment) && <GalleryCommentOverlay item={it} />}
                  </div>
                </CarouselItem>
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
            <CarouselPrevious className="left-2 size-5 border-none bg-gray-700/40 text-gray-50 hover:bg-gray-700/70 hover:text-gray-50" />
            <CarouselNext className="right-2 size-5 border-none bg-gray-700/40 text-gray-50 hover:bg-gray-700/70 hover:text-gray-50" />
          </Carousel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
