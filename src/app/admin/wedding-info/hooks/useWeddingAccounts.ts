import { useState } from 'react';
import useSWR from 'swr';
import type { WeddingAccount } from '@/types/wedding-info';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch wedding accounts');
  }
  return response.json() as Promise<WeddingAccount[]>;
};

export function useWeddingAccounts(weddingInfoId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const {
    data: accounts = [],
    error,
    isLoading,
    mutate,
  } = useSWR(weddingInfoId ? `/api/admin/wedding-info/${weddingInfoId}/accounts` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const updateAccounts = async (newAccounts: WeddingAccount[]) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      // 기존 계좌 삭제
      for (const account of accounts) {
        await fetch(`/api/admin/wedding-info/accounts/${account.id}`, {
          method: 'DELETE',
        });
      }

      // 새 계좌 생성
      for (const account of newAccounts) {
        await fetch('/api/admin/wedding-info/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wedding_info_id: weddingInfoId,
            side: account.side,
            name: account.name,
            bank: account.bank,
            account_number: account.account_number,
            account_holder: account.account_holder,
          }),
        });
      }

      await mutate();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    accounts,
    updateAccounts,
    isUpdating,
    updateError,
    error: error?.message,
    isLoading,
  };
}
