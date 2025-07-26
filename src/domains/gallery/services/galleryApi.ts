import ky from 'ky';
import { GalleryResponse, GalleryQueryParams } from '@/domains/gallery/types';

// 실제 API 호출 함수
export async function fetchGalleryItems(params: GalleryQueryParams): Promise<GalleryResponse> {
  // undefined 값들을 필터링
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: String(value),
      }),
      {} as Record<string, string>,
    );

  return ky.get('/api/gallery', { searchParams: queryParams }).json();
}

// 기본 파라미터
export const DEFAULT_GALLERY_PARAMS: Required<GalleryQueryParams> = {
  page: 1,
  limit: 6,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};
