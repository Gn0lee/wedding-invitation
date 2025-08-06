'use client';

import Script from 'next/script';

export function KakaoSdkInstaller() {
  return (
    <Script
      id="kakao-script"
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
      crossOrigin="anonymous"
      onLoad={() => {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_SDK_KEY;
        if (kakaoKey && typeof window !== 'undefined' && window.Kakao) {
          window.Kakao.init(kakaoKey);
        }
      }}
    />
  );
}
