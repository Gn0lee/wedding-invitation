import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import type { UpdateWeddingContactRequest } from '@/domains/main/scheme/wedding-info';
import { checkWeddingInfoDataPermission, createUnauthorizedResponse } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';

// PUT: 특정 연락처 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string; contactId: string }> },
) {
  try {
    const { weddingInfoId, contactId } = await params;
    const body: UpdateWeddingContactRequest = await request.json();

    if (!weddingInfoId || !contactId) {
      return NextResponse.json(
        { error: 'weddingInfoId와 contactId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    // 연락처가 해당 wedding_info에 속하는지 확인
    const { data: contact, error: fetchError } = await supabase
      .from('wedding_contacts')
      .select('*')
      .eq('id', contactId)
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (fetchError || !contact) {
      return NextResponse.json({ error: '연락처를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 연락처 수정
    const { data, error: updateError } = await supabase
      .from('wedding_contacts')
      .update({
        side: body.side,
        role: body.role,
        full_name: body.full_name,
        contact_type: body.contact_type,
        contact_value: body.contact_value,
        contact_label: body.contact_label,
      })
      .eq('id', contactId)
      .eq('wedding_info_id', weddingInfoId)
      .select()
      .single();

    if (updateError) {
      console.error('연락처 수정 오류:', updateError);
      return NextResponse.json({ error: '연락처 수정 중 오류가 발생했습니다.' }, { status: 500 });
    }

    revalidatePath('/');

    return NextResponse.json(data);
  } catch (error) {
    console.error('연락처 수정 오류:', error);
    return NextResponse.json({ error: '연락처 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: 특정 연락처 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ weddingInfoId: string; contactId: string }> },
) {
  try {
    const { weddingInfoId, contactId } = await params;

    if (!weddingInfoId || !contactId) {
      return NextResponse.json(
        { error: 'weddingInfoId와 contactId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 권한 체크
    const { hasPermission, error: permissionError } =
      await checkWeddingInfoDataPermission(weddingInfoId);

    if (!hasPermission) {
      return createUnauthorizedResponse(permissionError);
    }

    const supabase = await createClient();

    // 연락처가 해당 wedding_info에 속하는지 확인
    const { data: contact, error: fetchError } = await supabase
      .from('wedding_contacts')
      .select('*')
      .eq('id', contactId)
      .eq('wedding_info_id', weddingInfoId)
      .single();

    if (fetchError || !contact) {
      return NextResponse.json({ error: '연락처를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 연락처 삭제
    const { error: deleteError } = await supabase
      .from('wedding_contacts')
      .delete()
      .eq('id', contactId)
      .eq('wedding_info_id', weddingInfoId);

    if (deleteError) {
      console.error('연락처 삭제 오류:', deleteError);
      return NextResponse.json({ error: '연락처 삭제 중 오류가 발생했습니다.' }, { status: 500 });
    }

    revalidatePath('/');

    return NextResponse.json({ message: '연락처가 삭제되었습니다.' });
  } catch (error) {
    console.error('연락처 삭제 오류:', error);
    return NextResponse.json({ error: '연락처 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
