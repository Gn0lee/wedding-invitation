import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermission } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Admin 권한 확인
    await requireAdminPermission();

    // 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 검색 조건 구성
    let query = supabase.from('gallery_images').select('*', { count: 'exact' });

    // 검색 필터 적용
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,bride_comment.ilike.%${search}%,groom_comment.ilike.%${search}%`,
      );
    }

    // 정렬 적용
    const orderBy =
      sortBy === 'takenAt' ? 'taken_at' : sortBy === 'likes' ? 'likes_count' : 'created_at';

    query = query.order(orderBy, { ascending: sortOrder === 'asc' });

    // 페이지네이션 적용
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: items, error, count } = await query;

    if (error) {
      console.error('Gallery items fetch error:', error);
      return NextResponse.json(
        { success: false, error: '갤러리 아이템 조회에 실패했습니다.' },
        { status: 500 },
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        items:
          items?.map((item) => ({
            id: item.id,
            src: item.src,
            width: item.width,
            height: item.height,
            name: item.name,
            brideComment: item.bride_comment,
            groomComment: item.groom_comment,
            likes: item.likes_count,
            takenAt: item.taken_at,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            isLikedByUser: false,
          })) || [],
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Gallery items fetch error:', error);

    if (error instanceof Error && error.message === 'Admin permission required') {
      return NextResponse.json(
        { success: false, error: '관리자 권한이 필요합니다.' },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin 권한 확인
    await requireAdminPermission();

    // FormData 파싱
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const brideComment = formData.get('brideComment') as string;
    const groomComment = formData.get('groomComment') as string;
    const takenAt = formData.get('takenAt') as string;

    // 필수 필드 검증
    if (!file || !name || !takenAt) {
      return NextResponse.json(
        { success: false, error: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: '이미지 파일만 업로드 가능합니다.' },
        { status: 400 },
      );
    }

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 파일명 생성 (고유한 이름)
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    // Supabase Storage에 업로드
    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { success: false, error: '이미지 업로드에 실패했습니다.' },
        { status: 500 },
      );
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage.from('gallery-images').getPublicUrl(fileName);

    // 갤러리 아이템 생성
    const { data: newItem, error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        src: urlData.publicUrl,
        width: 0, // 클라이언트에서 압축 후 전송할 예정
        height: 0, // 클라이언트에서 압축 후 전송할 예정
        name,
        bride_comment: brideComment || null,
        groom_comment: groomComment || null,
        taken_at: takenAt,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Gallery item creation error:', dbError);
      return NextResponse.json(
        { success: false, error: '갤러리 아이템 생성에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: newItem.id,
        src: newItem.src,
        width: newItem.width,
        height: newItem.height,
        name: newItem.name,
        brideComment: newItem.bride_comment,
        groomComment: newItem.groom_comment,
        likes: newItem.likes_count,
        takenAt: newItem.taken_at,
        createdAt: newItem.created_at,
        updatedAt: newItem.updated_at,
        isLikedByUser: false,
      },
    });
  } catch (error) {
    console.error('Gallery item creation error:', error);

    if (error instanceof Error && error.message === 'Admin permission required') {
      return NextResponse.json(
        { success: false, error: '관리자 권한이 필요합니다.' },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
