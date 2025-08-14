import useSWR from 'swr';
import type { WeddingInfo } from '@/types/wedding-info';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch wedding info list');
  }
  return response.json() as Promise<WeddingInfo[]>;
};

export function useWeddingInfoList() {
  const {
    data: weddingInfoList = [],
    error,
    isLoading,
    mutate,
  } = useSWR('/api/admin/wedding-info', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    weddingInfoList,
    error: error?.message,
    isLoading,
    mutate,
  };
}
