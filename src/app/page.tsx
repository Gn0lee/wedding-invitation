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
  title: '태운 ♥ 진호의 결혼식에 초대합니다',
  description: '26.01.25 16:00 로얄파크컨벤션 파크홀',
  openGraph: {
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
