import { useAtomValue } from 'jotai';
import useSWRInfinite from 'swr/infinite';
import { fetchGalleryItems, DEFAULT_GALLERY_PARAMS } from '@/domains/main/services/galleryApi';
import { GalleryItemsResponse } from '@/domains/main/types/items';
import { gallerySortByAtom, gallerySortOrderAtom } from '@/stores/gallery';

export function useGalleryItems(shouldFetch = false) {
  // Jotai 상태 구독
  const sortBy = useAtomValue(gallerySortByAtom);
  const sortOrder = useAtomValue(gallerySortOrderAtom);

  const getKey = (pageIndex: number, previousPageData: GalleryItemsResponse | null) => {
    // shouldFetch가 false이거나 더 이상 데이터가 없으면 null 반환
    if (
      !shouldFetch ||
      (pageIndex > 0 && (!previousPageData || !previousPageData.pagination.hasNext))
    ) {
      return null;
    }

    return {
      page: pageIndex + 1,
      limit: DEFAULT_GALLERY_PARAMS.limit,
      sortBy,
      sortOrder,
      shouldFetch, // 키에 shouldFetch 포함하여 캐시 분리
    };
  };

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<GalleryItemsResponse>(getKey, fetchGalleryItems, {
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
