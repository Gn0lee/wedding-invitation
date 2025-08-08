import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

import { KakaoSdkInstaller } from '@/components/KakaoSdkInstaller';
import { SWRProvider } from '@/components/swr-provider';
import { Toaster } from '@/components/ui/sonner';

const bmJua = localFont({
  src: '../../public/fonts/BMJUA.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-bmjua',
});

const nanumRound = localFont({
  src: [
    { path: '../../public/fonts/NanumSquareRoundR.woff2', weight: '400' },
    { path: '../../public/fonts/NanumSquareRoundB.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-nanum-round',
});

export const metadata: Metadata = {
  title: '태운 ♥ 진호의 결혼식에 초대합니다',
  description: '26.01.25 16:00 로얄파크컨벤션 파크홀',
  keywords: ['결혼식', '청첩장', '모바일 청첩장', '이진호', '김태운', '웨딩'],
  authors: [{ name: '이진호, 김태운' }],
  creator: '이진호',
  publisher: '이진호',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wedding-invitation-one-orcin.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '태운 ♥ 진호의 결혼식에 초대합니다',
    title: '태운 ♥ 진호의 결혼식에 초대합니다',
    description: '26.01.25 16:00 로얄파크컨벤션 파크홀',
    images: [
      {
        url: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A2346%20(1).webp',
        width: 1920,
        height: 960,
        alt: '이진호 김태운 결혼식 청첩장',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '태운 ♥ 진호의 결혼식에 초대합니다',
    description: '26.01.25 16:00 로얄파크컨벤션 파크홀',
    images: [
      'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A2346%20(1).webp',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': '태운 ♥ 진호의 결혼식에 초대합니다',
    'application-name': '태운 ♥ 진호의 결혼식에 초대합니다',
    'msapplication-TileColor': '#ffffff',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Vercel 환경변수를 사용하여 정확한 production 환경 감지
  const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        {isProduction && clarityId && (
          <Script
            id="clarity-script"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}
        <KakaoSdkInstaller />
      </head>
      <body className={clsx(bmJua.variable, nanumRound.variable, 'antialiased', 'font-nanumRound')}>
        <SWRProvider>{children}</SWRProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
