'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { WeddingInfo, CreateWeddingInfoRequest } from '@/types/wedding-info';

// 검증 스키마
const weddingInfoSchema = z.object({
  groom_name: z.string().min(1, '신랑 이름을 입력해주세요.'),
  bride_name: z.string().min(1, '신부 이름을 입력해주세요.'),
  wedding_date: z.string().min(1, '결혼 날짜를 입력해주세요.'),
  venue_name: z.string().min(1, '장소명을 입력해주세요.'),
  venue_address: z.string().min(1, '장소 주소를 입력해주세요.'),
});

type WeddingInfoFormData = z.infer<typeof weddingInfoSchema>;

interface WeddingInfoFormProps {
  data: WeddingInfo | null;
  onUpdate: (data: CreateWeddingInfoRequest) => void;
  isSubmitting?: boolean;
}

export function WeddingInfoForm({ data, onUpdate, isSubmitting = false }: WeddingInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WeddingInfoFormData>({
    resolver: zodResolver(weddingInfoSchema),
    defaultValues: {
      groom_name: data?.groom_name || '',
      bride_name: data?.bride_name || '',
      wedding_date: data?.wedding_date
        ? new Date(data.wedding_date).toISOString().slice(0, 16)
        : '',
      venue_name: data?.venue_name || '',
      venue_address: data?.venue_address || '',
    },
  });

  // 데이터가 변경되면 폼 리셋
  React.useEffect(() => {
    if (data) {
      reset({
        groom_name: data.groom_name,
        bride_name: data.bride_name,
        wedding_date: new Date(data.wedding_date).toISOString().slice(0, 16),
        venue_name: data.venue_name,
        venue_address: data.venue_address,
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: WeddingInfoFormData) => {
    // 날짜 형식 변환 (ISO string으로)
    const weddingDate = new Date(formData.wedding_date).toISOString();

    onUpdate({
      groom_name: formData.groom_name,
      bride_name: formData.bride_name,
      wedding_date: weddingDate,
      venue_name: formData.venue_name,
      venue_address: formData.venue_address,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 신랑 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">신랑 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groom_name">신랑 이름</Label>
              <Input
                id="groom_name"
                {...register('groom_name')}
                placeholder="신랑 이름을 입력하세요"
                className={errors.groom_name ? 'border-red-500' : ''}
              />
              {errors.groom_name && (
                <p className="text-sm text-red-500">{errors.groom_name.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 신부 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">신부 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bride_name">신부 이름</Label>
              <Input
                id="bride_name"
                {...register('bride_name')}
                placeholder="신부 이름을 입력하세요"
                className={errors.bride_name ? 'border-red-500' : ''}
              />
              {errors.bride_name && (
                <p className="text-sm text-red-500">{errors.bride_name.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 결혼 날짜 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">결혼 날짜</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wedding_date">결혼 날짜 및 시간</Label>
            <Input
              id="wedding_date"
              type="datetime-local"
              {...register('wedding_date')}
              className={errors.wedding_date ? 'border-red-500' : ''}
            />
            {errors.wedding_date && (
              <p className="text-sm text-red-500">{errors.wedding_date.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 장소 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">결혼식 장소</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venue_name">장소명</Label>
            <Input
              id="venue_name"
              {...register('venue_name')}
              placeholder="예: 로얄파크컨벤션 파크홀"
              className={errors.venue_name ? 'border-red-500' : ''}
            />
            {errors.venue_name && (
              <p className="text-sm text-red-500">{errors.venue_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue_address">주소</Label>
            <Input
              id="venue_address"
              {...register('venue_address')}
              placeholder="예: 서울특별시 용산구 이태원로 29길 74"
              className={errors.venue_address ? 'border-red-500' : ''}
            />
            {errors.venue_address && (
              <p className="text-sm text-red-500">{errors.venue_address.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 미리보기 */}
      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">미리보기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                신랑 {data.groom_name} & 신부 {data.bride_name}
              </p>
              <p>
                {new Date(data.wedding_date).toLocaleString('ko-KR')} | {data.venue_name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </form>
  );
}
