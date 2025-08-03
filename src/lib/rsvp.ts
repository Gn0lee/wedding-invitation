import { z } from 'zod';
import { RSVPFormValues, RSVPRequest } from '@/types/rsvp';

// RSVP 데이터 검증 스키마
const rsvpSchema = z
  .object({
    side: z.enum(['groom', 'bride']),
    attend: z.enum(['yes', 'no']),
    meal: z.enum(['yes', 'no']).nullable(),
    adult_count: z.number().min(0),
    child_count: z.number().min(0),
    agree_terms: z.boolean(),
  })
  .refine(
    (data) => {
      // 참석 시 식사 여부 필수
      if (data.attend === 'yes' && data.meal === null) {
        return false;
      }
      return true;
    },
    {
      message: '참석 시 식사 여부를 선택해주세요.',
      path: ['meal'],
    },
  )
  .refine(
    (data) => {
      // 불참 시 식사 관련 정보는 null이어야 함
      if (data.attend === 'no' && data.meal !== null) {
        return false;
      }
      return true;
    },
    {
      message: '불참 시 식사 정보가 포함되어 있습니다.',
      path: ['meal'],
    },
  )
  .refine(
    (data) => {
      // 식사 안함 시 인원수는 0이어야 함
      if (data.meal === 'no' && (data.adult_count > 0 || data.child_count > 0)) {
        return false;
      }
      return true;
    },
    {
      message: '식사 안함 선택 시 인원수는 0이어야 합니다.',
      path: ['adult_count', 'child_count'],
    },
  );

/**
 * 폼 데이터를 API 요청 데이터로 변환
 */
export function formToAPIRequest(formData: RSVPFormValues): RSVPRequest {
  return {
    side: formData.side as 'groom' | 'bride',
    attend: formData.attend as 'yes' | 'no',
    meal: formData.meal === '' ? null : (formData.meal as 'yes' | 'no'),
    adult_count: parseInt(formData.adult) || 0,
    child_count: parseInt(formData.child) || 0,
    agree_terms: formData.agree,
  };
}

/**
 * RSVP 데이터 검증 (Zod 사용)
 */
export function validateRSVPData(data: RSVPRequest): { isValid: boolean; error?: string } {
  try {
    rsvpSchema.parse(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 첫 번째 에러 메시지 반환
      const firstError = error.errors[0];
      return { isValid: false, error: firstError.message };
    }
    return { isValid: false, error: '데이터 검증에 실패했습니다.' };
  }
}
