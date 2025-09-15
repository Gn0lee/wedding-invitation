import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPermission } from '@/lib/admin';
import { updateGalleryItemSchema } from '@/lib/gallery-schemas';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Admin 권한 확인
    await checkAdminPermission();

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
      taken_at?: string;
    } = {};

    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.brideComment !== undefined)
      updateData.bride_comment = validatedData.brideComment;
    if (validatedData.groomComment !== undefined)
      updateData.groom_comment = validatedData.groomComment;
    if (validatedData.takenAt !== undefined) updateData.taken_at = validatedData.takenAt;

    const { id } = await params;

    // 갤러리 아이템 수정
    const { data: updatedItem, error } = await supabase
      .from('gallery_images')
      .update(updateData)
      .eq('id', id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Admin 권한 확인
    await checkAdminPermission();

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    const { id } = await params;

    // 먼저 삭제할 아이템의 정보를 가져와서 Storage 파일 경로 확인
    const { data: itemToDelete, error: fetchError } = await supabase
      .from('gallery_images')
      .select('src')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Gallery item fetch error:', fetchError);

      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '해당 갤러리 아이템을 찾을 수 없습니다.' },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { success: false, error: '갤러리 아이템 조회에 실패했습니다.' },
        { status: 500 },
      );
    }

    // Storage에서 파일 삭제
    if (itemToDelete.src) {
      // src에서 파일 경로 추출
      // URL 예시: https://xxx.supabase.co/storage/v1/object/public/gallery-images/1754281244728-3jtdc7sh5ib.webp
      // 추출할 경로: 1754281244728-3jtdc7sh5ib.webp
      const url = new URL(itemToDelete.src);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1]; // 마지막 부분이 파일명

      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([fileName]);

      if (storageError) {
        console.error('Storage file deletion error:', storageError);
        // Storage 삭제 실패해도 DB 삭제는 진행 (일관성 유지)
      }
    }

    // 데이터베이스에서 갤러리 아이템 삭제
    const { error: deleteError } = await supabase.from('gallery_images').delete().eq('id', id);

    if (deleteError) {
      console.error('Gallery item deletion error:', deleteError);

      if (deleteError.code === 'PGRST116') {
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
