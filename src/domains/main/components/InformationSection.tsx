import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { InformationContent } from '@/domains/main/components/information/InformationContent';
import type { InformationData } from '@/types/information';

interface InformationSectionProps {
  data: InformationData;
}

export function InformationSection({ data }: InformationSectionProps) {
  const finalData = data;

  return (
    <HeroSection id="information" className="h-dvh">
      <HeroBackground
        image={{
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/DSCF0079.webp',
          alt: '안내사항 배경',
          fill: true,
          className: 'brightness-[0.5]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle className="text-center">안내사항</HeroTitle>
          <HeroDescription className="text-center">
            <p>식사, 주차, 연락처 등</p>
            <p>참석하시는 분들을 위한</p>
            <p>유용한 정보를 확인하세요</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="min-h-0 overflow-y-auto pt-8">
          <InformationContent data={finalData} />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
