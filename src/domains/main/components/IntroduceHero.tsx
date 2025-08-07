import { HeroSection } from '@/components/hero/HeroSection';
import { BackgroundVideo } from '@/domains/main/components/introduce/BackgroundVideo';
import { BackgroundVideoController } from '@/domains/main/components/introduce/BackgroundVideoController';

export function IntroduceHero() {
  return (
    <HeroSection>
      <BackgroundVideo />
      <BackgroundVideoController />
    </HeroSection>
  );
}
