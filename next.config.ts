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
};

export default nextConfig;
