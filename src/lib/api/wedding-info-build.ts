import type { WeddingInfoWithRelations } from '@/domains/main/scheme/wedding-info';
import { createBuildClient } from '@/lib/supabase/build-client';

/**
 * 빌드 시점에 전체 결혼 정보를 조회합니다 (관계 포함)
 * 정적 빌드에서 사용하기 위한 함수
 */
export async function getWeddingInfoWithRelationsForBuild(): Promise<WeddingInfoWithRelations | null> {
  try {
    const supabase = createBuildClient();

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
