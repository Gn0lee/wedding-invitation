import type {
  CreateWeddingInfoRequest,
  UpdateWeddingInfoRequest,
  CreateWeddingAccountRequest,
  UpdateWeddingAccountRequest,
  CreateWeddingContactRequest,
  UpdateWeddingContactRequest,
  CreateWeddingDetailsRequest,
  UpdateWeddingDetailsRequest,
  WeddingInfo,
  WeddingAccount,
  WeddingContact,
  WeddingDetails,
} from '@/types/wedding-info';

// ===== 기본 결혼 정보 관리 =====

/**
 * 기본 결혼 정보를 조회합니다
 */
export async function getWeddingInfo(): Promise<WeddingInfo | null> {
  try {
    const response = await fetch('/api/admin/wedding-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('결혼 정보 조회 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('결혼 정보 조회 중 오류 발생:', error);
    return null;
  }
}

/**
 * 기본 결혼 정보를 생성합니다
 */
export async function createWeddingInfo(
  data: CreateWeddingInfoRequest,
): Promise<WeddingInfo | null> {
  try {
    const response = await fetch('/api/admin/wedding-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('결혼 정보 생성 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('결혼 정보 생성 중 오류 발생:', error);
    return null;
  }
}

/**
 * 기본 결혼 정보를 수정합니다
 */
export async function updateWeddingInfo(
  data: UpdateWeddingInfoRequest,
): Promise<WeddingInfo | null> {
  try {
    const response = await fetch('/api/admin/wedding-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('결혼 정보 수정 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('결혼 정보 수정 중 오류 발생:', error);
    return null;
  }
}

// ===== 계좌 정보 관리 =====

/**
 * 계좌 정보를 조회합니다
 */
export async function getWeddingAccounts(): Promise<WeddingAccount[]> {
  try {
    const response = await fetch('/api/admin/wedding-info/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('계좌 정보 조회 실패:', error);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('계좌 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 계좌 정보를 생성합니다
 */
export async function createWeddingAccount(
  data: CreateWeddingAccountRequest,
): Promise<WeddingAccount | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('계좌 정보 생성 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('계좌 정보 생성 중 오류 발생:', error);
    return null;
  }
}

/**
 * 계좌 정보를 수정합니다
 */
export async function updateWeddingAccount(
  data: UpdateWeddingAccountRequest,
): Promise<WeddingAccount | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/accounts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('계좌 정보 수정 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('계좌 정보 수정 중 오류 발생:', error);
    return null;
  }
}

/**
 * 계좌 정보를 삭제합니다
 */
export async function deleteWeddingAccount(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/wedding-info/accounts?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('계좌 정보 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('계좌 정보 삭제 중 오류 발생:', error);
    return false;
  }
}

// ===== 연락처 정보 관리 =====

/**
 * 연락처 정보를 조회합니다
 */
export async function getWeddingContacts(): Promise<WeddingContact[]> {
  try {
    const response = await fetch('/api/admin/wedding-info/contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('연락처 정보 조회 실패:', error);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('연락처 정보 조회 중 오류 발생:', error);
    return [];
  }
}

/**
 * 연락처 정보를 생성합니다
 */
export async function createWeddingContact(
  data: CreateWeddingContactRequest,
): Promise<WeddingContact | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('연락처 정보 생성 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('연락처 정보 생성 중 오류 발생:', error);
    return null;
  }
}

/**
 * 연락처 정보를 수정합니다
 */
export async function updateWeddingContact(
  data: UpdateWeddingContactRequest,
): Promise<WeddingContact | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/contacts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('연락처 정보 수정 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('연락처 정보 수정 중 오류 발생:', error);
    return null;
  }
}

/**
 * 연락처 정보를 삭제합니다
 */
export async function deleteWeddingContact(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/wedding-info/contacts?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('연락처 정보 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('연락처 정보 삭제 중 오류 발생:', error);
    return false;
  }
}

// ===== 기타 정보 관리 =====

/**
 * 기타 정보를 조회합니다
 */
export async function getWeddingDetails(): Promise<WeddingDetails | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('기타 정보 조회 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('기타 정보 조회 중 오류 발생:', error);
    return null;
  }
}

/**
 * 기타 정보를 생성합니다
 */
export async function createWeddingDetails(
  data: CreateWeddingDetailsRequest,
): Promise<WeddingDetails | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('기타 정보 생성 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('기타 정보 생성 중 오류 발생:', error);
    return null;
  }
}

/**
 * 기타 정보를 수정합니다
 */
export async function updateWeddingDetails(
  data: UpdateWeddingDetailsRequest,
): Promise<WeddingDetails | null> {
  try {
    const response = await fetch('/api/admin/wedding-info/details', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('기타 정보 수정 실패:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('기타 정보 수정 중 오류 발생:', error);
    return null;
  }
}
