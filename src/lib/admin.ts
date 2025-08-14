import type { User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { UserRole, Profile } from '@/types/profile';

/**
 * 현재 인증된 사용자의 프로필을 가져옵니다
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { user: null, profile: null, error: '인증되지 않은 사용자입니다.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    return { user, profile: null, error: '프로필을 찾을 수 없습니다.' };
  }

  return { user, profile, error: null };
}

/**
 * 사용자가 지정된 역할을 가지고 있는지 확인합니다
 */
export async function checkUserRole(allowedRoles: UserRole[]): Promise<{
  hasPermission: boolean;
  user: User | null;
  profile: Profile | null;
  error?: string;
}> {
  const { user, profile, error } = await getCurrentUserProfile();

  if (error || !user || !profile) {
    return { hasPermission: false, user, profile, error: error || undefined };
  }

  const hasPermission = allowedRoles.includes(profile.role as UserRole);

  return { hasPermission, user, profile };
}

/**
 * Super Admin 권한을 확인합니다
 */
export async function checkSuperAdminPermission() {
  return checkUserRole(['super_admin']);
}

/**
 * Admin 권한을 확인합니다 (Admin + Super Admin)
 */
export async function checkAdminPermission() {
  return checkUserRole(['admin', 'super_admin']);
}

/**
 * 권한이 없을 때 반환할 에러 응답을 생성합니다
 */
export function createUnauthorizedResponse(message = '권한이 없습니다.') {
  return NextResponse.json({ error: message }, { status: 403 });
}

/**
 * wedding_info 생성 권한을 확인합니다 (Super Admin만)
 */
export async function checkWeddingInfoCreatePermission() {
  return checkSuperAdminPermission();
}

/**
 * wedding_info 수정 권한을 확인합니다 (생성자이거나 Super Admin)
 */
export async function checkWeddingInfoUpdatePermission(weddingInfoId: string) {
  const { hasPermission, user, profile, error } = await checkAdminPermission();

  if (error || !hasPermission) {
    return { hasPermission: false, user, profile, error };
  }

  // Super Admin은 모든 wedding_info 수정 가능
  if (profile && profile.role === 'super_admin') {
    return { hasPermission: true, user, profile };
  }

  // Admin은 자신이 생성한 wedding_info만 수정 가능
  const supabase = await createClient();
  const { data: weddingInfo } = await supabase
    .from('wedding_info')
    .select('created_by')
    .eq('id', weddingInfoId)
    .single();

  if (!weddingInfo) {
    return { hasPermission: false, user, profile, error: '결혼 정보를 찾을 수 없습니다.' };
  }

  const canUpdate = user && weddingInfo.created_by === user.id;

  return {
    hasPermission: canUpdate,
    user,
    profile,
    error: canUpdate ? undefined : '해당 결혼 정보를 수정할 권한이 없습니다.',
  };
}

/**
 * wedding_info 관련 데이터 수정 권한을 확인합니다 (계좌, 연락처, 상세 정보 등)
 */
export async function checkWeddingInfoDataPermission(weddingInfoId: string) {
  return checkWeddingInfoUpdatePermission(weddingInfoId);
}
