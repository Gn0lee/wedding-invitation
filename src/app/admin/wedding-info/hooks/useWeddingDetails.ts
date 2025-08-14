import { useState } from 'react';
import useSWR from 'swr';
import type { WeddingDetails } from '@/domains/main/scheme/wedding-info';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeddingDetails(weddingInfoId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const {
    data: details = null,
    error,
    isLoading,
    mutate,
  } = useSWR(weddingInfoId ? `/api/admin/wedding-info/${weddingInfoId}/details` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const updateDetails = async (newDetails: Partial<WeddingDetails>) => {
    if (!weddingInfoId) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // 상세 정보는 하나만 존재하므로 PUT으로 통합 처리
      const response = await fetch(`/api/admin/wedding-info/${weddingInfoId}/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meal_info: newDetails.meal_info,
          parking_info: newDetails.parking_info,
        }),
      });

      if (!response.ok) {
        throw new Error('상세 정보 업데이트에 실패했습니다.');
      }

      // 데이터 재검증
      await mutate();
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : '상세 정보 업데이트 중 오류가 발생했습니다.',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    details,
    updateDetails,
    isUpdating,
    updateError,
    isLoading,
    error,
  };
}
