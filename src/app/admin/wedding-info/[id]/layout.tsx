'use client';

import { ArrowLeft, Settings, Users, CreditCard, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { AdminGuard } from '@/components/AdminGuard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WeddingInfoLayoutProps {
  children: ReactNode;
}

export default function WeddingInfoLayout({ children }: WeddingInfoLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const weddingInfoId = params.id as string;

  const { weddingInfo, isLoading, error } = useWeddingInfoDetail(weddingInfoId);

  // 현재 활성 탭 결정
  const getActiveTab = () => {
    if (pathname.endsWith('/accounts')) return 'accounts';
    if (pathname.endsWith('/contacts')) return 'contacts';
    if (pathname.endsWith('/details')) return 'details';
    return 'basic';
  };

  const activeTab = getActiveTab();

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

        {/* 네비게이션 탭 */}
        <Tabs defaultValue={activeTab} className="space-y-6">
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

          <TabsContent value={activeTab} className="space-y-6">
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
}
