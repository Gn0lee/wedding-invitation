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
export function useRSVP() {
  const { data, error, isLoading, mutate } = useSWR<RSVPAPIResponse>('/api/rsvp', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
export async function submitRSVP(
  formData: RSVPRequest,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || '제출 중 오류가 발생했습니다.' };
    }

    return { success: true };
  } catch (error) {
    console.error('RSVP 제출 오류:', error);
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
}

/**
 * RSVP 응답 수정
 */
export async function updateRSVP(
  formData: RSVPRequest,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || '수정 중 오류가 발생했습니다.' };
    }

    return { success: true };
  } catch (error) {
    console.error('RSVP 수정 오류:', error);
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
}
