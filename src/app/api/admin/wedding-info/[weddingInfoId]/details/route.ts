import { NextRequest, NextResponse } from 'next/server';
import type {
  CreateWeddingDetailsRequest,
  UpdateWeddingDetailsRequest,
} from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// GET: 특정 wedding_info의 상세 정보 조회
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
      .from('wedding_details')
      .select('*')
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // 데이터가 없는 경우
        return NextResponse.json(null);
      }
      console.error('상세 정보 조회 오류:', error);
      return NextResponse.json(
        { error: '상세 정보 조회 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('상세 정보 조회 오류:', error);
    return NextResponse.json({ error: '상세 정보 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 특정 wedding_info에 새 상세 정보 생성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const body: CreateWeddingDetailsRequest = await request.json();

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
      .from('wedding_details')
      .insert([{ ...body, wedding_info_id: weddingInfoId }])
      .select()
      .single();

    if (error) {
      console.error('상세 정보 생성 오류:', error);
      return NextResponse.json(
        { error: '상세 정보 생성 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('상세 정보 생성 오류:', error);
    return NextResponse.json({ error: '상세 정보 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: 특정 wedding_info의 상세 정보 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string }> },
) {
  try {
    const { weddingInfoId } = await params;
    const body: UpdateWeddingDetailsRequest = await request.json();

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

    // 기존 상세 정보 확인
    const { data: existingDetails, error: fetchError } = await supabase
      .from('wedding_details')
      .select('*')
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('상세 정보 조회 오류:', fetchError);
      return NextResponse.json(
        { error: '상세 정보 조회 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    let result;
    if (existingDetails) {
      // 기존 상세 정보가 있으면 업데이트
      const { data, error: updateError } = await supabase
        .from('wedding_details')
        .update({
          meal_info: body.meal_info,
          parking_info: body.parking_info,
        })
        .eq('wedding_info_id', weddingInfoId)
        .select()
        .single();

      if (updateError) {
        console.error('상세 정보 업데이트 오류:', updateError);
        return NextResponse.json(
          { error: '상세 정보 업데이트 중 오류가 발생했습니다.' },
          { status: 500 },
        );
      }
      result = data;
    } else {
      // 기존 상세 정보가 없으면 새로 생성
      const { data, error: createError } = await supabase
        .from('wedding_details')
        .insert([
          {
            wedding_info_id: weddingInfoId,
            meal_info: body.meal_info,
            parking_info: body.parking_info,
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error('상세 정보 생성 오류:', createError);
        return NextResponse.json(
          { error: '상세 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 },
        );
      }
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('상세 정보 수정 오류:', error);
    return NextResponse.json({ error: '상세 정보 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
