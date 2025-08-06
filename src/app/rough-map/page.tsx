import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { MapHero } from '@/domains/location/components/MapHero';

export const metadata: Metadata = {
  title: '오시는 길 - 이진호 ♥ 김태운 결혼식',
  description:
    '이진호와 김태운의 결혼식 장소 안내입니다. 로얄파크컨벤션 파크홀로 오시는 길을 확인해보세요.',
  openGraph: {
    title: '오시는 길 - 이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식 장소 안내입니다. 로얄파크컨벤션 파크홀로 오시는 길을 확인해보세요.',
    images: [
      {
        url: '/images/location/230612-약도-명칭수정.png',
        width: 1200,
        height: 630,
        alt: '이진호 김태운 결혼식 장소 약도',
      },
    ],
  },
  twitter: {
    title: '오시는 길 - 이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식 장소 안내입니다. 로얄파크컨벤션 파크홀로 오시는 길을 확인해보세요.',
    images: ['/images/location/230612-약도-명칭수정.png'],
  },
};

export default function RoughMap() {
  return (
    <>
      <Header leftChildren={<HomeLink />} />
      <PageStyleWrapper>
        <MapHero />
      </PageStyleWrapper>
    </>
  );
}
