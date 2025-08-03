import { z } from 'zod';

// 갤러리 아이템 추가 스키마 (파일 업로드용)
export const createGalleryItemFormSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size > 0, '파일을 선택해주세요'),
  name: z.string().min(1, '이름을 입력해주세요').max(100, '이름은 100자 이하여야 합니다'),
  brideComment: z.string().max(500, '코멘트는 500자 이하여야 합니다').optional(),
  groomComment: z.string().max(500, '코멘트는 500자 이하여야 합니다').optional(),
  takenAt: z.string().datetime('올바른 날짜 형식을 입력해주세요'),
});

// 갤러리 아이템 수정 스키마
export const updateGalleryItemSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(100, '이름은 100자 이하여야 합니다')
    .optional(),
  brideComment: z.string().max(500, '코멘트는 500자 이하여야 합니다').optional(),
  groomComment: z.string().max(500, '코멘트는 500자 이하여야 합니다').optional(),
});

export type CreateGalleryItemFormRequest = z.infer<typeof createGalleryItemFormSchema>;
export type UpdateGalleryItemRequest = z.infer<typeof updateGalleryItemSchema>;
