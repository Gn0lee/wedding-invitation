import { differenceInSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';

export type RemainTimeState = 'before' | 'countdown' | 'after';

export interface RemainTimeResult {
  state: RemainTimeState;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const KOREA_TZ = 'Asia/Seoul';

export function useRemainTimeMessage(weddingDate: Date): RemainTimeResult {
  const [now, setNow] = useState(() => toZonedTime(new Date(), KOREA_TZ));

  useEffect(() => {
    const timer = setInterval(() => setNow(toZonedTime(new Date(), KOREA_TZ)), 1000);
    return () => clearInterval(timer);
  }, []);

  // weddingDate도 KST로 변환
  const weddingKST = toZonedTime(weddingDate, KOREA_TZ);
  const isAfter = now.getTime() > weddingKST.getTime();

  if (isAfter) {
    return { state: 'after', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = differenceInSeconds(weddingKST, now);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days >= 1) {
    return { state: 'before', days, hours, minutes, seconds };
  }
  // 1일 이하
  return { state: 'countdown', days, hours, minutes, seconds };
}
