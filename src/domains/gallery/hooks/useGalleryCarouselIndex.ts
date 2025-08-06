import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { galleryModalAtom } from '@/stores/galleryModal';

export function useGalleryCarouselIndex(
  emblaApi: CarouselApi | null,
  itemsLength: number,
  hasMore: boolean,
) {
  const setModal = useSetAtom(galleryModalAtom);
  const previousIndexRef = useRef<number>(0);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const currentIndex = emblaApi.selectedScrollSnap();

      // 스피너(로더) 슬라이드가 아닌 실제 이미지 슬라이드만 인덱스로 계산
      const actualImageIndex =
        hasMore && currentIndex >= itemsLength
          ? itemsLength - 1 // 스피너 슬라이드인 경우 마지막 이미지 인덱스로 설정
          : currentIndex;

      // 안전한 범위 체크
      if (actualImageIndex >= 0 && actualImageIndex < itemsLength) {
        // 이전 인덱스와 같지 않을 때만 갱신
        if (previousIndexRef.current !== actualImageIndex) {
          setModal((m) => ({ ...m, index: actualImageIndex }));
          previousIndexRef.current = actualImageIndex;
        }
      }
    };

    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, itemsLength, hasMore, setModal]);

  // itemsLength가 변경될 때 현재 캐러셀 인덱스를 재계산
  useEffect(() => {
    if (!emblaApi) return;

    const currentIndex = emblaApi.selectedScrollSnap();

    // 스피너(로더) 슬라이드가 아닌 실제 이미지 슬라이드만 인덱스로 계산
    const actualImageIndex =
      hasMore && currentIndex >= itemsLength
        ? itemsLength - 1 // 스피너 슬라이드인 경우 마지막 이미지 인덱스로 설정
        : currentIndex;

    // 안전한 범위 체크
    if (actualImageIndex >= 0 && actualImageIndex < itemsLength) {
      // 이전 인덱스와 같지 않을 때만 갱신
      if (previousIndexRef.current !== actualImageIndex) {
        setModal((m) => ({ ...m, index: actualImageIndex }));
        previousIndexRef.current = actualImageIndex;
      }
    }
  }, [emblaApi, itemsLength, hasMore, setModal]);
}
