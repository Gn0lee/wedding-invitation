import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/gallery/components/GalleryHero';
import GalleryModalCarousel from '@/domains/gallery/components/GalleryModalCarousel';

export default function GalleryPage() {
  return (
    <>
      <Header leftChildren={<HomeLink />} />
      <PageStyleWrapper>
        <GalleryHero />
      </PageStyleWrapper>
      <GalleryModalCarousel />
    </>
  );
}
