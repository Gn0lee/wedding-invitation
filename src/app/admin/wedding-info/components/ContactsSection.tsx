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
import type { WeddingContact, WeddingSide, ContactType } from '@/domains/main/scheme/wedding-info';
import { useWeddingContacts } from '../hooks/useWeddingContacts';

interface ContactsSectionProps {
  weddingInfoId: string;
}

const CONTACT_TYPES: { value: ContactType; label: string }[] = [
  { value: 'phone', label: '전화번호' },
  { value: 'email', label: '이메일' },
  { value: 'linked-in', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'line', label: 'LINE' },
];

export function ContactsSection({ weddingInfoId }: ContactsSectionProps) {
  const { contacts, createContact, updateContact, deleteContact, isUpdating, updateError } =
    useWeddingContacts(weddingInfoId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // 편집 중인 연락처 데이터
  const [editData, setEditData] = useState<Partial<WeddingContact>>({
    side: 'groom',
    role: '',
    full_name: '',
    contact_type: 'phone',
    contact_value: '',
    contact_label: '',
  });

  // 신랑측/신부측 연락처 분리
  const groomContacts = contacts.filter((contact: WeddingContact) => contact.side === 'groom');
  const brideContacts = contacts.filter((contact: WeddingContact) => contact.side === 'bride');

  const handleAdd = () => {
    setIsAdding(true);
    setEditData({
      side: 'groom',
      role: '',
      full_name: '',
      contact_type: 'phone',
      contact_value: '',
      contact_label: '',
    });
  };

  const handleEdit = (contact: WeddingContact) => {
    setEditingId(contact.id);
    setEditData({
      side: contact.side,
      role: contact.role,
      full_name: contact.full_name,
      contact_type: contact.contact_type,
      contact_value: contact.contact_value,
      contact_label: contact.contact_label,
    });
  };

  const handleSave = async () => {
    if (!editData.role || !editData.full_name || !editData.contact_value) {
      return;
    }

    try {
      if (editingId) {
        // 수정
        await updateContact(editingId, {
          side: editData.side as WeddingSide,
          role: editData.role,
          full_name: editData.full_name,
          contact_type: editData.contact_type as ContactType,
          contact_value: editData.contact_value,
          contact_label: editData.contact_label || null,
        });
      } else {
        // 추가
        await createContact({
          side: editData.side as WeddingSide,
          role: editData.role,
          full_name: editData.full_name,
          contact_type: editData.contact_type as ContactType,
          contact_value: editData.contact_value,
          contact_label: editData.contact_label || null,
        });
      }

      setEditingId(null);
      setIsAdding(false);
      setEditData({
        side: 'groom',
        role: '',
        full_name: '',
        contact_type: 'phone',
        contact_value: '',
        contact_label: '',
      });
    } catch (error) {
      console.error('연락처 저장 오류:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditData({
      side: 'groom',
      role: '',
      full_name: '',
      contact_type: 'phone',
      contact_value: '',
      contact_label: '',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
    } catch (error) {
      console.error('연락처 삭제 오류:', error);
    }
  };

  const renderContactForm = () => (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {editingId ? '연락처 수정' : '연락처 추가'}
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
            <Label>역할</Label>
            <Input
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
              placeholder="예: 신랑, 신랑 아버지"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>이름</Label>
          <Input
            value={editData.full_name}
            onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
            placeholder="예: 김철수"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>연락처 타입</Label>
            <Select
              value={editData.contact_type}
              onValueChange={(value) =>
                setEditData({ ...editData, contact_type: value as ContactType })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>라벨 (선택사항)</Label>
            <Input
              value={editData.contact_label || ''}
              onChange={(e) => setEditData({ ...editData, contact_label: e.target.value })}
              placeholder="예: 휴대폰, 회사"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>연락처 값</Label>
          <Input
            value={editData.contact_value}
            onChange={(e) => setEditData({ ...editData, contact_value: e.target.value })}
            placeholder={
              editData.contact_type === 'phone'
                ? '예: 010-1234-5678'
                : editData.contact_type === 'email'
                  ? '예: example@email.com'
                  : '연락처 값을 입력하세요'
            }
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isUpdating}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? '저장 중...' : '저장'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderContactList = (sideContacts: WeddingContact[], side: WeddingSide) => {
    // 역할별로 그룹화
    const groupedContacts = sideContacts.reduce(
      (groups, contact: WeddingContact) => {
        if (!groups[contact.role]) {
          groups[contact.role] = [];
        }
        groups[contact.role].push(contact);
        return groups;
      },
      {} as Record<string, WeddingContact[]>,
    );

    return (
      <div className="space-y-4">
        {Object.entries(groupedContacts).map(([role, roleContacts]) => (
          <Card key={role}>
            <CardHeader>
              <CardTitle className="text-lg">{role}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roleContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-start justify-between rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant={side === 'groom' ? 'default' : 'secondary'}>
                          {side === 'groom' ? '신랑측' : '신부측'}
                        </Badge>
                        <span className="font-medium">{contact.full_name}</span>
                        {contact.contact_label && (
                          <Badge variant="outline">{contact.contact_label}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>
                          {CONTACT_TYPES.find((t) => t.value === contact.contact_type)?.label}:{' '}
                          {contact.contact_value}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(contact)}
                        disabled={isUpdating}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                        disabled={isUpdating}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 에러 메시지 */}
      {updateError && (
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p>{updateError}</p>
        </div>
      )}

      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <Button onClick={handleAdd} disabled={isAdding || editingId !== null || isUpdating}>
          <Plus className="mr-2 size-4" />
          연락처 추가
        </Button>
      </div>

      {/* 연락처 추가/수정 폼 */}
      {(isAdding || editingId) && renderContactForm()}

      {/* 신랑측 연락처 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">신랑측 연락처</CardTitle>
        </CardHeader>
        <CardContent>
          {groomContacts.length > 0 ? (
            renderContactList(groomContacts, 'groom')
          ) : (
            <p className="py-4 text-center text-gray-500">등록된 연락처가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 신부측 연락처 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">신부측 연락처</CardTitle>
        </CardHeader>
        <CardContent>
          {brideContacts.length > 0 ? (
            renderContactList(brideContacts, 'bride')
          ) : (
            <p className="py-4 text-center text-gray-500">등록된 연락처가 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
