'use client';

import { HeroSection } from '@/components/hero/HeroSection';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { HeroDescription } from '@/components/hero/HeroDescription';

export function GalleryHero() {
  return (
    <HeroSection id="gallery">
      <div className="absolute inset-0 bg-[#082D00]" />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            우리의
            <br />
            소중한 순간들
          </HeroTitle>
          <HeroDescription>함께 만들어가는 아름다운 추억</HeroDescription>
        </HeroTextColumn>
      </HeroContainer>
    </HeroSection>
  );
}
