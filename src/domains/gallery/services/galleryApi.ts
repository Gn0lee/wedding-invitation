import { type GalleryResponse, type GalleryQueryParams } from '@/domains/gallery/types';

// 기본 갤러리 파라미터
export const DEFAULT_GALLERY_PARAMS = {
  page: 1,
  limit: 12,
  sortBy: 'takenAt' as const,
  sortOrder: 'desc' as const,
};

// API 호출 함수
export async function fetchGalleryItems(params: GalleryQueryParams): Promise<GalleryResponse> {
  const { page = 1, limit = 12, sortBy = 'takenAt', sortOrder = 'desc' } = params;

  // 쿼리 파라미터 구성
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });

  // API 호출
  const response = await fetch(`/api/gallery?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch gallery items');
  }

  return response.json();
}
