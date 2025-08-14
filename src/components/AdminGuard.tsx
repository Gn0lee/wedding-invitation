'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import type { UserRole } from '@/types/profile';

interface AdminGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

export function AdminGuard({
  children,
  allowedRoles = ['admin', 'super_admin'],
  fallbackPath = '/',
}: AdminGuardProps) {
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
      router.push(fallbackPath);
      return;
    }

    // 프로필이 로드되었고 허용된 역할이 아닌 경우 리다이렉트
    if (profile && !allowedRoles.includes(profile.role as UserRole)) {
      router.push(fallbackPath);
      return;
    }
  }, [user, profile, authLoading, profileLoading, router, allowedRoles, fallbackPath]);

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
  if (!user || (profile && !allowedRoles.includes(profile.role as UserRole))) {
    return null;
  }

  // 권한이 있는 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}

// 편의를 위한 특정 역할별 Guard 컴포넌트들
export function SuperAdminGuard({
  children,
  fallbackPath = '/',
}: Omit<AdminGuardProps, 'allowedRoles'>) {
  return (
    <AdminGuard allowedRoles={['super_admin']} fallbackPath={fallbackPath}>
      {children}
    </AdminGuard>
  );
}

export function AdminOnlyGuard({
  children,
  fallbackPath = '/',
}: Omit<AdminGuardProps, 'allowedRoles'>) {
  return (
    <AdminGuard allowedRoles={['admin']} fallbackPath={fallbackPath}>
      {children}
    </AdminGuard>
  );
}
