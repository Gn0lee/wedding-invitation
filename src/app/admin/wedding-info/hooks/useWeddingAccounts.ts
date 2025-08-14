import { useState } from 'react';
import useSWR from 'swr';
import type { WeddingAccount } from '@/domains/main/scheme/wedding-info';
import {
  createWeddingAccount,
  updateWeddingAccount,
  deleteWeddingAccount,
  updateWeddingAccountsBatch,
} from '@/lib/api/wedding-info-admin';

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

  // 새 계좌 추가
  const addAccount = async (
    newAccount: Omit<WeddingAccount, 'id' | 'wedding_info_id' | 'created_at' | 'updated_at'>,
  ) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const result = await createWeddingAccount({
        ...newAccount,
        wedding_info_id: weddingInfoId,
      });

      if (result) {
        await mutate();
      } else {
        setUpdateError('계좌 추가에 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // 계좌 수정
  const updateAccount = async (accountId: string, updatedAccount: Partial<WeddingAccount>) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Partial<WeddingAccount>에서 API 요청에 필요한 필드만 추출
      const { side, name, bank, account_number, account_holder } = updatedAccount;

      const result = await updateWeddingAccount({
        id: accountId,
        wedding_info_id: weddingInfoId,
        ...(side && { side }),
        ...(name && { name }),
        ...(bank && { bank }),
        ...(account_number && { account_number }),
        ...(account_holder && { account_holder }),
      });

      if (result) {
        await mutate();
      } else {
        setUpdateError('계좌 수정에 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // 계좌 삭제
  const deleteAccount = async (accountId: string) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const success = await deleteWeddingAccount(weddingInfoId, accountId);

      if (success) {
        await mutate();
      } else {
        setUpdateError('계좌 삭제에 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // 전체 계좌 목록 교체 (배치 업데이트)
  const replaceAllAccounts = async (newAccounts: WeddingAccount[]) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const updatedAccounts = await updateWeddingAccountsBatch(weddingInfoId, newAccounts);

      if (updatedAccounts.length > 0) {
        await mutate(updatedAccounts, false);
      } else {
        setUpdateError('계좌 목록 교체에 실패했습니다.');
        await mutate();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setUpdateError(errorMessage);
      await mutate();
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    replaceAllAccounts,
    isUpdating,
    updateError,
    error: error?.message,
    isLoading,
  };
}
