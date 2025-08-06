import { useSetAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { useGalleryCarouselIndex } from '@/domains/gallery/hooks/useGalleryCarouselIndex';
import { useGalleryCarouselInfiniteScroll } from '@/domains/gallery/hooks/useGalleryCarouselInfiniteScroll';
import { useGalleryItems } from '@/domains/gallery/hooks/useGalleryItems';
import { galleryModalAtom } from '@/stores/galleryModal';

export function useGalleryCarousel() {
  // 모달 오픈 상태 & 선택 인덱스
  const modal = useAtomValue(galleryModalAtom);
  // 갤러리 전체 아이템과 무한 스크롤 로직
  const { items, hasMore, isValidating, loadMore } = useGalleryItems();

  // 캐러셀 API 보관
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);

  const setModal = useSetAtom(galleryModalAtom);

  const close = () => {
    setModal((m: { open: boolean; index: number }) => ({ ...m, open: false }));
  };

  // 개별 훅들을 사용하여 관심사 분리
  useGalleryCarouselIndex(emblaApi, items.length, hasMore);
  useGalleryCarouselInfiniteScroll(emblaApi, items.length, hasMore, isValidating, loadMore);

  return {
    modal,
    items,
    hasMore,
    isValidating,
    emblaApi,
    setEmblaApi,
    close,
  };
}
