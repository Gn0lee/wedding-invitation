// RSVP 폼 데이터 타입 (UI용)
export interface RSVPFormValues {
  side: 'groom' | 'bride' | '';
  attend: 'yes' | 'no' | '';
  meal: 'yes' | 'no' | '';
  adult: string;
  child: string;
  agree: boolean;
}

// RSVP API 요청 타입 (서버용)
export interface RSVPRequest {
  side: 'groom' | 'bride';
  attend: 'yes' | 'no';
  meal: 'yes' | 'no' | null;
  adult_count: number;
  child_count: number;
  agree_terms: boolean;
}

// RSVP API 응답 타입 (서버용)
export interface RSVPResponse {
  id: string;
  user_id: string;
  side: 'groom' | 'bride';
  attend: 'yes' | 'no';
  meal: 'yes' | 'no' | null;
  adult_count: number;
  child_count: number;
  agree_terms: boolean;
  created_at: string;
  updated_at: string;
}

// API 응답 래퍼 타입
export interface RSVPAPIResponse {
  data: RSVPResponse | null;
  error: string | null;
}
