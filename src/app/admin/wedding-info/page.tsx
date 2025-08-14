'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useWeddingInfoList } from '@/app/admin/wedding-info/hooks/useWeddingInfoList';
import { SuperAdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeddingInfoListPage() {
  const { weddingInfoList, isLoading, error } = useWeddingInfoList();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-600">오류가 발생했습니다: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <SuperAdminGuard>
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">결혼 정보 관리</h1>
          <p className="text-gray-600">등록된 결혼 정보들을 관리할 수 있습니다.</p>
        </div>

        {/* 생성 버튼 */}
        <div className="mb-6 flex justify-end">
          <Button asChild>
            <Link href="/admin/wedding-info/create">
              <Plus className="mr-2 size-4" />새 결혼 정보 생성
            </Link>
          </Button>
        </div>

        {/* 목록 */}
        <div className="space-y-4">
          {weddingInfoList.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">등록된 결혼 정보가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            weddingInfoList.map((weddingInfo) => (
              <Card key={weddingInfo.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {weddingInfo.groom_name} & {weddingInfo.bride_name}
                    </span>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/wedding-info/${weddingInfo.id}`}>관리하기</Link>
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {new Date(weddingInfo.wedding_date).toLocaleDateString('ko-KR')} |{' '}
                    {weddingInfo.venue_name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>주소: {weddingInfo.venue_address}</p>
                    <p>생성일: {new Date(weddingInfo.created_at).toLocaleDateString('ko-KR')}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </SuperAdminGuard>
  );
}
