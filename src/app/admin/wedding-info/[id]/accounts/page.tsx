'use client';

import { ArrowLeft, CreditCard, Settings, Users, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AccountsSection } from '@/app/admin/wedding-info/components/AccountsSection';
import { useWeddingAccounts } from '@/app/admin/wedding-info/hooks/useWeddingAccounts';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { AdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WeddingAccountsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo, isLoading, error } = useWeddingInfoDetail(weddingInfoId);
  const { accounts, updateAccounts, updateError } = useWeddingAccounts(weddingInfoId);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !weddingInfo) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-600">{error || '결혼 정보를 찾을 수 없습니다.'}</div>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard>
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
          <h1 className="mb-2 text-3xl font-bold">
            {weddingInfo.groom_name} & {weddingInfo.bride_name}
          </h1>
          <p className="text-gray-600">
            {new Date(weddingInfo.wedding_date).toLocaleDateString('ko-KR')} |{' '}
            {weddingInfo.venue_name}
          </p>
        </div>

        {/* 에러 메시지 */}
        {updateError && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">{updateError}</div>
        )}

        {/* 네비게이션 탭 */}
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" asChild>
              <Link href={`/admin/wedding-info/${weddingInfoId}`}>
                <Settings className="mr-2 size-4" />
                기본 정보
              </Link>
            </TabsTrigger>
            <TabsTrigger value="accounts" asChild>
              <Link href={`/admin/wedding-info/${weddingInfoId}/accounts`}>
                <CreditCard className="mr-2 size-4" />
                계좌 정보
              </Link>
            </TabsTrigger>
            <TabsTrigger value="contacts" asChild>
              <Link href={`/admin/wedding-info/${weddingInfoId}/contacts`}>
                <Users className="mr-2 size-4" />
                연락처
              </Link>
            </TabsTrigger>
            <TabsTrigger value="details" asChild>
              <Link href={`/admin/wedding-info/${weddingInfoId}/details`}>
                <FileText className="mr-2 size-4" />
                기타 정보
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>계좌 정보</CardTitle>
                <CardDescription>신랑측과 신부측의 계좌 정보를 관리하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <AccountsSection accounts={accounts} onUpdate={updateAccounts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
