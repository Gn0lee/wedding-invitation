import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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
            // 프로덕션 모드: Supabase Storage만 허용
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
          // 클릭재킹 방지
          {
            key: 'X-Frame-Options',
            value: 'DENY',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ka-f.fontawesome.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://ka-f.fontawesome.com",
              "font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com",
              `img-src 'self' data: blob: https: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').replace('http://', '')}` : ''}`,
              `connect-src 'self' https://www.google-analytics.com https://analytics.google.com ${process.env.NEXT_PUBLIC_SUPABASE_URL ? `https://${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').replace('http://', '')}` : ''} https://*.supabase.co`,
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
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
