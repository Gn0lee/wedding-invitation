import remainTimeBg from '@/assets/images/hero/remain-time-bg.webp';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { RemainTimeCalendar } from '@/domains/main/components/remain-time/Calendar';
import { RemainTimeDescription } from '@/domains/main/components/remain-time/RemainTimeDescription';
import type { WeddingInfo } from '@/domains/main/scheme/wedding-info';

interface RemainTimeHeroProps {
  weddingInfo: WeddingInfo;
}

export function RemainTimeHero({ weddingInfo }: RemainTimeHeroProps) {
  return (
    <HeroSection id="remain-time">
      <HeroBackground
        image={{
          src: remainTimeBg,
          alt: '남은 시간 배경',
          fill: true,
          className: 'brightness-[0.7]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            두 사람이
            <br />
            하나가 되는 날
          </HeroTitle>
          <HeroDescription>
            <RemainTimeDescription weddingDate={weddingInfo.wedding_date} />
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent>
          <RemainTimeCalendar weddingDate={weddingInfo.wedding_date} />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
