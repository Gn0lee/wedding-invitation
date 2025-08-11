'use client';

import { format } from 'date-fns';
import { ko as dateFnsKo } from 'date-fns/locale';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/components/ui/calendar';
import { WEDDING_DATE } from '@/domains/main/data/date';
import { cn } from '@/lib/utils';

export function RemainTimeCalendar() {
  const formattedDate = format(WEDDING_DATE, 'yyyy년 M월 d일 a h시', {
    locale: dateFnsKo,
  });

  return (
    <Calendar
      mode="single"
      selected={WEDDING_DATE}
      className="size-full [--cell-size:1rem]"
      timeZone="Asia/Seoul"
      defaultMonth={WEDDING_DATE}
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
