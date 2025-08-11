import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { RemainTimeCalendar } from '@/domains/main/components/remain-time/Calendar';
import { RemainTimeDescription } from '@/domains/main/components/remain-time/RemainTimeDescription';

export function RemainTimeHero() {
  return (
    <HeroSection id="remain-time">
      <HeroBackground
        image={{
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/DSCF0748.webp',
          alt: '남은 시간 배경',
          fill: true,
          className: 'brightness-[0.6]',
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
        <HeroBottomContent>
          <RemainTimeCalendar />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
