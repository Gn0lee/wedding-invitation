export interface AccountInfo {
  name: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface InformationData {
  mealInfo: string;
  parkingInfo: string;
  groomAccounts: AccountInfo[];
  brideAccounts: AccountInfo[];
}

// 정적 데이터 (기본값)
export const defaultInformationData: InformationData = {
  mealInfo: `
    식사는 오후 12시부터 시작됩니다.
    식사 장소: 2층 다이닝홀
    식사 시간: 약 1시간 30분
    식사 후에는 커피와 디저트를 즐기실 수 있습니다.
  `,
  parkingInfo: `
    주차는 지하 1층 주차장을 이용해 주세요.
    주차비는 무료입니다.
    주차장 입구는 건물 동쪽에 위치해 있습니다.
    주차 후 1층 로비로 이동하시면 됩니다.
  `,
  groomAccounts: [
    {
      name: '신랑',
      bank: '신한은행',
      accountNumber: '110-123-456789',
      accountHolder: '김철수',
    },
    {
      name: '신랑 아버지',
      bank: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '김영수',
    },
    {
      name: '신랑 어머니',
      bank: '우리은행',
      accountNumber: '1002-123-456789',
      accountHolder: '이미영',
    },
  ],
  brideAccounts: [
    {
      name: '신부',
      bank: '하나은행',
      accountNumber: '123-456789-12345',
      accountHolder: '박영희',
    },
    {
      name: '신부 아버지',
      bank: '농협은행',
      accountNumber: '123-456789-01',
      accountHolder: '박민수',
    },
    {
      name: '신부 어머니',
      bank: '기업은행',
      accountNumber: '123-456789-01',
      accountHolder: '최수진',
    },
  ],
};

// 동적 데이터를 가져오는 함수 (향후 확장용)
export async function fetchInformationData(): Promise<InformationData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/information');
  // return response.json();
  
  // 현재는 정적 데이터 반환
  return defaultInformationData;
} 