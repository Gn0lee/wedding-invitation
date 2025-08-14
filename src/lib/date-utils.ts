import { format, parseISO } from 'date-fns';
import { ko as dateFnsKo } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

const KOREA_TZ = 'Asia/Seoul';

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 Date 객체 반환
 * @param utcDateString UTC 날짜 문자열 (예: "2026-01-25T07:00:00.000Z")
 * @returns 한국 시간으로 변환된 Date 객체
 */
export function utcToKoreaTime(utcDateString: string): Date {
  const utcDate = parseISO(utcDateString);
  // date-fns-tz를 사용해서 한국 시간대로 변환
  return toZonedTime(utcDate, KOREA_TZ);
}

/**
 * UTC 날짜 문자열을 한국 시간으로 포맷팅
 * @param utcDateString UTC 날짜 문자열
 * @param formatString 포맷 문자열
 * @returns 포맷팅된 한국 시간 문자열
 */
export function formatKoreaTime(
  utcDateString: string,
  formatString: string = 'yyyy.M.d (E)',
): string {
  const koreaTime = utcToKoreaTime(utcDateString);
  return format(koreaTime, formatString, {
    locale: dateFnsKo,
  });
}
