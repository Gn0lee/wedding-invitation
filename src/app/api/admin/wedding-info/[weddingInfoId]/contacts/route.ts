import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import type { CreateWeddingContactRequest } from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// GET: 특정 wedding_info의 연락처 목록 조회
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
      .from('wedding_contacts')
      .select('*')
      .eq('wedding_info_id', weddingInfoId)
      .order('side', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('연락처 조회 오류:', error);
      return NextResponse.json({ error: '연락처 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('연락처 조회 오류:', error);
    return NextResponse.json({ error: '연락처 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 특정 wedding_info에 새 연락처 생성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const body: CreateWeddingContactRequest = await request.json();

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
      .from('wedding_contacts')
      .insert([{ ...body, wedding_info_id: weddingInfoId }])
      .select()
      .single();

    if (error) {
      console.error('연락처 생성 오류:', error);
      return NextResponse.json({ error: '연락처 생성 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 메인 페이지 재생성
    revalidatePath('/');

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('연락처 생성 오류:', error);
    return NextResponse.json({ error: '연락처 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
