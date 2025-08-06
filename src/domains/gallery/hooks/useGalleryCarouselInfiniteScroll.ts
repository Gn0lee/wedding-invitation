import { useEffect } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export function useGalleryCarouselInfiniteScroll(
  emblaApi: CarouselApi | null,
  itemsLength: number,
  hasMore: boolean,
  isValidating: boolean,
  loadMore: () => void,
) {
  useEffect(() => {
    if (!emblaApi) return;

    const loaderIndex = hasMore ? itemsLength : -1; // 로더 슬라이드(마지막)

    const maybeLoadMore = () => {
      // 아직 불러올 게 없거나 이미 요청 중이면 중단
      if (!hasMore || isValidating) {
        return;
      }

      const current = emblaApi.selectedScrollSnap();

      // 로더 슬라이드가 선택됐을 때만 호출
      if (current === loaderIndex) {
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
  }, [emblaApi, itemsLength, hasMore, isValidating, loadMore]);
}
