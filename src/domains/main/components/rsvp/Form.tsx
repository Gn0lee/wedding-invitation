'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Info, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';

import { KakaoLoginButton } from '@/components/KakaoLoginButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { FormContainer } from '@/domains/main/components/rsvp/FormContainer';
import { SuccessDialog } from '@/domains/main/components/rsvp/SuccessDialog';
import { useAuth } from '@/hooks/useAuth';
import { useRSVP, submitRSVP, updateRSVP } from '@/hooks/useRSVP';
import { formToAPIRequest } from '@/lib/rsvp';
import { RSVPFormValues } from '@/types/rsvp';

export function Form() {
  const { user, loading } = useAuth();
  const { rsvpData, mutate, isLoading: rsvpLoading } = useRSVP();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RSVPFormValues>({
    defaultValues: {
      side: '',
      attend: '',
      adult: '0',
      child: '0',
      meal: '',
      agree: false,
    },
  });

  // 기존 RSVP 데이터가 있으면 폼 초기화
  useEffect(() => {
    if (rsvpData) {
      setValue('side', rsvpData.side);
      setValue('attend', rsvpData.attend);
      setValue('meal', rsvpData.meal || '');
      setValue('adult', String(rsvpData.adult_count));
      setValue('child', String(rsvpData.child_count));
      // 개인정보 동의는 매번 새로 선택
      setValue('agree', false);
    }
  }, [rsvpData, setValue]);

  // 현재 폼 상태 감지
  const attendValue = useWatch({ control, name: 'attend' });
  const mealValue = useWatch({ control, name: 'meal' });

  // 참석할 때만 식사여부 표시
  const showMealSection = attendValue === 'yes';

  // 참석하고 식사할 때만 인원 입력 표시
  const showPersonnelSection = attendValue === 'yes' && mealValue === 'yes';

  // 조건 변경 시 하위 값들 자동 초기화
  const handleAttendChange = (value: 'yes' | 'no' | '') => {
    if (value === 'no') {
      // 불참으로 변경 시 식사여부, 대인, 소인 초기화
      setValue('meal', '');
      setValue('adult', '0');
      setValue('child', '0');
    } else if (value === 'yes') {
      // 참석으로 변경 시 식사여부 초기화, 대인은 1로 설정
      setValue('meal', '');
      setValue('adult', '1');
      setValue('child', '0');
    }
  };

  const handleMealChange = (value: 'yes' | 'no' | '') => {
    if (value === 'no') {
      // 식사 안함으로 변경 시 대인, 소인 모두 0으로 설정
      setValue('adult', '0');
      setValue('child', '0');
    } else if (value === 'yes') {
      // 식사로 변경 시 대인은 1로 설정
      setValue('adult', '1');
      setValue('child', '0');
    }
  };

  const onSubmit = async (data: RSVPFormValues) => {
    try {
      setIsSubmitting(true);
      const apiData = formToAPIRequest(data);

      // SWR mutate를 사용하여 optimistic update
      await mutate(
        async () => {
          if (rsvpData) {
            return await updateRSVP(apiData);
          }

          return await submitRSVP(apiData);
        },
        {
          revalidate: false, // 즉시 캐시 갱신
        },
      );

      // 성공 메시지 표시
      const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || '고객';
      const message = rsvpData
        ? `${userName}님의 참석여부가 수정되었습니다.\n 참여에 진심으로 감사드립니다.`
        : `${userName}님의 참석여부가 전달되었습니다.\n 참여에 진심으로 감사드립니다.`;

      setSuccessMessage(message);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('RSVP 제출 오류:', error);
      alert('제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <FormContainer>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="size-12 animate-spin text-gray-500" />
        </div>
      </FormContainer>
    );
  }

  if (!user) {
    return (
      <FormContainer>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
          <p className="text-center text-gray-50">참석 여부를 전달하려면 로그인이 필요합니다.</p>
          <KakaoLoginButton next="/#rsvp" />
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full min-h-0 flex-col overflow-y-auto">
        {/* 입력 그룹 전체 */}
        <div className="flex flex-1 flex-col gap-3">
          {/* 신랑측/신부측 */}
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-50">신랑측/신부측</div>
            <Controller
              name="side"
              control={control}
              rules={{ required: '필수 선택 항목입니다.' }}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <ToggleGroupItem value="groom">신랑측</ToggleGroupItem>
                  <ToggleGroupItem value="bride">신부측</ToggleGroupItem>
                </ToggleGroup>
              )}
            />
            {errors.side && (
              <p className="mt-1 text-xs text-red-500">{errors.side.message as string}</p>
            )}
          </div>

          {/* 참석 여부 */}
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-50">참석 여부</div>
            <Controller
              name="attend"
              control={control}
              rules={{ required: '필수 선택 항목입니다.' }}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleAttendChange(value as 'yes' | 'no' | '');
                  }}
                  className="w-full"
                  size="lg"
                  variant="outline"
                >
                  <ToggleGroupItem value="yes">참석</ToggleGroupItem>
                  <ToggleGroupItem value="no">불참</ToggleGroupItem>
                </ToggleGroup>
              )}
            />
            {errors.attend && (
              <p className="mt-1 text-xs text-red-500">{errors.attend.message as string}</p>
            )}
          </div>

          {/* 식사 여부 - 참석할 때만 표시 */}
          <AnimatePresence>
            {showMealSection && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="mb-3 text-sm font-semibold text-gray-50">식사 여부</div>
                <Controller
                  name="meal"
                  control={control}
                  rules={{ required: '필수 선택 항목입니다.' }}
                  render={({ field }) => (
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleMealChange(value as 'yes' | 'no' | '');
                      }}
                      className="w-full"
                      size="lg"
                      variant="outline"
                    >
                      <ToggleGroupItem value="yes">식사</ToggleGroupItem>
                      <ToggleGroupItem value="no">식사 안함</ToggleGroupItem>
                    </ToggleGroup>
                  )}
                />
                {errors.meal && (
                  <p className="mt-1 text-xs text-red-500">{errors.meal.message as string}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 대인/소인 - 참석하고 식사할 때만 표시 */}
          <AnimatePresence>
            {showPersonnelSection && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex justify-evenly"
              >
                <div>
                  <Label className="mb-2 text-sm text-gray-50" htmlFor="adult">
                    대인
                  </Label>
                  <Controller
                    name="adult"
                    control={control}
                    rules={{
                      required: '대인 인원을 입력해 주세요.',
                      min: { value: 0, message: '0명 이상 입력해 주세요.' },
                    }}
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const next = Math.max(Number(field.value) - 1, 0);
                            field.onChange(String(next));
                          }}
                          aria-label="대인 인원 감소"
                        >
                          <Minus />
                        </Button>
                        <Input
                          id="adult"
                          type="number"
                          min={0}
                          value={field.value}
                          onChange={field.onChange}
                          className="w-12 text-center text-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const next = Number(field.value) + 1;
                            field.onChange(String(next));
                          }}
                          aria-label="대인 인원 증가"
                        >
                          <Plus />
                        </Button>
                      </div>
                    )}
                  />
                  {errors.adult && (
                    <p className="mt-1 text-xs text-red-500">{errors.adult.message as string}</p>
                  )}
                </div>
                {/* 소인 */}
                <div>
                  <div className="mb-2 flex items-center gap-1">
                    <Label className="text-sm text-gray-50" htmlFor="child">
                      소인
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            tabIndex={0}
                            className="ml-1 cursor-pointer align-middle text-gray-50"
                          >
                            <Info size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">만 7세 ~ 12세 (초등학생)</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Controller
                    name="child"
                    control={control}
                    rules={{
                      min: { value: 0, message: '0명 이상 입력해 주세요.' },
                    }}
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const next = Math.max(Number(field.value) - 1, 0);
                            field.onChange(String(next));
                          }}
                          aria-label="소인 인원 감소"
                        >
                          <Minus />
                        </Button>
                        <Input
                          id="child"
                          type="number"
                          min={0}
                          value={field.value}
                          onChange={field.onChange}
                          className="w-12 text-center text-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const next = Number(field.value) + 1;
                            field.onChange(String(next));
                          }}
                          aria-label="소인 인원 증가"
                        >
                          <Plus />
                        </Button>
                      </div>
                    )}
                  />
                  {errors.child && (
                    <p className="mt-1 text-xs text-red-500">{errors.child.message as string}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex min-h-0 flex-col gap-2">
          {/* 개인정보 안내문 + 동의 체크박스 */}
          {/* 개인정보 동의 안내문 타이틀 */}
          <Label className="mb-1 text-sm font-semibold text-gray-50">
            개인정보 수집 및 이용 동의
          </Label>
          {/* 안내문 스크롤 영역 */}
          <div className="min-h-0 shrink rounded border border-gray-300 p-3 text-sm text-gray-700">
            <ul className="list-disc pl-4 text-gray-50">
              <li>이용 목적: 결혼식 참석여부 확인</li>
              <li>제공 항목: 참석여부, 동행인원, 식사여부</li>
              <li>보유 기간: 결혼식 종료 후 1개월</li>
            </ul>
            <p className="mt-2 text-xs font-semibold text-gray-50">
              * 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 참석여부
              서비스 이용이 제한됩니다.
            </p>
          </div>
          {/* 동의 체크박스 */}
          <div className="flex flex-none items-center gap-2">
            <Controller
              name="agree"
              control={control}
              rules={{ required: '동의가 필요합니다.' }}
              render={({ field }) => (
                <Checkbox id="agree" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="agree" className="cursor-pointer text-sm font-bold">
              수집 및 이용에 동의합니다.
            </Label>
          </div>
          {errors.agree && (
            <p className="mt-1 text-xs text-red-500">{errors.agree.message as string}</p>
          )}
        </div>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting || rsvpLoading}
          className="mt-4 w-full bg-gray-50 text-sm text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          variant="outline"
        >
          {isSubmitting ? '처리 중...' : rsvpData ? '수정하기' : '제출하기'}
        </Button>
      </form>

      {/* 성공 다이얼로그 */}
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        message={successMessage}
      />
    </FormContainer>
  );
}
