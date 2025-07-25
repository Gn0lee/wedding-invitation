import { NextRequest, NextResponse } from 'next/server';
import { allItems, TOTAL_ITEMS } from '@/domains/gallery/services/galleryDataService';
import { GalleryResponse, SortBy, SortOrder } from '@/domains/gallery/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 파싱
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = (searchParams.get('sortBy') as SortBy) || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as SortOrder) || 'desc';

    // 유효성 검사
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
    }

    if (!['createdAt', 'likes'].includes(sortBy)) {
      return NextResponse.json({ error: 'Invalid sortBy parameter' }, { status: 400 });
    }

    if (!['asc', 'desc'].includes(sortOrder)) {
      return NextResponse.json({ error: 'Invalid sortOrder parameter' }, { status: 400 });
    }

    // 데이터 정렬
    const sortedItems = [...allItems].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a.likes;
        bValue = b.likes;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    // 페이지네이션 메타데이터 계산
    const totalPages = Math.ceil(TOTAL_ITEMS / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const response: GalleryResponse = {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total: TOTAL_ITEMS,
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
