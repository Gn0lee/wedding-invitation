'use client';

import { useParams } from 'next/navigation';
import { UpdateWeddingInfoForm } from '@/app/admin/wedding-info/components/WeddingInfoForm';
import { useUpdateWeddingInfo } from '@/app/admin/wedding-info/hooks/useUpdateWeddingInfo';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UpdateWeddingInfoRequest } from '@/domains/main/scheme/wedding-info';

export default function WeddingInfoDetailPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo } = useWeddingInfoDetail(weddingInfoId);
  const { updateWeddingInfo, isUpdating, updateError } = useUpdateWeddingInfo();

  const handleSubmit = async (data: UpdateWeddingInfoRequest) => {
    if (!weddingInfo) return;

    try {
      await updateWeddingInfo({
        ...data,
      });
    } catch (error) {
      console.error('결혼 정보 수정 실패:', error);
    }
  };

  if (!weddingInfo) {
    return null; // Layout에서 로딩/에러 처리
  }

  return (
    <>
      {/* 에러 메시지 */}
      {updateError && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">{updateError}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>기본 결혼 정보</CardTitle>
          <CardDescription>
            신랑/신부 이름, 결혼 날짜, 장소 등의 기본 정보를 수정하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateWeddingInfoForm
            data={weddingInfo}
            onUpdate={handleSubmit}
            isSubmitting={isUpdating}
          />
        </CardContent>
      </Card>
    </>
  );
}
