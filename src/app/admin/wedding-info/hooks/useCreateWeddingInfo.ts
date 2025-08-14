import { useState } from 'react';
import type { CreateWeddingInfoRequest, WeddingInfo } from '@/domains/main/scheme/wedding-info';

export function useCreateWeddingInfo() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWeddingInfo = async (data: CreateWeddingInfoRequest): Promise<WeddingInfo | null> => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/wedding-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '결혼 정보 생성에 실패했습니다.');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createWeddingInfo,
    isCreating,
    error,
  };
}
