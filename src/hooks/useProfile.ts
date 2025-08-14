'use client';

import useSWR from 'swr';
import { useAuth } from '@/hooks/useAuth';
import type { Profile } from '@/types/profile';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json() as Promise<Profile>;
};

export function useProfile() {
  const { user, loading: authLoading } = useAuth();

  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useSWR(user ? '/api/profile' : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    profile,
    error,
    loading: authLoading || isLoading,
    mutate,
  };
}
