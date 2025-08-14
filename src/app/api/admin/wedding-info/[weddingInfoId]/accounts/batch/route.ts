import { NextRequest, NextResponse } from 'next/server';
import type { WeddingAccount } from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// PUT: 계좌 정보 배치 업데이트 (기존 계좌 삭제 후 새로 생성)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const accounts: WeddingAccount[] = await request.json();

    if (!weddingInfoId) {
      return NextResponse.json({ error: 'weddingInfoId가 필요합니다.' }, { status: 400 });
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    // 기존 계좌 삭제
    const { error: deleteError } = await supabase
      .from('wedding_accounts')
      .delete()
      .eq('wedding_info_id', weddingInfoId);

    if (deleteError) {
      console.error('기존 계좌 삭제 실패:', deleteError);
      return NextResponse.json(
        { error: '기존 계좌 삭제 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    // 새 계좌 생성
    if (accounts.length > 0) {
      const { error: insertError } = await supabase.from('wedding_accounts').insert(
        accounts.map((account) => ({
          wedding_info_id: weddingInfoId,
          side: account.side,
          name: account.name,
          bank: account.bank,
          account_number: account.account_number,
          account_holder: account.account_holder,
        })),
      );

      if (insertError) {
        console.error('새 계좌 생성 실패:', insertError);
        return NextResponse.json(
          { error: '새 계좌 생성 중 오류가 발생했습니다.' },
          { status: 500 },
        );
      }
    }

    // 업데이트된 계좌 목록 조회
    const { data: updatedAccounts, error: fetchError } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('wedding_info_id', weddingInfoId)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('업데이트된 계좌 조회 실패:', fetchError);
      return NextResponse.json(
        { error: '업데이트된 계좌 정보를 조회할 수 없습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json(updatedAccounts || []);
  } catch (error) {
    console.error('계좌 정보 배치 업데이트 오류:', error);
    return NextResponse.json(
      { error: '계좌 정보 업데이트 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
