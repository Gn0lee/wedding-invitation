import { Header } from '@/components/Header';
import { NavigationButton } from '@/components/header/NavigationButton';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/main/components/GalleryHero';
import { InformationSection } from '@/domains/main/components/InformationSection';
import { LocationHero } from '@/domains/main/components/LocationHero';
import { MainHero } from '@/domains/main/components/MainHero';
import { NavigationDrawerContent } from '@/domains/main/components/NavigationDrawerContent';
import { RemainTimeHero } from '@/domains/main/components/RemainTimeHero';
import { RSVPSection } from '@/domains/main/components/RSVPSection';

export default function Home() {
  return (
    <>
      <PageStyleWrapper>
        <Header leftChildren={<NavigationButton />} />
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
