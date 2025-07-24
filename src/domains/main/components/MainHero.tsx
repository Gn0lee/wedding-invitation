import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';

export function MainHero() {
  return (
    <HeroSection id="main">
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
        <HeroBottomContent>
          <p className="leading-loose">
            <span>이진구 · 이선배</span>
            <span className="align-baseline text-xs"> 의 차남 </span>
            <span className="text-2xl font-extrabold drop-shadow">진호</span>
          </p>
          <p className="leading-loose">
            <span>김종현 · 임송미</span>
            <span className="align-baseline text-xs"> 의 장녀 </span>
            <span className="text-2xl font-extrabold drop-shadow">태운</span>
          </p>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
