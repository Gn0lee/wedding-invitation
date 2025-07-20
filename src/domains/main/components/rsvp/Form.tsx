'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Info } from 'lucide-react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface RSVPFormValues {
  side: 'groom' | 'bride' | '';
  attend: 'yes' | 'no' | '';
  adult: string;
  child: string;
  meal: 'yes' | 'no' | '';
  agree: boolean;
}

export function Form() {
  const {
    handleSubmit,
    control,
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

  // 현재 폼 상태 감지
  const attendValue = useWatch({ control, name: 'attend' });
  const mealValue = useWatch({ control, name: 'meal' });

  // 참석할 때만 식사여부 표시
  const showMealSection = attendValue === 'yes';

  // 참석하고 식사할 때만 인원 입력 표시
  const showPersonnelSection = attendValue === 'yes' && mealValue === 'yes';

  const onSubmit = (data: RSVPFormValues) => {
    console.log('Form submitted:', data);
    alert('제출 완료!');
  };

  return (
    <div className="mx-auto h-full rounded-xl border border-white/40 bg-white/20 p-4 shadow-xl backdrop-blur-sm">
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
                  onValueChange={field.onChange}
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
                      onValueChange={field.onChange}
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
          className="mt-4 w-full bg-white/70 text-sm text-gray-50 hover:bg-white/90"
          variant="outline"
        >
          제출하기
        </Button>
      </form>
    </div>
  );
}
