import { type GalleryItemsResponse, type GalleryQueryParams } from '@/domains/main/types/items';
import {
  type GalleryLikeResponse,
  type GalleryLikeToggleResponse,
} from '@/domains/main/types/likes';

// 기본 갤러리 파라미터
export const DEFAULT_GALLERY_PARAMS = {
  page: 1,
  limit: 12,
  sortBy: 'takenAt' as const,
  sortOrder: 'desc' as const,
};

// API 호출 함수
export async function fetchGalleryItems(params: GalleryQueryParams): Promise<GalleryItemsResponse> {
  const { page = 1, limit = 12, sortBy = 'takenAt', sortOrder = 'desc' } = params;

  // 쿼리 파라미터 구성
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });

  // API 호출
  const response = await fetch(`/api/gallery/items?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch gallery items');
  }

  return response.json();
}

// 좋아요 상태 조회
export async function fetchGalleryLike(imageId: string): Promise<GalleryLikeResponse> {
  const response = await fetch(`/api/gallery/items/${imageId}/like`);

  if (!response.ok) {
    throw new Error('Failed to fetch gallery like status');
  }

  return response.json();
}

// 좋아요 토글
export async function toggleGalleryLike(imageId: string): Promise<GalleryLikeToggleResponse> {
  const response = await fetch(`/api/gallery/items/${imageId}/like`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to toggle gallery like');
  }

  return response.json();
}
