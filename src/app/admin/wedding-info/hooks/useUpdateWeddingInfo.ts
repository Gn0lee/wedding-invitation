import { useState } from 'react';
import type { UpdateWeddingInfoRequest, WeddingInfo } from '@/types/wedding-info';

export function useUpdateWeddingInfo() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateWeddingInfo = async (data: UpdateWeddingInfoRequest): Promise<WeddingInfo | null> => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch('/api/admin/wedding-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '결혼 정보 수정에 실패했습니다.');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateWeddingInfo,
    isUpdating,
    updateError,
  };
}
