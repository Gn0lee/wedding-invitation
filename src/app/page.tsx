import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { NavigationButton } from '@/components/header/NavigationButton';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/main/components/gallery/GalleryHero';
import { InformationSection } from '@/domains/main/components/InformationSection';
import { LocationHero } from '@/domains/main/components/LocationHero';
import { MainHero } from '@/domains/main/components/MainHero';
import { NavigationDrawerContent } from '@/domains/main/components/NavigationDrawerContent';
import { RemainTimeHero } from '@/domains/main/components/RemainTimeHero';
import { RSVPSection } from '@/domains/main/components/RSVPSection';

export const metadata: Metadata = {
  title: '이진호 ♥ 김태운 결혼식',
  description:
    '이진호와 김태운의 결혼식에 초대합니다. 2026년 1월 25일 토요일 오후 4시, 로얄파크컨벤션 파크홀에서 진행됩니다.',
  openGraph: {
    title: '이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식에 초대합니다. 2026년 1월 25일 토요일 오후 4시, 로얄파크컨벤션 파크홀에서 진행됩니다.',
    images: [
      {
        url: '/images/main/040A1880.webp',
        width: 1200,
        height: 630,
        alt: '이진호 김태운 결혼식 청첩장',
      },
    ],
  },
  twitter: {
    title: '이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식에 초대합니다. 2026년 1월 25일 토요일 오후 4시, 로얄파크컨벤션 파크홀에서 진행됩니다.',
    images: ['/images/main/040A1880.webp'],
  },
};

export default function Home() {
  return (
    <>
      <Header leftChildren={<NavigationButton />} />
      <PageStyleWrapper>
        <MainHero />
        <RemainTimeHero />
        <LocationHero />
        <GalleryHero />
        <RSVPSection />
        <InformationSection />
      </PageStyleWrapper>
      <NavigationDrawerContent />
    </>
  );
}
