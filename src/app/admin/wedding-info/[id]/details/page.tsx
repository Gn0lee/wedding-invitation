'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DetailsSection } from '@/app/admin/wedding-info/components/DetailsSection';
import { useWeddingDetails } from '@/app/admin/wedding-info/hooks/useWeddingDetails';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { AdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WeddingDetailsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo, isLoading, error } = useWeddingInfoDetail(weddingInfoId);
  const { details, updateDetails, updateError } = useWeddingDetails(weddingInfoId);

  if (isLoading) {
    return (
      <AdminGuard>
        <div className="container mx-auto py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="text-lg">로딩 중...</div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (error || !weddingInfo) {
    return (
      <AdminGuard>
        <div className="container mx-auto py-8">
          <div className="flex h-64 items-center justify-center">
            <div className="text-lg text-red-600">{error || '결혼 정보를 찾을 수 없습니다.'}</div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">상세 정보 관리</h1>
              <p className="text-gray-600">
                {new Date(weddingInfo.wedding_date).toLocaleDateString('ko-KR')} |{' '}
                {weddingInfo.venue_name}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/wedding-info">목록으로</Link>
            </Button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {updateError && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">{updateError}</div>
        )}

        {/* 탭 네비게이션 */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger asChild value="info">
              <Link href={`/admin/wedding-info/${weddingInfoId}`}>기본 정보</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="accounts">
              <Link href={`/admin/wedding-info/${weddingInfoId}/accounts`}>계좌 정보</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="contacts">
              <Link href={`/admin/wedding-info/${weddingInfoId}/contacts`}>연락처 정보</Link>
            </TabsTrigger>
            <TabsTrigger value="details">상세 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
