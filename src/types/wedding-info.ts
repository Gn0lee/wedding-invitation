// 결혼 정보 관련 타입 정의
// Supabase 데이터베이스 스키마 기반

// 기본 결혼 정보
export interface WeddingInfo {
  id: string;
  wedding_date: string; // ISO 8601 형식의 날짜 문자열
  venue_name: string;
  venue_address: string;
  groom_name: string;
  bride_name: string;
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
  contact_type: string;
  contact_value: string;
  contact_label: string | null; // nullable
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

// 전체 결혼 정보 (관계 포함)
export interface WeddingInfoWithRelations {
  wedding_info: WeddingInfo;
  accounts: WeddingAccount[];
  contacts: WeddingContact[];
  details: WeddingDetails | null;
}

// API 요청/응답 타입
export interface CreateWeddingInfoRequest {
  wedding_date: string;
  venue_name: string;
  venue_address: string;
  groom_name: string;
  bride_name: string;
}

export interface UpdateWeddingInfoRequest extends Partial<CreateWeddingInfoRequest> {
  id: string;
}

export interface CreateWeddingAccountRequest {
  wedding_info_id: string;
  side: 'groom' | 'bride';
  name: string;
  bank: string;
  account_number: string;
  account_holder: string;
}

export interface UpdateWeddingAccountRequest extends Partial<CreateWeddingAccountRequest> {
  id: string;
}

export interface CreateWeddingContactRequest {
  wedding_info_id: string;
  side: 'groom' | 'bride';
  role: string;
  full_name: string;
  contact_type: string;
  contact_value: string;
  contact_label: string | null;
}

export interface UpdateWeddingContactRequest extends Partial<CreateWeddingContactRequest> {
  id: string;
}

export interface CreateWeddingDetailsRequest {
  wedding_info_id: string;
  meal_info: string | null;
  parking_info: string | null;
}

export interface UpdateWeddingDetailsRequest extends Partial<CreateWeddingDetailsRequest> {
  id: string;
}

// 기존 데이터 구조와의 호환성을 위한 변환 타입
export interface LegacyInformationData {
  mealInfo: string;
  parkingInfo: string;
  groomAccounts: Array<{
    name: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
  }>;
  brideAccounts: Array<{
    name: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
  }>;
  groomContacts: Array<{
    role: string;
    fullName: string;
    contacts: Array<{
      type: string;
      value: string;
      label?: string;
    }>;
  }>;
  brideContacts: Array<{
    role: string;
    fullName: string;
    contacts: Array<{
      type: string;
      value: string;
      label?: string;
    }>;
  }>;
}

// 유틸리티 타입
export type WeddingSide = 'groom' | 'bride';

export type ContactType =
  | 'phone'
  | 'email'
  | 'linked-in'
  | 'github'
  | 'instagram'
  | 'facebook'
  | 'line';

// Supabase Database 타입 (자동 생성된 타입과 호환)
export interface Database {
  public: {
    Tables: {
      wedding_info: {
        Row: WeddingInfo;
        Insert: Omit<WeddingInfo, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WeddingInfo, 'id' | 'created_at' | 'updated_at'>>;
      };
      wedding_accounts: {
        Row: WeddingAccount;
        Insert: Omit<WeddingAccount, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WeddingAccount, 'id' | 'created_at' | 'updated_at'>>;
      };
      wedding_contacts: {
        Row: WeddingContact;
        Insert: Omit<WeddingContact, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WeddingContact, 'id' | 'created_at' | 'updated_at'>>;
      };
      wedding_details: {
        Row: WeddingDetails;
        Insert: Omit<WeddingDetails, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WeddingDetails, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
