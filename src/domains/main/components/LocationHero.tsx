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
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A6237.webp',
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
          <HeroDescription>
            <p>로얄파크컨벤션, 1층 파크홀</p>
            <p>(서울특별시 용산구 이태원로 29)</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="pt-6">
          <div className="flex flex-col gap-8">
            <MapAppButtons />
            <Button
              asChild
              variant="secondary"
              className="w-fit border border-gray-50 bg-transparent text-gray-50 backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white/10 hover:text-white"
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
