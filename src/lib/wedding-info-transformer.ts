import type {
  WeddingInfoWithRelations,
  WeddingAccount,
  WeddingContact,
} from '@/domains/main/scheme/wedding-info';
import type { InformationData, AccountInfo, ContactPerson } from '@/types/information';

/**
 * Supabase 계좌 데이터를 InformationData 계좌 형태로 변환
 */
function transformAccounts(accounts: WeddingAccount[]): AccountInfo[] {
  return accounts.map((account) => ({
    name: account.name,
    bank: account.bank,
    accountNumber: account.account_number,
    accountHolder: account.account_holder,
  }));
}

/**
 * Supabase 연락처 데이터를 InformationData 연락처 형태로 변환
 */
function transformContacts(contacts: WeddingContact[]): ContactPerson[] {
  // role별로 그룹화
  const groupedContacts = contacts.reduce(
    (acc, contact) => {
      const key = `${contact.side}-${contact.role}`;
      if (!acc[key]) {
        acc[key] = {
          role: contact.role,
          fullName: contact.full_name,
          contacts: [],
        };
      }

      acc[key].contacts.push({
        type: contact.contact_type,
        value: contact.contact_value,
        label: contact.contact_label,
      });

      return acc;
    },
    {} as Record<string, ContactPerson>,
  );

  return Object.values(groupedContacts);
}

/**
 * Supabase wedding-info 데이터를 InformationData 형태로 변환
 * 필수 데이터가 없으면 빌드 실패
 */
export function transformWeddingData(weddingData: WeddingInfoWithRelations): InformationData {
  // 기본 wedding info 검증
  if (!weddingData.info) {
    throw new Error('Wedding info is required for build');
  }

  // 상세 정보 검증
  if (!weddingData.details) {
    throw new Error('Wedding details (meal_info, parking_info) are required for build');
  }

  if (!weddingData.details.meal_info) {
    throw new Error('Meal info is required for build');
  }

  if (!weddingData.details.parking_info) {
    throw new Error('Parking info is required for build');
  }

  // 계좌 정보 변환
  const groomAccounts = transformAccounts(
    weddingData.accounts.filter((account) => account.side === 'groom'),
  );
  const brideAccounts = transformAccounts(
    weddingData.accounts.filter((account) => account.side === 'bride'),
  );

  // 연락처 정보 변환
  const groomContacts = transformContacts(
    weddingData.contacts.filter((contact) => contact.side === 'groom'),
  );
  const brideContacts = transformContacts(
    weddingData.contacts.filter((contact) => contact.side === 'bride'),
  );

  return {
    mealInfo: weddingData.details.meal_info,
    parkingInfo: weddingData.details.parking_info,
    groomAccounts,
    brideAccounts,
    groomContacts,
    brideContacts,
  };
}

/**
 * 빌드 시점에서 wedding-info 데이터 검증
 * 데이터가 없거나 필수 필드가 누락되면 빌드 실패
 */
export function validateWeddingDataForBuild(weddingData: WeddingInfoWithRelations | null): void {
  if (!weddingData) {
    throw new Error(
      'Wedding information is required for build. Please configure wedding info in admin panel.',
    );
  }

  if (!weddingData.info) {
    throw new Error('Wedding info is required for build');
  }

  if (!weddingData.details) {
    throw new Error(
      'Wedding details are required for build. Please configure meal and parking information in admin panel.',
    );
  }

  if (!weddingData.details.meal_info) {
    throw new Error(
      'Meal info is required for build. Please configure meal information in admin panel.',
    );
  }

  if (!weddingData.details.parking_info) {
    throw new Error(
      'Parking info is required for build. Please configure parking information in admin panel.',
    );
  }

  // 계좌 정보가 하나 이상 있는지 확인
  if (weddingData.accounts.length === 0) {
    throw new Error(
      'At least one account is required for build. Please configure account information in admin panel.',
    );
  }

  // 연락처 정보가 하나 이상 있는지 확인
  if (weddingData.contacts.length === 0) {
    throw new Error(
      'At least one contact is required for build. Please configure contact information in admin panel.',
    );
  }
}
