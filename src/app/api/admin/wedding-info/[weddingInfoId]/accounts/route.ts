import { NextRequest, NextResponse } from 'next/server';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';
import type { CreateWeddingAccountRequest } from '@/types/wedding-info';

// GET: 특정 wedding_info의 계좌 목록 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;

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

    const { data, error } = await supabase
      .from('wedding_accounts')
      .select('*')
      .eq('wedding_info_id', weddingInfoId)
      .order('side', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('계좌 조회 오류:', error);
      return NextResponse.json({ error: '계좌 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('계좌 조회 오류:', error);
    return NextResponse.json({ error: '계좌 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 특정 wedding_info에 새 계좌 생성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const body: CreateWeddingAccountRequest = await request.json();

    if (!weddingInfoId) {
      return NextResponse.json({ error: 'weddingInfoId가 필요합니다.' }, { status: 400 });
    }

    // 필수 필드 검증
    const { side, name, bank, account_number, account_holder } = body;

    if (!side || !name || !bank || !account_number || !account_holder) {
      return NextResponse.json({ error: '모든 필수 필드를 입력해주세요.' }, { status: 400 });
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    // side 값 검증
    if (!['groom', 'bride'].includes(side)) {
      return NextResponse.json({ error: 'side는 groom 또는 bride여야 합니다.' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_accounts')
      .insert([{ ...body, wedding_info_id: weddingInfoId }])
      .select()
      .single();

    if (error) {
      console.error('계좌 생성 오류:', error);
      return NextResponse.json({ error: '계좌 생성 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('계좌 생성 오류:', error);
    return NextResponse.json({ error: '계좌 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
