import { useSetAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { useGalleryCarouselInfiniteScroll } from '@/domains/gallery/hooks/useGalleryCarouselInfiniteScroll';
import { useGalleryItems } from '@/domains/gallery/hooks/useGalleryItems';
import { galleryModalOpenAtom, galleryModalInitialIndexAtom } from '@/stores/galleryModal';

/**
 * 간소화된 갤러리 캐러셀 훅
 * - 스토어에서 실시간 인덱스 추적 제거
 * - Intersection Observer 기반 좋아요 로딩
 */
export function useGalleryCarousel() {
  // 모달 상태
  const isOpen = useAtomValue(galleryModalOpenAtom);
  const initialIndex = useAtomValue(galleryModalInitialIndexAtom);

  // 갤러리 전체 아이템과 무한 스크롤 로직
  const { items, hasMore, isValidating, loadMore } = useGalleryItems();

  // 캐러셀 API 보관
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  // 모달 상태 업데이트
  const setModalOpen = useSetAtom(galleryModalOpenAtom);

  const close = () => {
    setModalOpen(false);
  };

  // 무한 스크롤
  useGalleryCarouselInfiniteScroll(emblaApi, items.length, hasMore, isValidating, loadMore);

  return {
    isOpen,
    initialIndex,
    items,
    hasMore,
    isValidating,
    emblaApi,
    setEmblaApi,
    close,
  };
}
