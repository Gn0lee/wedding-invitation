import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { MapHero } from '@/domains/location/components/MapHero';

export default function RoughMap() {
  return (
    <PageStyleWrapper>
      <Header leftChildren={<HomeLink />} />
      <MapHero />
    </PageStyleWrapper>
  );
}
