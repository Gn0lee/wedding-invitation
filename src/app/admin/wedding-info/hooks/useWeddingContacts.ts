import { useState } from 'react';
import useSWR from 'swr';
import type { WeddingContact } from '@/domains/main/scheme/wedding-info';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeddingContacts(weddingInfoId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const {
    data: contacts = [],
    error,
    isLoading,
    mutate,
  } = useSWR(weddingInfoId ? `/api/admin/wedding-info/${weddingInfoId}/contacts` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const updateContacts = async (newContacts: WeddingContact[]) => {
    if (!weddingInfoId) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // 기존 연락처 삭제
      const deletePromises = contacts.map((contact: WeddingContact) =>
        fetch(`/api/admin/wedding-info/${weddingInfoId}/contacts/${contact.id}`, {
          method: 'DELETE',
        }),
      );

      await Promise.all(deletePromises);

      // 새 연락처 생성
      const createPromises = newContacts.map((contact) =>
        fetch(`/api/admin/wedding-info/${weddingInfoId}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            side: contact.side,
            role: contact.role,
            full_name: contact.full_name,
            contact_type: contact.contact_type,
            contact_value: contact.contact_value,
            contact_label: contact.contact_label,
          }),
        }),
      );

      await Promise.all(createPromises);

      // 데이터 재검증
      await mutate();
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : '연락처 업데이트 중 오류가 발생했습니다.',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // 개별 연락처 수정
  const updateContact = async (contactId: string, updatedContact: Partial<WeddingContact>) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(
        `/api/admin/wedding-info/${weddingInfoId}/contacts/${contactId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updatedContact,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('연락처 수정에 실패했습니다.');
      }

      // 데이터 재검증
      await mutate();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : '연락처 수정 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 개별 연락처 생성
  const createContact = async (
    contactData: Omit<WeddingContact, 'id' | 'wedding_info_id' | 'created_at' | 'updated_at'>,
  ) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(`/api/admin/wedding-info/${weddingInfoId}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('연락처 생성에 실패했습니다.');
      }

      // 데이터 재검증
      await mutate();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : '연락처 생성 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 개별 연락처 삭제
  const deleteContact = async (contactId: string) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(
        `/api/admin/wedding-info/${weddingInfoId}/contacts/${contactId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('연락처 삭제에 실패했습니다.');
      }

      // 데이터 재검증
      await mutate();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : '연락처 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    contacts,
    updateContacts,
    createContact,
    updateContact,
    deleteContact,
    isUpdating,
    updateError,
    isLoading,
    error,
  };
}
