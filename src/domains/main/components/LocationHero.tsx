import { Map } from 'lucide-react';
import Link from 'next/link';

import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { MapAppButtons } from '@/components/MapAppButtons';
import { Button } from '@/components/ui/button';

export function LocationHero() {
  return (
    <HeroSection id="location">
      <HeroBackground
        image={{
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A4059.webp',
          alt: '위치 배경',
          fill: true,
          className: 'brightness-[0.6]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            두 마음이
            <br />
            하나가 될 곳
          </HeroTitle>
          <HeroDescription>로얄파크 컨벤션 1F 파크홀</HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="pt-6">
          <div className="flex flex-col gap-8">
            <MapAppButtons />
            <Button
              asChild
              variant="secondary"
              className="w-fit border border-gray-50 bg-transparent text-gray-50 backdrop-blur-[1px] transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              size="lg"
            >
              <Link href="/rough-map">
                약도 자세히보기
                <Map />
              </Link>
            </Button>
          </div>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
