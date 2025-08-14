import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import type { UpdateWeddingInfoRequest } from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoUpdatePermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// GET: 특정 wedding-info 조회
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
      await checkWeddingInfoUpdatePermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_info')
      .select('*')
      .eq('id', weddingInfoId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: '결혼 정보를 찾을 수 없습니다.' }, { status: 404 });
      }
      console.error('결혼 정보 조회 오류:', error);
      return NextResponse.json(
        { error: '결혼 정보 조회 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('결혼 정보 조회 오류:', error);
    return NextResponse.json({ error: '결혼 정보 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: 특정 wedding-info 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const body: UpdateWeddingInfoRequest = await request.json();

    if (!weddingInfoId) {
      return NextResponse.json({ error: 'weddingInfoId가 필요합니다.' }, { status: 400 });
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoUpdatePermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_info')
      .update(body)
      .eq('id', weddingInfoId)
      .select()
      .single();

    if (error) {
      console.error('결혼 정보 수정 오류:', error);
      return NextResponse.json(
        { error: '결혼 정보 수정 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    revalidatePath('/');

    return NextResponse.json(data);
  } catch (error) {
    console.error('결혼 정보 수정 오류:', error);
    return NextResponse.json({ error: '결혼 정보 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: 특정 wedding-info 삭제
export async function DELETE(
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
      await checkWeddingInfoUpdatePermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    const { error } = await supabase.from('wedding_info').delete().eq('id', weddingInfoId);

    if (error) {
      console.error('결혼 정보 삭제 오류:', error);
      return NextResponse.json(
        { error: '결혼 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    revalidatePath('/');

    return NextResponse.json({ message: '결혼 정보가 삭제되었습니다.' });
  } catch (error) {
    console.error('결혼 정보 삭제 오류:', error);
    return NextResponse.json({ error: '결혼 정보 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
