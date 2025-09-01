import { format, parseISO } from 'date-fns';
import { ko as dateFnsKo } from 'date-fns/locale';
import { toZonedTime, formatInTimeZone, fromZonedTime } from 'date-fns-tz';

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
 * UTC 날짜 문자열을 한국 시간으로 변환하여 datetime-local 포맷의 문자열 반환
 * @param utcString UTC 날짜 문자열 (예: "2026-01-25T07:00:00.000Z")
 * @returns datetime-local 포맷의 문자열
 */
export function utcToKoreaTimeForDateTimeLocal(utcString: string): string {
  const utcDate = new Date(utcString);
  const koreaDate = toZonedTime(utcDate, KOREA_TZ);
  return formatInTimeZone(koreaDate, KOREA_TZ, "yyyy-MM-dd'T'HH:mm");
}

/**
 * 한국 시간 문자열을 UTC로 변환하여 서버에 저장할 날짜 문자열 반환
 * @param koreaString 한국 시간 문자열 (예: "2026-01-25 07:00")
 * @returns 서버에 저장할 UTC 날짜 문자열
 */
export function koreaTimeToUtcForDateTimeLocal(koreaString: string): string {
  const koreaDate = new Date(koreaString + ':00');
  const utcDate = fromZonedTime(koreaDate, KOREA_TZ);
  return utcDate.toISOString();
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
