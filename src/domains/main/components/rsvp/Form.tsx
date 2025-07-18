'use client';

import { Plus, Minus, Info } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface RSVPFormValues {
  side: 'groom' | 'bride' | '';
  attend: 'yes' | 'no' | '';
  adult: string;
  child: string;
  agree: boolean;
}

export function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RSVPFormValues>({
    defaultValues: {
      side: '',
      attend: '',
      adult: '0',
      child: '0',
      agree: false,
    },
  });

  const onSubmit = (data: RSVPFormValues) => {
    alert('제출 완료!');
    console.log(data);
  };

  return (
    <div className="mx-auto flex size-full flex-col rounded-xl border border-white/40 bg-white/20 p-4 shadow-xl backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        {/* 입력 그룹 전체 */}
        <div className="flex flex-1 flex-col gap-3">
          {/* 신랑측/신부측 */}
          <div>
            <span className="mb-1 text-xs font-semibold text-gray-50">신랑측/신부측</span>
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
            <span className="mb-1 text-xs font-semibold text-gray-50">참석 여부</span>
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
          {/* 대인 */}
          <div>
            <Label className="mb-1 text-xs text-gray-50" htmlFor="adult">
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
            <div className="mb-1 flex items-center gap-1">
              <Label className="text-xs text-gray-50" htmlFor="child">
                소인
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className="ml-1 cursor-pointer align-middle text-gray-50">
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
          {/* 동의 체크박스 */}
          {/* 기존 동의 체크박스 영역 삭제 */}
        </div>
        {/* 개인정보 안내문 + 동의 체크박스 (ScrollArea) */}
        {/* 개인정보 동의 안내문 타이틀 */}
        <div className="mb-1 flex items-center gap-1">
          <span className="text-base font-semibold">개인정보 수집 및 이용 동의</span>
          <span className="text-base font-semibold text-sky-500">(필수)</span>
        </div>
        {/* 안내문 스크롤 영역 */}
        <ScrollArea className="rounded border border-gray-300 p-3 text-sm text-gray-700">
          <ul className="list-disc pl-4 text-gray-50">
            <li>이용 목적: 행사 참석여부 확인</li>
            <li>제공 항목: 성함, 대표 연락처, 동행인원, 식사여부 중 제공받는 정보에 한함</li>
            <li>보유 기간: 모바일 청첩장 만료시까지</li>
          </ul>
          <p className="mt-2 text-xs font-semibold text-gray-50">
            * 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 참석여부 서비스
            이용이 제한됩니다.
          </p>
        </ScrollArea>
        {/* 동의 체크박스 */}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox id="agree" {...register('agree', { required: '동의가 필요합니다.' })} />
          <Label htmlFor="agree" className="text-base font-bold">
            수집 및 이용에 동의합니다.
          </Label>
        </div>
        {errors.agree && (
          <p className="mt-1 text-xs text-red-500">{errors.agree.message as string}</p>
        )}
        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="mt-auto h-11 w-full rounded-lg border border-white/50 bg-white/70 text-sm text-gray-900 hover:bg-white/90"
        >
          제출하기
        </Button>
      </form>
    </div>
  );
}
