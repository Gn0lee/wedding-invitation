'use client';

import { useState } from 'react';
import { WeddingInfoForm } from '@/app/admin/wedding-info/components/WeddingInfoForm';
import { useWeddingInfoAdmin } from '@/app/admin/wedding-info/hooks/useWeddingInfoAdmin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountsSection } from '@/app/admin/wedding-info/components/AccountsSection';
import { ContactsSection } from '@/app/admin/wedding-info/components/ContactsSection';
import { DetailsSection } from '@/app/admin/wedding-info/components/DetailsSection';

export default function WeddingInfoAdminPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [hasChanges, setHasChanges] = useState(false);

  const {
    weddingInfo,
    accounts,
    contacts,
    details,
    isLoading,
    isSaving,
    saveAll,
    updateWeddingInfo,
    updateAccounts,
    updateContacts,
    updateDetails,
  } = useWeddingInfoAdmin();

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await saveAll();
      setHasChanges(false);
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">결혼 정보 관리</h1>
        <p className="text-gray-600">결혼식 정보, 계좌번호, 연락처 등을 관리할 수 있습니다.</p>
      </div>

      {/* 저장 버튼 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {hasChanges && (
            <div className="rounded-md bg-orange-50 px-3 py-1 text-sm text-orange-600">
              변경사항이 있습니다
            </div>
          )}
        </div>
        <Button onClick={handleSave} disabled={!hasChanges || isSaving} className="min-w-24">
          {isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>

      {/* 메인 컨텐츠 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="accounts">계좌 정보</TabsTrigger>
          <TabsTrigger value="contacts">연락처</TabsTrigger>
          <TabsTrigger value="details">기타 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 결혼 정보</CardTitle>
              <CardDescription>
                신랑/신부 이름, 결혼 날짜, 장소 등의 기본 정보를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeddingInfoForm
                data={weddingInfo}
                onUpdate={(data) => {
                  updateWeddingInfo(data);
                  setHasChanges(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>계좌 정보</CardTitle>
              <CardDescription>신랑측과 신부측의 계좌 정보를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsSection
                accounts={accounts}
                onUpdate={(data) => {
                  updateAccounts(data);
                  setHasChanges(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>연락처 정보</CardTitle>
              <CardDescription>신랑측과 신부측의 연락처 정보를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactsSection
                contacts={contacts}
                onUpdate={(data) => {
                  updateContacts(data);
                  setHasChanges(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기타 정보</CardTitle>
              <CardDescription>식사 안내, 주차 안내 등의 추가 정보를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <DetailsSection
                details={details}
                onUpdate={(data) => {
                  updateDetails(data);
                  setHasChanges(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
