import { HeroSection } from '@/components/hero/HeroSection';
import { BackgroundVideo } from '@/domains/main/components/introduce/BackgroundVideo';
import { WeddingInfo } from '@/domains/main/components/introduce/WeddingInfo';

export function IntroduceHero() {
  return (
    <HeroSection>
      <BackgroundVideo />
      <WeddingInfo />
    </HeroSection>
  );
}
