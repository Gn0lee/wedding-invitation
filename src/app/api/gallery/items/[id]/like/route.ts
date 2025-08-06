import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 좋아요 상태 조회
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { id: imageId } = await params;

    // 이미지 존재 확인
    const { data: image, error: imageError } = await supabase
      .from('gallery_images')
      .select('id, likes_count')
      .eq('id', imageId)
      .single();

    if (imageError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // 인증 상태 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let isLikedByUser = false;

    // 로그인한 사용자인 경우 좋아요 상태 확인
    if (user) {
      const { data: existingLike } = await supabase
        .from('gallery_image_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('image_id', imageId)
        .single();

      isLikedByUser = !!existingLike;
    }

    const response = {
      likes: image.likes_count || 0,
      isLikedByUser,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Gallery like status API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 좋아요 토글
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: imageId } = await params;

    // 이미지 존재 확인
    const { data: image, error: imageError } = await supabase
      .from('gallery_images')
      .select('id')
      .eq('id', imageId)
      .single();

    if (imageError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // 현재 좋아요 상태 확인
    const { data: existingLike } = await supabase
      .from('gallery_image_likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('image_id', imageId)
      .single();

    let newLikesCount: number;

    if (existingLike) {
      // 좋아요 제거
      const { error: deleteError } = await supabase
        .from('gallery_image_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('image_id', imageId);

      if (deleteError) {
        console.error('❌ Delete like error:', deleteError);
        return NextResponse.json({ error: 'Failed to unlike' }, { status: 500 });
      }

      // 트리거가 자동으로 likes_count를 감소시킴
      // 업데이트된 likes_count 조회
      const { data: updatedImage, error: fetchError } = await supabase
        .from('gallery_images')
        .select('likes_count')
        .eq('id', imageId)
        .single();

      if (fetchError) {
        console.error('❌ Fetch likes count error:', fetchError);
        return NextResponse.json({ error: 'Failed to fetch likes count' }, { status: 500 });
      }

      newLikesCount = updatedImage.likes_count;
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase.from('gallery_image_likes').insert({
        user_id: user.id,
        image_id: imageId,
      });

      if (insertError) {
        console.error('❌ Insert like error:', insertError);
        return NextResponse.json({ error: 'Failed to like' }, { status: 500 });
      }

      // 트리거가 자동으로 likes_count를 증가시킴
      // 업데이트된 likes_count 조회
      const { data: updatedImage, error: fetchError } = await supabase
        .from('gallery_images')
        .select('likes_count')
        .eq('id', imageId)
        .single();

      if (fetchError) {
        console.error('❌ Fetch likes count error:', fetchError);
        return NextResponse.json({ error: 'Failed to fetch likes count' }, { status: 500 });
      }

      newLikesCount = updatedImage.likes_count;
    }

    const response = {
      success: true,
      liked: !existingLike, // 토글된 상태
      likes: newLikesCount,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Gallery like API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
