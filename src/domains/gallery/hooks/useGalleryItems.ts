import { useAtomValue } from 'jotai';
import useSWRInfinite from 'swr/infinite';
import { fetchGalleryItems, DEFAULT_GALLERY_PARAMS } from '@/domains/gallery/services/galleryApi';
import { GalleryResponse } from '@/domains/gallery/types';
import { gallerySortByAtom, gallerySortOrderAtom } from '@/stores/gallery';

export function useGalleryItems() {
  // Jotai 상태 구독
  const sortBy = useAtomValue(gallerySortByAtom);
  const sortOrder = useAtomValue(gallerySortOrderAtom);

  const getKey = (pageIndex: number, previousPageData: GalleryResponse | null) => {
    // 첫 페이지이거나 이전 페이지에 더 많은 데이터가 있는 경우
    if (pageIndex === 0 || (previousPageData && previousPageData.pagination.hasNext)) {
      return {
        page: pageIndex + 1,
        limit: DEFAULT_GALLERY_PARAMS.limit,
        sortBy,
        sortOrder,
      };
    }
    return null; // 더 이상 데이터가 없음
  };

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<GalleryResponse>(getKey, fetchGalleryItems, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  // 모든 아이템을 평면화
  const items = data ? data.flatMap((page) => page.items) : [];

  // 마지막 페이지의 pagination 정보
  const lastPage = data?.[data.length - 1];
  const hasMore = lastPage?.pagination.hasNext ?? false;
  const total = lastPage?.pagination.total ?? 0;

  // 다음 페이지 로드
  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    items,
    error,
    isLoading,
    isValidating,
    hasMore,
    total,
    loadMore,
    mutate,
  };
}
