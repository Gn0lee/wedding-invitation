import { HeroBackground } from '@/domains/main/components/hero/HeroBackground';
import { HeroContainer } from '@/domains/main/components/hero/HeroContainer';
import { HeroDescription } from '@/domains/main/components/hero/HeroDescription';
import { HeroSection } from '@/domains/main/components/hero/HeroSection';
import { HeroTextColumn } from '@/domains/main/components/hero/HeroTextColumn';
import { HeroTitle } from '@/domains/main/components/hero/HeroTitle';

export function MainHero() {
  return (
    <HeroSection>
      <HeroBackground
        image={{
          src: '/images/main/DSCF0464.jpg',
          alt: 'Main Hero',
          fill: true,
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            태운과 진호의
            <br />
            첫 번째 약속에
            <br />
            함깨해 주세요
          </HeroTitle>
          <HeroDescription>
            <p>평생을 함께할 동반자로</p>
            <p>첫걸음을 내딛는 이 순간</p>
            <p>여러분과 함께하고 싶습니다</p>
          </HeroDescription>
        </HeroTextColumn>
      </HeroContainer>
    </HeroSection>
  );
}
