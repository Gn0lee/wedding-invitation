import { NextRequest, NextResponse } from 'next/server';
import type { UpdateWeddingAccountRequest } from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// PUT: 특정 계좌 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string; accountId: string }> },
) {
  try {
    const { weddingInfoId, accountId } = await params;
    const body: UpdateWeddingAccountRequest = await request.json();

    if (!weddingInfoId || !accountId) {
      return NextResponse.json(
        { error: 'weddingInfoId와 accountId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    // 계좌가 해당 wedding_info에 속하는지 확인
    const { data: account, error: fetchError } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('id', accountId)
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json({ error: '계좌를 찾을 수 없습니다.' }, { status: 404 });
    }

    // side 값 검증 (제공된 경우)
    if (body.side && !['groom', 'bride'].includes(body.side)) {
      return NextResponse.json({ error: 'side는 groom 또는 bride여야 합니다.' }, { status: 400 });
    }

    // 계좌 수정
    const { data, error: updateError } = await supabase
      .from('wedding_accounts')
      .update({
        side: body.side,
        name: body.name,
        bank: body.bank,
        account_number: body.account_number,
        account_holder: body.account_holder,
      })
      .eq('id', accountId)
      .eq('wedding_info_id', weddingInfoId)
      .select()
      .single();

    if (updateError) {
      console.error('계좌 수정 오류:', updateError);
      return NextResponse.json({ error: '계좌 수정 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('계좌 수정 오류:', error);
    return NextResponse.json({ error: '계좌 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: 특정 계좌 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string; accountId: string }> },
) {
  try {
    const { weddingInfoId, accountId } = await params;

    if (!weddingInfoId || !accountId) {
      return NextResponse.json(
        { error: 'weddingInfoId와 accountId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    // 계좌가 해당 wedding_info에 속하는지 확인
    const { data: account, error: fetchError } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('id', accountId)
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json({ error: '계좌를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 계좌 삭제
    const { error: deleteError } = await supabase
      .from('wedding_accounts')
      .delete()
      .eq('id', accountId)
      .eq('wedding_info_id', weddingInfoId);

    if (deleteError) {
      console.error('계좌 삭제 오류:', deleteError);
      return NextResponse.json({ error: '계좌 삭제 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '계좌가 삭제되었습니다.' });
  } catch (error) {
    console.error('계좌 삭제 오류:', error);
    return NextResponse.json({ error: '계좌 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
