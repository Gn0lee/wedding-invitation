export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  likes: number;
  createdAt: string;
  modifiedAt: string;
  name: string;
  brideComment: string | null;
  groomComment: string | null;
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

export type SortBy = 'createdAt' | 'likes';
export type SortOrder = 'asc' | 'desc';

export interface GalleryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}
