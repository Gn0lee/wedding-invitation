import type { ContactType } from '@/domains/main/scheme/wedding-info';

export interface AccountInfo {
  name: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface ContactInfo {
  type: ContactType;
  value: string;
  label: string | null; // 선택적 라벨 (예: "휴대폰", "회사", "집" 등)
}

export interface ContactPerson {
  role: string; // 신랑, 신부, 신랑 아버지 등
  fullName: string; // 한국 이름
  contacts: ContactInfo[];
}

export interface InformationData {
  mealInfo: string;
  parkingInfo: string;
  groomAccounts: AccountInfo[];
  brideAccounts: AccountInfo[];
  groomContacts: ContactPerson[]; // 신랑측 연락처
  brideContacts: ContactPerson[]; // 신부측 연락처
}
