export interface GalleryLikeResponse {
  likes: number;
  isLikedByUser: boolean;
}

export interface GalleryLikeToggleResponse {
  success: boolean;
  liked: boolean;
  likes: number;
}
