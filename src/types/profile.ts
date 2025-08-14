// 사용자 역할 타입
export type UserRole = 'user' | 'admin' | 'super_admin';

// 사용자 프로필 인터페이스
export interface Profile {
  id: string;
  name: string;
  full_name: string | null;
  preferred_username: string | null;
  email: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// 프로필 생성 요청 타입
export interface CreateProfileRequest {
  name: string;
  full_name?: string;
  preferred_username?: string;
  email: string;
  avatar_url?: string;
  role?: UserRole;
}

// 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  name?: string;
  full_name?: string;
  preferred_username?: string;
  email?: string;
  avatar_url?: string;
  role?: UserRole;
}

// API 응답 래퍼 타입
export interface ProfileAPIResponse {
  data: Profile | null;
  error: string | null;
}
