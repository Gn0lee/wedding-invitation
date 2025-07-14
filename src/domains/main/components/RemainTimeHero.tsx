import { HeroBackground } from '@/domains/main/components/hero/HeroBackground';
import { HeroContainer } from '@/domains/main/components/hero/HeroContainer';
import { HeroDescription } from '@/domains/main/components/hero/HeroDescription';
import { HeroSection } from '@/domains/main/components/hero/HeroSection';
import { HeroTextColumn } from '@/domains/main/components/hero/HeroTextColumn';
import { HeroTitle } from '@/domains/main/components/hero/HeroTitle';
import { RemainTimeDescription } from '@/domains/main/components/RemainTimeDescription';

export function RemainTimeHero() {
  return (
    <HeroSection>
      <HeroBackground
        image={{
          src: '/images/main/DSCF0748.jpg',
          alt: '남은 시간 배경',
          fill: true,
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            기다림 끝에
            <br />
            만날 그날
          </HeroTitle>
          <HeroDescription>
            <RemainTimeDescription />
          </HeroDescription>
        </HeroTextColumn>
      </HeroContainer>
    </HeroSection>
  );
}
