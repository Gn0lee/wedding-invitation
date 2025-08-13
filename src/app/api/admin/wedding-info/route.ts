import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { CreateWeddingInfoRequest, UpdateWeddingInfoRequest } from '@/types/wedding-info';

// GET: 기본 결혼 정보 조회
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('wedding_info').select('*').single();

    if (error) {
      console.error('결혼 정보 조회 실패:', error);
      return NextResponse.json({ error: '결혼 정보를 조회할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('결혼 정보 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 기본 결혼 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body: CreateWeddingInfoRequest = await request.json();
    const supabase = await createClient();

    // 필수 필드 검증
    const { wedding_date, venue_name, venue_address, groom_name, bride_name } = body;

    if (!wedding_date || !venue_name || !venue_address || !groom_name || !bride_name) {
      return NextResponse.json({ error: '모든 필수 필드를 입력해주세요.' }, { status: 400 });
    }

    const { data, error } = await supabase.from('wedding_info').insert(body).select().single();

    if (error) {
      console.error('결혼 정보 생성 실패:', error);
      return NextResponse.json({ error: '결혼 정보를 생성할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('결혼 정보 생성 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: 기본 결혼 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateWeddingInfoRequest = await request.json();
    const supabase = await createClient();

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: '수정할 결혼 정보의 ID가 필요합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('wedding_info')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('결혼 정보 수정 실패:', error);
      return NextResponse.json({ error: '결혼 정보를 수정할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('결혼 정보 수정 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
