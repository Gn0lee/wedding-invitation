'use client';

import { useParams } from 'next/navigation';
import { ContactsSection } from '@/app/admin/wedding-info/components/ContactsSection';
import { useWeddingContacts } from '@/app/admin/wedding-info/hooks/useWeddingContacts';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeddingContactsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo } = useWeddingInfoDetail(weddingInfoId);
  const { contacts, updateContacts, updateError } = useWeddingContacts(weddingInfoId);

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
          <CardTitle>연락처 정보 관리</CardTitle>
          <CardDescription>
            신랑/신부 측 연락처 정보를 관리합니다. 각 측의 역할별로 연락처를 추가할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactsSection contacts={contacts} onUpdate={updateContacts} />
        </CardContent>
      </Card>
    </>
  );
}
