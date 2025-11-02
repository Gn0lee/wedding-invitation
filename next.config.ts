import type { NextConfig } from 'next';

// Image Optimization 최적화 상수
const IMAGE_CACHE_TTL_SECONDS = 2678400; // 31일 (60 * 60 * 24 * 31)

const nextConfig: NextConfig = {
  images: {
    // 캐시 최대화 (31일)
    minimumCacheTTL: IMAGE_CACHE_TTL_SECONDS,

    // 모바일 청첩장 최적화: 썸네일 크기 (width 지정 시 사용)
    // Masonry 2열 레이아웃 + Retina 디스플레이 고려
    imageSizes: [384, 512],

    // 모바일 청첩장 최적화: 모달 풀스크린 크기 (fill 사용 시)
    // 주 사용자: 모바일 디바이스 (640px), 큰 모바일/소형 태블릿 (750px)
    deviceSizes: [640, 750],

    // WebP만 사용 (AVIF 제거로 transformation 50% 감소)
    formats: ['image/webp'],

    remotePatterns:
      process.env.NODE_ENV === 'development'
        ? [
            // 개발 모드: 모든 도메인 허용
            {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '/**',
            },
          ]
        : [
            // 프로덕션 모드: Supabase Storage 갤러리 이미지만 최적화
            {
              protocol: 'https',
              hostname:
                process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace(
                  'http://',
                  '',
                ) || '',
              port: '',
              pathname: '/storage/v1/object/public/**',
            },
          ],
  },
  async headers() {
    return [
      {
        // 모든 경로에 보안 헤더 적용
        source: '/(.*)',
        headers: [
          // XSS 방지
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // MIME 타입 스니핑 방지
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // 클릭재킹 방지 (카카오 공유를 위해 SAMEORIGIN으로 변경)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // 참조자 정보 제한
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // HSTS (HTTPS 강제)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ka-f.fontawesome.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://t1.kakaocdn.net https://developers.kakao.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://ka-f.fontawesome.com",
              "font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com",
              `img-src 'self' data: blob: https: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').replace('http://', '')}` : ''}`,
              `media-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ? `https://${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').replace('http://', '')}` : ''} https://*.supabase.co`,
              `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://s.clarity.ms https://t1.kakaocdn.net https://developers.kakao.com https://sharer.kakao.com https://kapi.kakao.com ${process.env.NEXT_PUBLIC_SUPABASE_URL ? `https://${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').replace('http://', '')}` : ''} https://*.supabase.co`,
              "frame-src 'self' https://sharer.kakao.com https://developers.kakao.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://sharer.kakao.com",
            ].join('; '),
          },
          // Permissions Policy (구 Feature Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
              'magnetometer=()',
              'gyroscope=()',
              'accelerometer=()',
            ].join(', '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
