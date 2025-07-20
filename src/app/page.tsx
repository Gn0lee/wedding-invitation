import { GalleryHero } from '@/domains/main/components/GalleryHero';
import { Header } from '@/domains/main/components/Header';
import { InformationSection } from '@/domains/main/components/InformationSection';
import { LocationHero } from '@/domains/main/components/LocationHero';
import { MainHero } from '@/domains/main/components/MainHero';
import { RemainTimeHero } from '@/domains/main/components/RemainTimeHero';
import { RSVPSection } from '@/domains/main/components/RSVPSection';

export default function Home() {
  return (
    <div className="size-full snap-y snap-mandatory overflow-y-auto">
      <div className="relative mx-auto w-fit">
        <Header />
        <MainHero />
        <RemainTimeHero />
        <LocationHero />
        <GalleryHero />
        <RSVPSection />
        <InformationSection />
      </div>
    </div>
  );
}
