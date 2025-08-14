'use client';

import { useParams } from 'next/navigation';
import { AccountsSection } from '@/app/admin/wedding-info/components/AccountsSection';
import { useWeddingAccounts } from '@/app/admin/wedding-info/hooks/useWeddingAccounts';
import { useWeddingInfoDetail } from '@/app/admin/wedding-info/hooks/useWeddingInfoDetail';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeddingAccountsPage() {
  const params = useParams();
  const weddingInfoId = params.id as string;

  const { weddingInfo } = useWeddingInfoDetail(weddingInfoId);
  const { accounts, addAccount, updateAccount, deleteAccount, updateError } =
    useWeddingAccounts(weddingInfoId);

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
          <CardTitle>계좌 정보</CardTitle>
          <CardDescription>신랑측과 신부측의 계좌 정보를 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountsSection
            accounts={accounts}
            onAdd={addAccount}
            onUpdate={updateAccount}
            onDelete={deleteAccount}
          />
        </CardContent>
      </Card>
    </>
  );
}
