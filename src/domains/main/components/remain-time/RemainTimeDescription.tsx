'use client';

import { useRemainTimeMessage } from '@/domains/main/hooks/useRemainTimeMessage';
import { utcToKoreaTime } from '@/lib/date-utils';

interface RemainTimeDescriptionProps {
  weddingDate: string;
}

export function RemainTimeDescription({ weddingDate }: RemainTimeDescriptionProps) {
  // UTC 날짜를 한국 시간으로 변환
  const weddingDateObj = utcToKoreaTime(weddingDate);
  // 예식 시간(한국시간)
  const { state, days, hours, minutes, seconds } = useRemainTimeMessage(weddingDateObj);

  if (state === 'after') {
    return <p>축하해 주신 모든 분들께 진심으로 감사드립니다</p>;
  }

  if (state === 'before') {
    return (
      <p>
        <span className="inline-block w-[3ch] font-mono text-lg font-bold">{days}</span>일 후에
        만나요!
      </p>
    );
  }

  // countdown
  return (
    <p>
      이제 <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{hours}</span>시간{' '}
      <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{minutes}</span>분{' '}
      <span className="inline-block w-[2.2ch] font-mono text-lg font-bold">{seconds}</span>초
      남았어요.
    </p>
  );
}
