import useSWR from 'swr';
import { GalleryLikeResponse, GalleryLikeToggleResponse } from '../types/likes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGalleryLike(imageId: string) {
  const { data, error, mutate } = useSWR<GalleryLikeResponse>(
    imageId ? `/api/gallery/${imageId}/like` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1분간 중복 요청 방지
    },
  );

  const toggleLike = async () => {
    if (!imageId || !data) return;

    try {
      await mutate(
        async () => {
          const response = await fetch(`/api/gallery/${imageId}/like`, {
            method: 'POST',
          });

          if (!response.ok) {
            throw new Error('Failed to toggle like');
          }

          const result: GalleryLikeToggleResponse = await response.json();
          return {
            likes: result.likes,
            isLikedByUser: result.liked,
          };
        },
        {
          optimisticData: (currentData) => {
            if (!currentData) {
              return { likes: 0, isLikedByUser: false };
            }
            return {
              ...currentData,
              likes: currentData.isLikedByUser ? currentData.likes - 1 : currentData.likes + 1,
              isLikedByUser: !currentData.isLikedByUser,
            };
          },
          rollbackOnError: true,
          revalidate: false,
        },
      );
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return {
    data,
    error,
    isLoading: !error && !data,
    toggleLike,
  };
}
