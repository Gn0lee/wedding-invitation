import { HeroBackground } from '@/domains/main/components/hero/HeroBackground';
import { HeroBottomContent } from '@/domains/main/components/hero/HeroBottomContent';
import { HeroContainer } from '@/domains/main/components/hero/HeroContainer';
import { HeroDescription } from '@/domains/main/components/hero/HeroDescription';
import { HeroSection } from '@/domains/main/components/hero/HeroSection';
import { HeroTextColumn } from '@/domains/main/components/hero/HeroTextColumn';
import { HeroTitle } from '@/domains/main/components/hero/HeroTitle';
import { Form } from '@/domains/main/components/rsvp/Form';

export function RSVPSection() {
  return (
    <HeroSection>
      <HeroBackground
        image={{
          src: '/images/main/040A5133.jpg',
          alt: '참석 여부 배경',
          fill: true,
          className: 'brightness-[0.6]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle className="text-center">참석 여부 전달</HeroTitle>
          <HeroDescription className="text-center">
            <p>축하의 마음으로 참석해주시는 한분 한분</p>
            <p>귀한 마음으로 모실 수 있도록</p>
            <p>부담없이 알려주신다면 정성을 다해 준비하겠습니다.</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="pt-8">
          <Form />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
