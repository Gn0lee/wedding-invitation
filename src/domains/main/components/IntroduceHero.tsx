import { HeroSection } from '@/components/hero/HeroSection';
import { BackgroundVideo } from '@/domains/main/components/introduce/BackgroundVideo';
import { WeddingInfo } from '@/domains/main/components/introduce/WeddingInfo';
import type { WeddingInfo as WeddingInfoType } from '@/domains/main/scheme/wedding-info';

interface IntroduceHeroProps {
  weddingInfo: WeddingInfoType;
}

export function IntroduceHero({ weddingInfo }: IntroduceHeroProps) {
  return (
    <HeroSection>
      <BackgroundVideo />
      <WeddingInfo weddingInfo={weddingInfo} />
    </HeroSection>
  );
}
