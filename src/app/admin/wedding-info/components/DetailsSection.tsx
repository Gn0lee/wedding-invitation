'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useWeddingDetails } from '@/app/admin/wedding-info/hooks/useWeddingDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// 검증 스키마
const detailsSchema = z.object({
  meal_info: z.string().optional(),
  parking_info: z.string().optional(),
});

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsSectionProps {
  weddingInfoId: string;
}

export function DetailsSection({ weddingInfoId }: DetailsSectionProps) {
  const { details, updateDetails, isUpdating, updateError } = useWeddingDetails(weddingInfoId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      meal_info: details?.meal_info || '',
      parking_info: details?.parking_info || '',
    },
  });

  // 데이터가 변경되면 폼 리셋
  React.useEffect(() => {
    if (details) {
      reset({
        meal_info: details.meal_info || '',
        parking_info: details.parking_info || '',
      });
    }
  }, [details, reset]);

  const onSubmit = async (formData: DetailsFormData) => {
    try {
      await updateDetails({
        meal_info: formData.meal_info || null,
        parking_info: formData.parking_info || null,
      });
    } catch (error) {
      console.error('상세 정보 업데이트 오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 에러 메시지 */}
      {updateError && (
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p>{updateError}</p>
        </div>
      )}

      {/* 식사 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">식사 안내</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal_info">식사 정보</Label>
            <Textarea
              id="meal_info"
              {...register('meal_info')}
              placeholder="예: • 시간: 오후 3시 30분 ~ 5시 30분 (2시간)&#10;• 장소: 2층 연회장"
              rows={6}
              className={errors.meal_info ? 'border-red-500' : ''}
            />
            {errors.meal_info && <p className="text-sm text-red-500">{errors.meal_info.message}</p>}
            <p className="text-sm text-gray-500">
              식사 시간, 장소, 메뉴 등의 정보를 입력하세요. 줄바꿈을 사용하여 구분할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 주차 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">주차 안내</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parking_info">주차 정보</Label>
            <Textarea
              id="parking_info"
              {...register('parking_info')}
              placeholder="예: • 위치: 전쟁기념관 지상/지하 주차장&#10;• 요금: 2시간 무료, 이후 30분당 1,500원&#10;• 수용: 총 1,000대"
              rows={6}
              className={errors.parking_info ? 'border-red-500' : ''}
            />
            {errors.parking_info && (
              <p className="text-sm text-red-500">{errors.parking_info.message}</p>
            )}
            <p className="text-sm text-gray-500">
              주차장 위치, 요금, 수용 가능 대수 등의 정보를 입력하세요. 줄바꿈을 사용하여 구분할 수
              있습니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 미리보기 */}
      {(details?.meal_info || details?.parking_info) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">미리보기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {details.meal_info && (
              <div>
                <h4 className="mb-2 font-medium">식사 안내</h4>
                <div className="whitespace-pre-line rounded bg-gray-50 p-3 text-sm text-gray-600">
                  {details.meal_info}
                </div>
              </div>
            )}

            {details.parking_info && (
              <div>
                <h4 className="mb-2 font-medium">주차 안내</h4>
                <div className="whitespace-pre-line rounded bg-gray-50 p-3 text-sm text-gray-600">
                  {details.parking_info}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isUpdating}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isUpdating ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
