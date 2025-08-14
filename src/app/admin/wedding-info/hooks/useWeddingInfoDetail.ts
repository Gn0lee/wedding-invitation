import useSWR from 'swr';
import type { WeddingInfo } from '@/types/wedding-info';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch wedding info detail');
  }
  return response.json() as Promise<WeddingInfo>;
};

export function useWeddingInfoDetail(weddingInfoId: string) {
  const {
    data: weddingInfo,
    error,
    isLoading,
    mutate,
  } = useSWR(weddingInfoId ? `/api/admin/wedding-info/${weddingInfoId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    weddingInfo,
    error: error?.message,
    isLoading,
    mutate,
  };
}
