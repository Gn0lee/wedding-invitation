import useSWR from 'swr';
import { RSVPAPIResponse, RSVPRequest } from '@/types/rsvp';

const fetcher = async (url: string): Promise<RSVPAPIResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch RSVP data');
  }
  return response.json();
};

/**
 * 현재 사용자의 RSVP 응답 조회
 */
export function useRSVP(enabled = true) {
  const { data, error, isLoading, mutate } = useSWR<RSVPAPIResponse>(
    enabled ? '/api/rsvp' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    rsvpData: data?.data || null,
    error: data?.error || error?.message || null,
    isLoading,
    mutate,
  };
}

/**
 * RSVP 응답 제출 (새로운 응답)
 */
export async function submitRSVP(formData: RSVPRequest): Promise<RSVPAPIResponse> {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return response.json();
}

/**
 * RSVP 응답 수정
 */
export async function updateRSVP(formData: RSVPRequest): Promise<RSVPAPIResponse> {
  const response = await fetch('/api/rsvp', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return response.json();
}
