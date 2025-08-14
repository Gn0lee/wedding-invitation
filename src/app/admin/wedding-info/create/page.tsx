'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreateWeddingInfoForm } from '@/app/admin/wedding-info/components/WeddingInfoForm';
import { useCreateWeddingInfo } from '@/app/admin/wedding-info/hooks/useCreateWeddingInfo';
import { SuperAdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CreateWeddingInfoRequest } from '@/domains/main/scheme/wedding-info';

export default function CreateWeddingInfoPage() {
  const router = useRouter();
  const { createWeddingInfo, isCreating, error } = useCreateWeddingInfo();

  const handleSubmit = async (data: CreateWeddingInfoRequest) => {
    try {
      const result = await createWeddingInfo(data);
      if (result) {
        router.push(`/admin/wedding-info/${result.id}`);
      }
    } catch (error) {
      console.error('결혼 정보 생성 실패:', error);
    }
  };

  return (
    <SuperAdminGuard>
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="mb-4">
            <Button asChild variant="ghost">
              <Link href="/admin/wedding-info">
                <ArrowLeft className="mr-2 size-4" />
                목록으로 돌아가기
              </Link>
            </Button>
          </div>
          <h1 className="mb-2 text-3xl font-bold">새 결혼 정보 생성</h1>
          <p className="text-gray-600">새로운 결혼 정보를 생성합니다.</p>
        </div>

        {/* 에러 메시지 */}
        {error && <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">{error}</div>}

        {/* 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 결혼 정보</CardTitle>
            <CardDescription>
              신랑/신부 이름, 결혼 날짜, 장소 등의 기본 정보를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateWeddingInfoForm onUpdate={handleSubmit} isSubmitting={isCreating} />
          </CardContent>
        </Card>
      </div>
    </SuperAdminGuard>
  );
}
