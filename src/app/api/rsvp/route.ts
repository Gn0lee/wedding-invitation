import { NextRequest, NextResponse } from 'next/server';
import { validateRSVPData } from '@/lib/rsvp';
import { createClient } from '@/lib/supabase/server';
import { RSVPRequest, RSVPAPIResponse } from '@/types/rsvp';

export async function POST(request: NextRequest): Promise<NextResponse<RSVPAPIResponse>> {
  try {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 1. 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ data: null, error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 2. 요청 데이터 파싱
    const body: RSVPRequest = await request.json();

    // 3. 데이터 검증
    const validation = validateRSVPData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { data: null, error: validation.error || '데이터 검증에 실패했습니다.' },
        { status: 400 },
      );
    }

    // 4. 기존 응답 확인 (중복 방지)
    const { data: existingResponse, error: checkError } = await supabase
      .from('rsvp_responses')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json(
        { data: null, error: '데이터베이스 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    if (existingResponse) {
      return NextResponse.json(
        { data: null, error: '이미 RSVP 응답을 제출했습니다. 수정하려면 PUT 요청을 사용하세요.' },
        { status: 409 },
      );
    }

    // 5. RSVP 응답 삽입
    const { data: newResponse, error: insertError } = await supabase
      .from('rsvp_responses')
      .insert({
        user_id: user.id,
        side: body.side,
        attend: body.attend,
        meal: body.meal,
        adult_count: body.adult_count,
        child_count: body.child_count,
        agree_terms: body.agree_terms,
      })
      .select()
      .single();

    if (insertError) {
      console.error('RSVP 삽입 오류:', insertError);
      return NextResponse.json(
        { data: null, error: 'RSVP 응답 저장 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    // 6. 성공 응답
    return NextResponse.json({
      data: {
        id: newResponse.id,
        user_id: newResponse.user_id,
        side: newResponse.side,
        attend: newResponse.attend,
        meal: newResponse.meal,
        adult_count: newResponse.adult_count,
        child_count: newResponse.child_count,
        agree_terms: newResponse.agree_terms,
        created_at: newResponse.created_at,
        updated_at: newResponse.updated_at,
      },
      error: null,
    });
  } catch (error) {
    console.error('RSVP POST API 오류:', error);
    return NextResponse.json({ data: null, error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<RSVPAPIResponse>> {
  try {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 1. 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ data: null, error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 2. 요청 데이터 파싱
    const body: RSVPRequest = await request.json();

    // 3. 데이터 검증
    const validation = validateRSVPData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { data: null, error: validation.error || '데이터 검증에 실패했습니다.' },
        { status: 400 },
      );
    }

    // 4. 기존 응답 확인
    const { data: existingResponse, error: checkError } = await supabase
      .from('rsvp_responses')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json(
        { data: null, error: '데이터베이스 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    if (!existingResponse) {
      return NextResponse.json(
        {
          data: null,
          error: '수정할 RSVP 응답이 없습니다. 새로 제출하려면 POST 요청을 사용하세요.',
        },
        { status: 404 },
      );
    }

    // 5. RSVP 응답 수정
    const { data: updatedResponse, error: updateError } = await supabase
      .from('rsvp_responses')
      .update({
        side: body.side,
        attend: body.attend,
        meal: body.meal,
        adult_count: body.adult_count,
        child_count: body.child_count,
        agree_terms: body.agree_terms,
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('RSVP 수정 오류:', updateError);
      return NextResponse.json(
        { data: null, error: 'RSVP 응답 수정 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    // 6. 성공 응답
    return NextResponse.json({
      data: {
        id: updatedResponse.id,
        user_id: updatedResponse.user_id,
        side: updatedResponse.side,
        attend: updatedResponse.attend,
        meal: updatedResponse.meal,
        adult_count: updatedResponse.adult_count,
        child_count: updatedResponse.child_count,
        agree_terms: updatedResponse.agree_terms,
        created_at: updatedResponse.created_at,
        updated_at: updatedResponse.updated_at,
      },
      error: null,
    });
  } catch (error) {
    console.error('RSVP PUT API 오류:', error);
    return NextResponse.json({ data: null, error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse<RSVPAPIResponse>> {
  try {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 1. 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ data: null, error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 2. 사용자의 RSVP 응답 조회
    const { data: rsvpResponse, error } = await supabase
      .from('rsvp_responses')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('RSVP 조회 오류:', error);
      return NextResponse.json(
        { data: null, error: '데이터베이스 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    // 3. 응답 데이터 반환
    if (rsvpResponse) {
      // 기존 응답이 있는 경우
      return NextResponse.json({
        data: {
          id: rsvpResponse.id,
          user_id: rsvpResponse.user_id,
          side: rsvpResponse.side,
          attend: rsvpResponse.attend,
          meal: rsvpResponse.meal,
          adult_count: rsvpResponse.adult_count,
          child_count: rsvpResponse.child_count,
          agree_terms: rsvpResponse.agree_terms,
          created_at: rsvpResponse.created_at,
          updated_at: rsvpResponse.updated_at,
        },
        error: null,
      });
    }

    // 기존 응답이 없는 경우
    return NextResponse.json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error('RSVP GET API 오류:', error);
    return NextResponse.json({ data: null, error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
