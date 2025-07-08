'use client';

import { useRemainTimeMessage } from '@/domains/main/hooks/useRemainTimeMessage';

export function RemainTimeDescription() {
  // 예식 시간(한국시간)
  const weddingDate = new Date('2026-01-25T16:00:00+09:00');
  const { state, days, hours, minutes, seconds } = useRemainTimeMessage(weddingDate);

  if (state === 'after') {
    return (
      <>
        <p>기다림 끝에 함께한 오늘,</p>
        <p>함께해주신 모든 분들께</p>
        <p>진심으로 감사드립니다</p>
      </>
    );
  }

  if (state === 'before') {
    return (
      <>
        <p>함께할 소중한 순간이</p>
        <p>조금씩 가까워지고 있어요</p>
        <p>
          <span className="inline-block w-[3ch] font-mono text-lg font-bold">{days}</span>일 후,
          만나요!
        </p>
      </>
    );
  }

  // countdown
  return (
    <>
      <p>설렘이 가득한 이 시간,</p>
      <p>
        이제 <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{hours}</span>시간{' '}
        <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{minutes}</span>분{' '}
        <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{seconds}</span>초
        남았어요.
      </p>
      <p>곧 만날 수 있어요!</p>
    </>
  );
}
