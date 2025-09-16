import { parseISO } from 'date-fns';
import { ko as dateFnsKo } from 'date-fns/locale';
import { toZonedTime, formatInTimeZone, fromZonedTime } from 'date-fns-tz';

const KOREA_TZ = 'Asia/Seoul';

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 Date 객체 반환
 * @param utcDateString UTC 날짜 문자열 (예: "2026-01-25T07:00:00.000Z")
 * @returns 한국 시간으로 변환된 Date 객체
 */
export function utcToKoreaTime(utcDateString: string): Date {
  // UTC 문자열을 명시적으로 UTC로 파싱
  const utcDate = parseISO(utcDateString);

  // date-fns-tz를 사용하여 명시적으로 UTC에서 한국 시간대로 변환
  // 이렇게 하면 서버/클라이언트 환경에 관계없이 일관된 결과를 얻을 수 있음
  return toZonedTime(utcDate, KOREA_TZ);
}

/**
 * UTC 날짜 문자열을 한국 시간으로 변환하여 datetime-local 포맷의 문자열 반환
 * @param utcString UTC 날짜 문자열 (예: "2026-01-25T07:00:00.000Z")
 * @returns datetime-local 포맷의 문자열
 */
export function utcToKoreaTimeForDateTimeLocal(utcString: string): string {
  const utcDate = parseISO(utcString);
  return formatInTimeZone(utcDate, KOREA_TZ, "yyyy-MM-dd'T'HH:mm");
}

/**
 * 한국 시간 문자열을 UTC로 변환하여 서버에 저장할 날짜 문자열 반환
 * @param koreaString 한국 시간 문자열 (예: "2026-01-25 07:00")
 * @returns 서버에 저장할 UTC 날짜 문자열
 */
export function koreaTimeToUtcForDateTimeLocal(koreaString: string): string {
  const koreaDate = new Date(koreaString);
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
  const utcDate = parseISO(utcDateString);
  return formatInTimeZone(utcDate, KOREA_TZ, formatString, {
    locale: dateFnsKo,
  });
}
