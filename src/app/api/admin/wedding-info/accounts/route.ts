import { NextRequest, NextResponse } from 'next/server';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';
import type {
  CreateWeddingAccountRequest,
  UpdateWeddingAccountRequest,
} from '@/types/wedding-info';

// GET: 계좌 정보 조회
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wedding_accounts')
      .select('*')
      .order('side', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('계좌 정보 조회 실패:', error);
      return NextResponse.json({ error: '계좌 정보를 조회할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('계좌 정보 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 계좌 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body: CreateWeddingAccountRequest = await request.json();

    // 필수 필드 검증
    const { wedding_info_id, side, name, bank, account_number, account_holder } = body;

    if (!wedding_info_id || !side || !name || !bank || !account_number || !account_holder) {
      return NextResponse.json({ error: '모든 필수 필드를 입력해주세요.' }, { status: 400 });
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(wedding_info_id);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    // side 값 검증
    if (!['groom', 'bride'].includes(side)) {
      return NextResponse.json({ error: 'side는 groom 또는 bride여야 합니다.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('wedding_accounts').insert(body).select().single();

    if (error) {
      console.error('계좌 정보 생성 실패:', error);
      return NextResponse.json({ error: '계좌 정보를 생성할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('계좌 정보 생성 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: 계좌 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateWeddingAccountRequest = await request.json();
    const supabase = await createClient();

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: '수정할 계좌 정보의 ID가 필요합니다.' }, { status: 400 });
    }

    // side 값 검증 (제공된 경우)
    if (updateData.side && !['groom', 'bride'].includes(updateData.side)) {
      return NextResponse.json({ error: 'side는 groom 또는 bride여야 합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('wedding_accounts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('계좌 정보 수정 실패:', error);
      return NextResponse.json({ error: '계좌 정보를 수정할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('계좌 정보 수정 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: 계좌 정보 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '삭제할 계좌 정보의 ID가 필요합니다.' }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from('wedding_accounts').delete().eq('id', id);

    if (error) {
      console.error('계좌 정보 삭제 실패:', error);
      return NextResponse.json({ error: '계좌 정보를 삭제할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('계좌 정보 삭제 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
