'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';

// 인증 상태를 가져오는 함수
async function fetchAuthState(): Promise<{ user: User | null; loading: boolean }> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return { user: session?.user ?? null, loading: false };
}

export function useAuth() {
  // SWR을 사용하여 인증 상태 관리
  const { data, error, mutate } = useSWR('auth-state', fetchAuthState, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0, // 자동 갱신 비활성화
    dedupingInterval: 1000, // 1초 내 중복 요청 방지
  });

  // 인증 상태 변경 감지 및 캐시 업데이트
  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // 캐시를 새로운 상태로 업데이트
      await mutate(
        { user: session?.user ?? null, loading: false },
        { revalidate: false }, // 서버 재검증 없이 캐시만 업데이트
      );
    });

    return () => subscription.unsubscribe();
  }, [mutate]);

  // 로그아웃 함수
  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // 로그아웃 후 캐시 초기화
    await mutate({ user: null, loading: false }, { revalidate: false });
  }, [mutate]);

  // 로딩 상태 계산
  const loading = !data && !error;

  return {
    user: data?.user ?? null,
    loading,
    signOut,
    error,
  };
}
