import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { MapHero } from '@/domains/location/components/MapHero';

export const metadata: Metadata = {
  title: '오시는 길 - 태운 ♥ 진호의 결혼식',
  description: '로얄파크 컨벤션 파크홀로 오시는 길을 확인해보세요.',
  openGraph: {
    title: '오시는 길 - 태운 ♥ 진호의 결혼식',
    description: '태운 ♥ 진호의 결혼식 장소 안내입니다.',
    images: [
      {
        url: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A5972%20(1).webp',
        width: 1920,
        height: 960,
        alt: '태운 ♥ 진호의 결혼식 장소 약도',
      },
    ],
  },
  twitter: {
    title: '오시는 길 - 태운 ♥ 진호의 결혼식',
    description: '태운 ♥ 진호의 결혼식 장소 안내입니다.',
    images: [
      'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A5972%20(1).webp',
    ],
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
