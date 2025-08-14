import { createClient } from '@/lib/supabase/server';
import type {
  WeddingInfo,
  WeddingAccount,
  WeddingContact,
  WeddingDetails,
  WeddingInfoWithRelations,
} from '@/types/wedding-info';

/**
 * 전체 결혼 정보를 조회합니다 (관계 포함)
 * SSG에서 사용하기 위한 함수
 */
export async function getWeddingInfoWithRelations(): Promise<WeddingInfoWithRelations | null> {
  try {
    const supabase = await createClient();

    // 1. 기본 결혼 정보 조회
    const { data: weddingInfo, error: weddingError } = await supabase
      .from('wedding_info')
      .select('*')
      .single();

    if (weddingError || !weddingInfo) {
      console.error('결혼 정보 조회 실패:', weddingError);
      return null;
    }

    // 2. 계좌 정보 조회
    const { data: accounts, error: accountsError } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('wedding_info_id', weddingInfo.id);

    if (accountsError) {
      console.error('계좌 정보 조회 실패:', accountsError);
    }

    // 3. 연락처 정보 조회
    const { data: contacts, error: contactsError } = await supabase
      .from('wedding_contacts')
      .select('*')
      .eq('wedding_info_id', weddingInfo.id);

    if (contactsError) {
      console.error('연락처 정보 조회 실패:', contactsError);
    }

    // 4. 기타 정보 조회
    const { data: details, error: detailsError } = await supabase
      .from('wedding_details')
      .select('*')
      .eq('wedding_info_id', weddingInfo.id)
      .single();

    if (detailsError && detailsError.code !== 'PGRST116') {
      // PGRST116는 데이터가 없는 경우
      console.error('기타 정보 조회 실패:', detailsError);
    }

    return {
      info: weddingInfo,
      accounts: accounts || [],
      contacts: contacts || [],
      details: details || null,
    };
  } catch (error) {
    console.error('결혼 정보 조회 중 오류 발생:', error);
    return null;
  }
}

/**
 * 기본 결혼 정보만 조회합니다
 */
export async function getWeddingInfo(): Promise<WeddingInfo | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('wedding_info').select('*').single();

    if (error) {
      console.error('결혼 정보 조회 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('결혼 정보 조회 중 오류 발생:', error);
    return null;
  }
}

/**
 * 계좌 정보를 조회합니다
 */
export async function getWeddingAccounts(): Promise<WeddingAccount[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_accounts')
      .select('*')
      .order('side', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('계좌 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('계좌 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 연락처 정보를 조회합니다
 */
export async function getWeddingContacts(): Promise<WeddingContact[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_contacts')
      .select('*')
      .order('side', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('연락처 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('연락처 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 기타 정보를 조회합니다
 */
export async function getWeddingDetails(): Promise<WeddingDetails | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('wedding_details').select('*').single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116는 데이터가 없는 경우
      console.error('기타 정보 조회 실패:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('기타 정보 조회 중 오류 발생:', error);
    return null;
  }
}

/**
 * 신랑측 계좌 정보만 조회합니다
 */
export async function getGroomAccounts(): Promise<WeddingAccount[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('side', 'groom')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('신랑측 계좌 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('신랑측 계좌 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 신부측 계좌 정보만 조회합니다
 */
export async function getBrideAccounts(): Promise<WeddingAccount[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('side', 'bride')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('신부측 계좌 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('신부측 계좌 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 신랑측 연락처 정보만 조회합니다
 */
export async function getGroomContacts(): Promise<WeddingContact[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_contacts')
      .select('*')
      .eq('side', 'groom')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('신랑측 연락처 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('신랑측 연락처 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 신부측 연락처 정보만 조회합니다
 */
export async function getBrideContacts(): Promise<WeddingContact[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_contacts')
      .select('*')
      .eq('side', 'bride')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('신부측 연락처 정보 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('신부측 연락처 정보 조회 중 오류 발생:', error);
    return [];
  }
}
