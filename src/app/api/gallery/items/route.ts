import { NextRequest, NextResponse } from 'next/server';
import { GalleryItemsResponse, SortBy, SortOrder } from '@/domains/gallery/types/items';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 파싱
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = (searchParams.get('sortBy') as SortBy) || 'takenAt';
    const sortOrder = (searchParams.get('sortOrder') as SortOrder) || 'desc';

    // 유효성 검사
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
    }

    if (!['takenAt', 'likes'].includes(sortBy)) {
      return NextResponse.json({ error: 'Invalid sortBy parameter' }, { status: 400 });
    }

    if (!['asc', 'desc'].includes(sortOrder)) {
      return NextResponse.json({ error: 'Invalid sortOrder parameter' }, { status: 400 });
    }

    const supabase = await createClient();

    // 정렬 컬럼 매핑
    const sortColumn = sortBy === 'takenAt' ? 'taken_at' : 'likes_count';

    // 전체 개수 조회
    const { count } = await supabase
      .from('gallery_images')
      .select('*', { count: 'exact', head: true });

    const total = count || 0;

    // 기본 쿼리 구성
    let query = supabase
      .from('gallery_images')
      .select(
        `
        id,
        src,
        width,
        height,
        name,
        bride_comment,
        groom_comment,
        likes_count,
        taken_at,
        created_at,
        updated_at,
        blur_data_url
      `,
      )
      .order(sortColumn, { ascending: sortOrder === 'asc' });

    // 페이지네이션 적용
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);

    const { data, error } = await query;

    if (error) {
      console.error('Gallery API error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 응답 데이터 변환 (좋아요 상태 제거)
    const items = (data || []).map((item) => ({
      id: item.id,
      src: item.src,
      width: item.width,
      height: item.height,
      takenAt: item.taken_at,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      name: item.name,
      brideComment: item.bride_comment,
      groomComment: item.groom_comment,
      blurDataUrl: item.blur_data_url,
    }));

    // 페이지네이션 메타데이터 계산
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const response: GalleryItemsResponse = {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
