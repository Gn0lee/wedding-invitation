'use client';

import useSWR from 'swr';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  name: string;
  full_name: string | null;
  preferred_username: string | null;
  email: string;
  avatar_url: string | null;
  role: 'user' | 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

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
