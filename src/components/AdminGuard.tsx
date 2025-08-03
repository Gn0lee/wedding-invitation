'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  useEffect(() => {
    // 인증 로딩 중이거나 프로필 로딩 중이면 대기
    if (authLoading || profileLoading) {
      return;
    }

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!user) {
      router.push('/');
      return;
    }

    // 프로필이 로드되었고 role이 user인 경우 메인 페이지로 리다이렉트
    if (profile && profile.role === 'user') {
      router.push('/');
      return;
    }
  }, [user, profile, authLoading, profileLoading, router]);

  // 로딩 중일 때 스켈레톤 표시
  if (authLoading || profileLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  // 인증되지 않았거나 권한이 없는 경우 빈 화면 (리다이렉트 중)
  if (!user || (profile && profile.role === 'user')) {
    return null;
  }

  // 관리자 권한이 있는 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}
