import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/gallery/components/GalleryHero';

export default function GalleryPage() {
  return (
    <PageStyleWrapper>
      <Header leftChildren={<HomeLink />} />
      <GalleryHero />
    </PageStyleWrapper>
  );
}
