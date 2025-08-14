'use client';

import { format } from 'date-fns';
import { ko as dateFnsKo } from 'date-fns/locale';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/components/ui/calendar';
import { utcToKoreaTime } from '@/lib/date-utils';
import { cn } from '@/lib/utils';

interface RemainTimeCalendarProps {
  weddingDate: string;
}

export function RemainTimeCalendar({ weddingDate }: RemainTimeCalendarProps) {
  // UTC 날짜를 한국 시간으로 변환
  const weddingDateObj = utcToKoreaTime(weddingDate);
  const formattedDate = format(weddingDateObj, 'yyyy년 M월 d일 a h시', {
    locale: dateFnsKo,
  });

  return (
    <Calendar
      mode="single"
      selected={weddingDateObj}
      className="size-full [--cell-size:1rem]"
      timeZone="Asia/Seoul"
      defaultMonth={weddingDateObj}
      locale={ko}
      classNames={{
        root: 'bg-white/20 backdrop-blur-sm rounded-xl border border-white/40',
        nav: 'hidden',
        outside: 'text-gray-50/20',
      }}
      components={{
        MonthCaption(props) {
          return (
            <div className={cn('text-sm font-semibold', props.className)}>{formattedDate}</div>
          );
        },
      }}
    />
  );
}
