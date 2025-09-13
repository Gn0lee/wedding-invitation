import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { NavigationButton } from '@/components/header/NavigationButton';
import { NavigationDrawerContent } from '@/components/NavigationDrawerContent';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/main/components/gallery/GalleryHero';
import { InformationSection } from '@/domains/main/components/InformationSection';
import { IntroduceHero } from '@/domains/main/components/IntroduceHero';
import { LocationHero } from '@/domains/main/components/LocationHero';
import { MainHero } from '@/domains/main/components/MainHero';
import { RemainTimeHero } from '@/domains/main/components/RemainTimeHero';
import { RSVPSection } from '@/domains/main/components/RSVPSection';
import { getWeddingInfoWithRelationsForBuild } from '@/lib/api/wedding-info-build';
import { transformWeddingData, validateWeddingDataForBuild } from '@/lib/wedding-info-transformer';

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

export default async function Home() {
  // wedding-info 데이터 조회 (빌드용)
  const weddingData = await getWeddingInfoWithRelationsForBuild();

  // 데이터 검증 (없으면 빌드 실패)
  validateWeddingDataForBuild(weddingData);

  // UI 컴포넌트용 데이터로 변환
  const informationData = transformWeddingData(weddingData!);

  return (
    <>
      <Header leftChildren={<NavigationButton />} />
      <PageStyleWrapper>
        <IntroduceHero weddingInfo={weddingData!.info} />
        <MainHero />
        <RemainTimeHero weddingInfo={weddingData!.info} />
        <GalleryHero />
        <LocationHero />
        <RSVPSection />
        <InformationSection data={informationData} />
      </PageStyleWrapper>
      <NavigationDrawerContent />
    </>
  );
}
