import { GalleryResponse, GalleryQueryParams } from '@/domains/gallery/types';

// 실제 API 호출 함수
export async function fetchGalleryItems(params: GalleryQueryParams): Promise<GalleryResponse> {
  // undefined 값들을 필터링하고 문자열로 변환
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: String(value),
      }),
      {} as Record<string, string>,
    );

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`/api/gallery?${queryString}`);

  if (!response.ok) {
    throw new Error('갤러리 데이터를 불러오는데 실패했습니다.');
  }

  return response.json();
}

// 기본 파라미터
export const DEFAULT_GALLERY_PARAMS: Required<GalleryQueryParams> = {
  page: 1,
  limit: 6,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};
