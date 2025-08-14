// 결혼 정보 관련 타입 정의
// Supabase 데이터베이스 스키마 기반

// ===== 핵심 도메인 타입 =====

// 기본 결혼 정보
export interface WeddingInfo {
  id: string;
  wedding_date: string; // ISO 8601 형식의 날짜 문자열
  venue_name: string;
  venue_address: string;
  groom_name: string;
  bride_name: string;
  created_by: string; // 생성자 ID
  created_at: string;
  updated_at: string;
}

// 계좌 정보
export interface WeddingAccount {
  id: string;
  wedding_info_id: string;
  side: 'groom' | 'bride';
  name: string;
  bank: string;
  account_number: string;
  account_holder: string;
  created_at: string;
  updated_at: string;
}

// 연락처 정보
export interface WeddingContact {
  id: string;
  wedding_info_id: string;
  side: 'groom' | 'bride';
  role: string;
  full_name: string;
  contact_type: ContactType;
  contact_value: string;
  contact_label: string | null;
  created_at: string;
  updated_at: string;
}

// 기타 정보
export interface WeddingDetails {
  id: string;
  wedding_info_id: string;
  meal_info: string | null;
  parking_info: string | null;
  created_at: string;
  updated_at: string;
}

// ===== 유틸리티 타입 =====

export type WeddingSide = 'groom' | 'bride';

export type ContactType =
  | 'phone'
  | 'email'
  | 'linked-in'
  | 'github'
  | 'instagram'
  | 'facebook'
  | 'line';

// ===== CRUD 타입 (자동 생성) =====

// 생성용 타입 (ID, timestamp 제외)
export type CreateWeddingInfo = Omit<WeddingInfo, 'id' | 'created_at' | 'updated_at'>;
export type CreateWeddingAccount = Omit<WeddingAccount, 'id' | 'created_at' | 'updated_at'>;
export type CreateWeddingContact = Omit<WeddingContact, 'id' | 'created_at' | 'updated_at'>;
export type CreateWeddingDetails = Omit<WeddingDetails, 'id' | 'created_at' | 'updated_at'>;

// 수정용 타입 (ID, timestamp 제외, 모든 필드 선택적)
export type UpdateWeddingInfo = Partial<Omit<WeddingInfo, 'id' | 'created_at' | 'updated_at'>>;
export type UpdateWeddingAccount = Partial<
  Omit<WeddingAccount, 'id' | 'created_at' | 'updated_at'>
>;
export type UpdateWeddingContact = Partial<
  Omit<WeddingContact, 'id' | 'created_at' | 'updated_at'>
>;
export type UpdateWeddingDetails = Partial<
  Omit<WeddingDetails, 'id' | 'created_at' | 'updated_at'>
>;

// ===== 관계 타입 =====

// 전체 결혼 정보 (관계 포함)
export interface WeddingInfoWithRelations {
  info: WeddingInfo;
  details: WeddingDetails | null;
  accounts: WeddingAccount[];
  contacts: WeddingContact[];
}

// ===== API 요청 타입 (간소화) =====

// 생성 요청 (created_by는 서버에서 자동 설정)
export interface CreateWeddingInfoRequest {
  wedding_date: string;
  venue_name: string;
  venue_address: string;
  groom_name: string;
  bride_name: string;
}

// 수정 요청
export interface UpdateWeddingInfoRequest {
  id: string;
  wedding_date?: string;
  venue_name?: string;
  venue_address?: string;
  groom_name?: string;
  bride_name?: string;
}

// 계좌 관련 API 요청 타입
export interface CreateWeddingAccountRequest {
  wedding_info_id: string;
  side: WeddingSide;
  name: string;
  bank: string;
  account_number: string;
  account_holder: string;
}

export interface UpdateWeddingAccountRequest {
  id: string;
  wedding_info_id?: string;
  side?: WeddingSide;
  name?: string;
  bank?: string;
  account_number?: string;
  account_holder?: string;
}

// 연락처 관련 API 요청 타입
export interface CreateWeddingContactRequest {
  wedding_info_id: string;
  side: WeddingSide;
  role: string;
  full_name: string;
  contact_type: ContactType;
  contact_value: string;
  contact_label?: string | null;
}

export interface UpdateWeddingContactRequest {
  id: string;
  wedding_info_id?: string;
  side?: WeddingSide;
  role?: string;
  full_name?: string;
  contact_type?: ContactType;
  contact_value?: string;
  contact_label?: string | null;
}

// 상세 정보 관련 API 요청 타입
export interface CreateWeddingDetailsRequest {
  wedding_info_id: string;
  meal_info?: string | null;
  parking_info?: string | null;
}

export interface UpdateWeddingDetailsRequest {
  id: string;
  wedding_info_id?: string;
  meal_info?: string | null;
  parking_info?: string | null;
}

// ===== Supabase Database 타입 =====

export interface Database {
  public: {
    Tables: {
      wedding_info: {
        Row: WeddingInfo;
        Insert: CreateWeddingInfo;
        Update: UpdateWeddingInfo;
      };
      wedding_accounts: {
        Row: WeddingAccount;
        Insert: CreateWeddingAccount;
        Update: UpdateWeddingAccount;
      };
      wedding_contacts: {
        Row: WeddingContact;
        Insert: CreateWeddingContact;
        Update: UpdateWeddingContact;
      };
      wedding_details: {
        Row: WeddingDetails;
        Insert: CreateWeddingDetails;
        Update: UpdateWeddingDetails;
      };
    };
  };
}
