import { NextRequest, NextResponse } from 'next/server';
import { requireAdminPermission } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

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

    // 기존 압축 API 호출
    const compressFormData = new FormData();
    compressFormData.append('file', file);

    const compressResponse = await fetch(`${request.nextUrl.origin}/api/admin/gallery/compress`, {
      method: 'POST',
      body: compressFormData,
    });

    if (!compressResponse.ok) {
      const errorData = await compressResponse.json();
      return NextResponse.json(
        { success: false, error: errorData.error || '이미지 압축에 실패했습니다.' },
        { status: compressResponse.status },
      );
    }

    const compressResult = await compressResponse.json();

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // base64 데이터를 Buffer로 변환
    const base64Data = compressResult.compressedImage.replace('data:image/webp;base64,', '');
    const buffer = Buffer.from(base64Data, 'base64');

    // 파일명 생성 (고유한 이름)
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`;

    // Supabase Storage에 업로드
    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, buffer, {
        contentType: 'image/webp',
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
        width: compressResult.compressedDimensions.width,
        height: compressResult.compressedDimensions.height,
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
