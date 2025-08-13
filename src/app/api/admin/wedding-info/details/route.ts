import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type {
  CreateWeddingDetailsRequest,
  UpdateWeddingDetailsRequest,
} from '@/types/wedding-info';

// GET: 기타 정보 조회
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('wedding_details').select('*').single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116는 데이터가 없는 경우
      console.error('기타 정보 조회 실패:', error);
      return NextResponse.json({ error: '기타 정보를 조회할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data || null);
  } catch (error) {
    console.error('기타 정보 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 기타 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body: CreateWeddingDetailsRequest = await request.json();
    const supabase = await createClient();

    // 필수 필드 검증
    const { wedding_info_id } = body;

    if (!wedding_info_id) {
      return NextResponse.json({ error: 'wedding_info_id는 필수입니다.' }, { status: 400 });
    }

    const { data, error } = await supabase.from('wedding_details').insert(body).select().single();

    if (error) {
      console.error('기타 정보 생성 실패:', error);
      return NextResponse.json({ error: '기타 정보를 생성할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('기타 정보 생성 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: 기타 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateWeddingDetailsRequest = await request.json();
    const supabase = await createClient();

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: '수정할 기타 정보의 ID가 필요합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('wedding_details')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('기타 정보 수정 실패:', error);
      return NextResponse.json({ error: '기타 정보를 수정할 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('기타 정보 수정 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
