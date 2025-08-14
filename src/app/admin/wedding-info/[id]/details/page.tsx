'use client';

import { useParams } from 'next/navigation';
import { DetailsSection } from '@/app/admin/wedding-info/components/DetailsSection';
import { useWeddingDetails } from '@/app/admin/wedding-info/hooks/useWeddingDetails';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeddingDetailsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo } = useWeddingInfoDetail(weddingInfoId);
  const { details, updateDetails, updateError } = useWeddingDetails(weddingInfoId);

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
          <CardTitle>상세 정보 관리</CardTitle>
          <CardDescription>
            식사 정보, 주차 정보 등 결혼식과 관련된 추가 정보를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DetailsSection details={details} onUpdate={updateDetails} />
        </CardContent>
      </Card>
    </>
  );
}
