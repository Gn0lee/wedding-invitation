// 카카오 인앱 브라우저 감지 함수
export const isKakaoInApp = () => /KAKAOTALK/i.test(navigator.userAgent);

/**
 * 카카오 로그인 쿼리 파라미터 생성 함수
 * @param baseParams 기본 쿼리 파라미터
 * @param baseParams.prompt 카카오 로그인 프롬프트, 카카오 인앱 브라우저인 경우 'none'으로 오버라이드
 * @returns 카카오 로그인 쿼리 파라미터
 */
export const getKakaoLoginQueryParams = (baseParams: Record<string, string> = {}) => {
  const queryParams = { ...baseParams };

  // 카카오 인앱 브라우저인 경우에만 prompt 파라미터 추가
  if (isKakaoInApp()) {
    queryParams.prompt = 'none';
  }

  return queryParams;
};
