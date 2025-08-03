import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermission } from '@/lib/admin';
import { updateGalleryItemSchema } from '@/lib/gallery-schemas';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Admin 권한 확인
    await requireAdminPermission();

    // 요청 데이터 파싱
    const body = await request.json();

    // 입력 검증
    const validatedData = updateGalleryItemSchema.parse(body);

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 업데이트할 데이터 준비
    const updateData: {
      name?: string;
      bride_comment?: string | null;
      groom_comment?: string | null;
    } = {};

    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.brideComment !== undefined)
      updateData.bride_comment = validatedData.brideComment;
    if (validatedData.groomComment !== undefined)
      updateData.groom_comment = validatedData.groomComment;

    // 갤러리 아이템 수정
    const { data: updatedItem, error } = await supabase
      .from('gallery_images')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Gallery item update error:', error);

      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '해당 갤러리 아이템을 찾을 수 없습니다.' },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: false, error: '갤러리 아이템 수정에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedItem.id,
        src: updatedItem.src,
        width: updatedItem.width,
        height: updatedItem.height,
        name: updatedItem.name,
        brideComment: updatedItem.bride_comment,
        groomComment: updatedItem.groom_comment,
        likes: updatedItem.likes_count,
        takenAt: updatedItem.taken_at,
        createdAt: updatedItem.created_at,
        updatedAt: updatedItem.updated_at,
        isLikedByUser: false,
      },
    });
  } catch (error) {
    console.error('Gallery item update error:', error);

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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Admin 권한 확인
    await requireAdminPermission();

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 갤러리 아이템 삭제
    const { error } = await supabase.from('gallery_images').delete().eq('id', params.id);

    if (error) {
      console.error('Gallery item deletion error:', error);

      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '해당 갤러리 아이템을 찾을 수 없습니다.' },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: false, error: '갤러리 아이템 삭제에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: '갤러리 아이템이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Gallery item deletion error:', error);

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
