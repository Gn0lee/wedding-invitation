import useSWR from 'swr';
import { fetchGalleryLike, toggleGalleryLike } from '@/domains/gallery/services/galleryApi';
import { type GalleryLikeResponse } from '@/domains/gallery/types/likes';

export function useGalleryLike(imageId: string, isSelected: boolean = false) {
  const { data, error, mutate } = useSWR<GalleryLikeResponse>(
    imageId && isSelected ? `/api/gallery/items/${imageId}/like` : null,
    () => fetchGalleryLike(imageId),
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
          const result = await toggleGalleryLike(imageId);

          const newData = {
            likes: result.likes,
            isLikedByUser: result.liked,
          };

          return newData;
        },
        {
          optimisticData: (currentData) => {
            if (!currentData) {
              return { likes: 0, isLikedByUser: false };
            }

            const optimisticData = {
              ...currentData,
              likes: currentData.isLikedByUser ? currentData.likes - 1 : currentData.likes + 1,
              isLikedByUser: !currentData.isLikedByUser,
            };

            return optimisticData;
          },
          rollbackOnError: true,
          revalidate: true,
        },
      );
    } catch (error) {
      console.error('❌ Failed to toggle like:', error);
    }
  };

  return {
    data,
    error,
    isLoading: !error && !data,
    toggleLike,
  };
}
