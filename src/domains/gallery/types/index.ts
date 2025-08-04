export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  likes: number;
  takenAt: string; // 사진 촬영 시간
  createdAt: string; // DB 레코드 생성 시간
  updatedAt: string; // DB 레코드 수정 시간
  name: string;
  brideComment: string | null;
  groomComment: string | null;
  isLikedByUser: boolean;
}

export interface GalleryResponse {
  items: GalleryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type SortBy = 'takenAt' | 'likes';
export type SortOrder = 'asc' | 'desc';

export interface GalleryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}
