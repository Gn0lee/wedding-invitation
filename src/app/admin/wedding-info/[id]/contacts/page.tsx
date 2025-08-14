'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ContactsSection } from '@/app/admin/wedding-info/components/ContactsSection';
import { useWeddingContacts } from '@/app/admin/wedding-info/hooks/useWeddingContacts';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { AdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WeddingContactsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo, isLoading, error } = useWeddingInfoDetail(weddingInfoId);
  const { contacts, updateContacts, updateError } = useWeddingContacts(weddingInfoId);

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
              <h1 className="text-3xl font-bold">연락처 관리</h1>
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
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger asChild value="info">
              <Link href={`/admin/wedding-info/${weddingInfoId}`}>기본 정보</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="accounts">
              <Link href={`/admin/wedding-info/${weddingInfoId}/accounts`}>계좌 정보</Link>
            </TabsTrigger>
            <TabsTrigger value="contacts">연락처 정보</TabsTrigger>
            <TabsTrigger asChild value="details">
              <Link href={`/admin/wedding-info/${weddingInfoId}/details`}>상세 정보</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>연락처 정보 관리</CardTitle>
                <CardDescription>
                  신랑/신부 측 연락처 정보를 관리합니다. 각 측의 역할별로 연락처를 추가할 수
                  있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactsSection contacts={contacts} onUpdate={updateContacts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
