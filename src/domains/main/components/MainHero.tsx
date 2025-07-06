import { HeroBackground } from '@/domains/main/components/hero/HeroBackground';
import { HeroContainer } from '@/domains/main/components/hero/HeroContainer';
import { HeroDescription } from '@/domains/main/components/hero/HeroDescription';
import { HeroSection } from '@/domains/main/components/hero/HeroSection';
import { HeroTextColumn } from '@/domains/main/components/hero/HeroTextColumn';
import { HeroTitle } from '@/domains/main/components/hero/HeroTitle';

export function MainHero() {
  return (
    <HeroSection>
      <HeroBackground src="/images/main/DSCF0464.jpg" alt="Main Hero" />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            태운이와 진호의
            <br />
            설레는 첫 시작에
            <br />
            여러분을 초대합니다
          </HeroTitle>
          <HeroDescription>
            <p>2026년 1월 26일</p>
            <p>오후 4시</p>
            <p>로얄파크 컨벤션 파크홀</p>
          </HeroDescription>
        </HeroTextColumn>
      </HeroContainer>
    </HeroSection>
  );
}
