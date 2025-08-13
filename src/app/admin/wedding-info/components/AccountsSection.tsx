'use client';

import { Trash2, Plus, Edit, X } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { WeddingAccount, WeddingSide } from '@/types/wedding-info';

interface AccountsSectionProps {
  accounts: WeddingAccount[];
  onUpdate: (accounts: WeddingAccount[]) => void;
}

export function AccountsSection({ accounts, onUpdate }: AccountsSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // 편집 중인 계좌 데이터
  const [editData, setEditData] = useState<Partial<WeddingAccount>>({
    side: 'groom',
    name: '',
    bank: '',
    account_number: '',
    account_holder: '',
  });

  // 신랑측/신부측 계좌 분리
  const groomAccounts = accounts.filter((account) => account.side === 'groom');
  const brideAccounts = accounts.filter((account) => account.side === 'bride');

  const handleAdd = () => {
    setIsAdding(true);
    setEditData({
      side: 'groom',
      name: '',
      bank: '',
      account_number: '',
      account_holder: '',
    });
  };

  const handleEdit = (account: WeddingAccount) => {
    setEditingId(account.id);
    setEditData({
      side: account.side,
      name: account.name,
      bank: account.bank,
      account_number: account.account_number,
      account_holder: account.account_holder,
    });
  };

  const handleSave = () => {
    if (!editData.name || !editData.bank || !editData.account_number || !editData.account_holder) {
      return;
    }

    const newAccount: WeddingAccount = {
      id: editingId || `temp-${Date.now()}`,
      wedding_info_id: '', // 실제 저장 시 설정됨
      side: editData.side as WeddingSide,
      name: editData.name,
      bank: editData.bank,
      account_number: editData.account_number,
      account_holder: editData.account_holder,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let newAccounts: WeddingAccount[];

    if (editingId) {
      // 수정
      newAccounts = accounts.map((account) => (account.id === editingId ? newAccount : account));
    } else {
      // 추가
      newAccounts = [...accounts, newAccount];
    }

    onUpdate(newAccounts);
    setEditingId(null);
    setIsAdding(false);
    setEditData({
      side: 'groom',
      name: '',
      bank: '',
      account_number: '',
      account_holder: '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditData({
      side: 'groom',
      name: '',
      bank: '',
      account_number: '',
      account_holder: '',
    });
  };

  const handleDelete = (id: string) => {
    const newAccounts = accounts.filter((account) => account.id !== id);
    onUpdate(newAccounts);
  };

  const renderAccountForm = () => (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {editingId ? '계좌 수정' : '계좌 추가'}
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="size-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>측</Label>
            <Select
              value={editData.side}
              onValueChange={(value) => setEditData({ ...editData, side: value as WeddingSide })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groom">신랑측</SelectItem>
                <SelectItem value="bride">신부측</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>이름</Label>
            <Input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="예: 신랑, 신랑 아버지"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>은행</Label>
            <Input
              value={editData.bank}
              onChange={(e) => setEditData({ ...editData, bank: e.target.value })}
              placeholder="예: 신한은행"
            />
          </div>

          <div className="space-y-2">
            <Label>계좌번호</Label>
            <Input
              value={editData.account_number}
              onChange={(e) => setEditData({ ...editData, account_number: e.target.value })}
              placeholder="예: 110-123-456789"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>예금주</Label>
          <Input
            value={editData.account_holder}
            onChange={(e) => setEditData({ ...editData, account_holder: e.target.value })}
            placeholder="예: 김철수"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAccountList = (sideAccounts: WeddingAccount[], side: WeddingSide) => (
    <div className="space-y-3">
      {sideAccounts.map((account) => (
        <Card key={account.id} className="relative">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant={side === 'groom' ? 'default' : 'secondary'}>
                    {side === 'groom' ? '신랑측' : '신부측'}
                  </Badge>
                  <span className="font-medium">{account.name}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>은행: {account.bank}</p>
                  <p>계좌번호: {account.account_number}</p>
                  <p>예금주: {account.account_holder}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(account)}>
                  <Edit className="size-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(account.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <Button onClick={handleAdd} disabled={isAdding || editingId !== null}>
          <Plus className="mr-2 size-4" />
          계좌 추가
        </Button>
      </div>

      {/* 계좌 추가/수정 폼 */}
      {(isAdding || editingId) && renderAccountForm()}

      {/* 신랑측 계좌 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">신랑측 계좌</CardTitle>
        </CardHeader>
        <CardContent>
          {groomAccounts.length > 0 ? (
            renderAccountList(groomAccounts, 'groom')
          ) : (
            <p className="py-4 text-center text-gray-500">등록된 계좌가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 신부측 계좌 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">신부측 계좌</CardTitle>
        </CardHeader>
        <CardContent>
          {brideAccounts.length > 0 ? (
            renderAccountList(brideAccounts, 'bride')
          ) : (
            <p className="py-4 text-center text-gray-500">등록된 계좌가 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
