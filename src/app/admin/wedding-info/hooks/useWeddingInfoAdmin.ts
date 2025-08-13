import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  getWeddingInfo,
  createWeddingInfo,
  updateWeddingInfo as updateWeddingInfoAPI,
  getWeddingAccounts,
  createWeddingAccount,
  deleteWeddingAccount,
  getWeddingContacts,
  createWeddingContact,
  deleteWeddingContact,
  getWeddingDetails,
  createWeddingDetails,
  updateWeddingDetails as updateWeddingDetailsAPI,
} from '@/lib/api/wedding-info-admin';
import type {
  WeddingInfo,
  WeddingAccount,
  WeddingContact,
  WeddingDetails,
} from '@/types/wedding-info';

export function useWeddingInfoAdmin() {
  // SWR로 데이터 페칭
  const { data: weddingInfo, mutate: mutateWeddingInfo } = useSWR('wedding-info', getWeddingInfo);

  const { data: accounts, mutate: mutateAccounts } = useSWR('wedding-accounts', getWeddingAccounts);

  const { data: contacts, mutate: mutateContacts } = useSWR('wedding-contacts', getWeddingContacts);

  const { data: details, mutate: mutateDetails } = useSWR('wedding-details', getWeddingDetails);

  // 로컬 상태 (변경사항 추적)
  const [localWeddingInfo, setLocalWeddingInfo] = useState<WeddingInfo | null>(null);
  const [localAccounts, setLocalAccounts] = useState<WeddingAccount[]>([]);
  const [localContacts, setLocalContacts] = useState<WeddingContact[]>([]);
  const [localDetails, setLocalDetails] = useState<WeddingDetails | null>(null);

  // 로딩/저장 상태
  const [isSaving, setIsSaving] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (weddingInfo && !localWeddingInfo) {
      setLocalWeddingInfo(weddingInfo);
    }
  }, [weddingInfo, localWeddingInfo]);

  useEffect(() => {
    if (accounts && localAccounts.length === 0) {
      setLocalAccounts(accounts);
    }
  }, [accounts, localAccounts]);

  useEffect(() => {
    if (contacts && localContacts.length === 0) {
      setLocalContacts(contacts);
    }
  }, [contacts, localContacts]);

  useEffect(() => {
    if (details && !localDetails) {
      setLocalDetails(details);
    }
  }, [details, localDetails]);

  // 로딩 상태 계산
  const isLoading = !weddingInfo && !accounts && !contacts && !details;

  // 변경사항이 있는지 확인
  const hasChanges =
    JSON.stringify(localWeddingInfo) !== JSON.stringify(weddingInfo) ||
    JSON.stringify(localAccounts) !== JSON.stringify(accounts) ||
    JSON.stringify(localContacts) !== JSON.stringify(contacts) ||
    JSON.stringify(localDetails) !== JSON.stringify(details);

  // 기본 결혼 정보 업데이트
  const updateWeddingInfo = (data: Partial<WeddingInfo>) => {
    if (localWeddingInfo) {
      setLocalWeddingInfo({ ...localWeddingInfo, ...data });
    }
  };

  // 계좌 정보 업데이트
  const updateAccounts = (newAccounts: WeddingAccount[]) => {
    setLocalAccounts(newAccounts);
  };

  // 연락처 정보 업데이트
  const updateContacts = (newContacts: WeddingContact[]) => {
    setLocalContacts(newContacts);
  };

  // 기타 정보 업데이트
  const updateDetails = (data: Partial<WeddingDetails>) => {
    if (localDetails) {
      setLocalDetails({ ...localDetails, ...data });
    }
  };

  // 일괄 저장
  const saveAll = async () => {
    setIsSaving(true);

    try {
      // 1. 기본 결혼 정보 저장
      if (localWeddingInfo) {
        if (weddingInfo) {
          // 기존 데이터 수정
          await updateWeddingInfoAPI({
            id: localWeddingInfo.id,
            wedding_date: localWeddingInfo.wedding_date,
            venue_name: localWeddingInfo.venue_name,
            venue_address: localWeddingInfo.venue_address,
            groom_name: localWeddingInfo.groom_name,
            bride_name: localWeddingInfo.bride_name,
          });
        } else {
          // 새 데이터 생성
          await createWeddingInfo({
            wedding_date: localWeddingInfo.wedding_date,
            venue_name: localWeddingInfo.venue_name,
            venue_address: localWeddingInfo.venue_address,
            groom_name: localWeddingInfo.groom_name,
            bride_name: localWeddingInfo.bride_name,
          });
        }
        await mutateWeddingInfo();
      }

      // 2. 계좌 정보 저장 (기존 데이터 삭제 후 새로 생성)
      if (accounts && accounts.length > 0) {
        // 기존 계좌 삭제
        for (const account of accounts) {
          await deleteWeddingAccount(account.id);
        }
      }

      if (localAccounts.length > 0) {
        // 새 계좌 생성
        for (const account of localAccounts) {
          await createWeddingAccount({
            wedding_info_id: localWeddingInfo?.id || '',
            side: account.side,
            name: account.name,
            bank: account.bank,
            account_number: account.account_number,
            account_holder: account.account_holder,
          });
        }
      }
      await mutateAccounts();

      // 3. 연락처 정보 저장 (기존 데이터 삭제 후 새로 생성)
      if (contacts && contacts.length > 0) {
        // 기존 연락처 삭제
        for (const contact of contacts) {
          await deleteWeddingContact(contact.id);
        }
      }

      if (localContacts.length > 0) {
        // 새 연락처 생성
        for (const contact of localContacts) {
          await createWeddingContact({
            wedding_info_id: localWeddingInfo?.id || '',
            side: contact.side,
            role: contact.role,
            full_name: contact.full_name,
            contact_type: contact.contact_type,
            contact_value: contact.contact_value,
            contact_label: contact.contact_label,
          });
        }
      }
      await mutateContacts();

      // 4. 기타 정보 저장
      if (localDetails) {
        if (details) {
          // 기존 데이터 수정
          await updateWeddingDetailsAPI({
            id: localDetails.id,
            meal_info: localDetails.meal_info,
            parking_info: localDetails.parking_info,
          });
        } else {
          // 새 데이터 생성
          await createWeddingDetails({
            wedding_info_id: localWeddingInfo?.id || '',
            meal_info: localDetails.meal_info,
            parking_info: localDetails.parking_info,
          });
        }
        await mutateDetails();
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    // 데이터
    weddingInfo: localWeddingInfo,
    accounts: localAccounts,
    contacts: localContacts,
    details: localDetails,

    // 상태
    isLoading,
    isSaving,
    hasChanges,

    // 메서드
    saveAll,
    updateWeddingInfo,
    updateAccounts,
    updateContacts,
    updateDetails,
  };
}
