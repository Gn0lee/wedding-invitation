'use client';

import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { GalleryGrid } from '@/domains/gallery/components/GalleryGrid';
import { GallerySort } from '@/domains/gallery/components/GallerySort';

export function GalleryHero() {
  return (
    <HeroSection id="gallery" className="h-dvh bg-[#BFCAC3]">
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            우리의 <br />
            소중한 순간들
          </HeroTitle>
          <GallerySort />
        </HeroTextColumn>
        <HeroBottomContent className="h-full min-h-0 overflow-y-auto pt-0">
          <GalleryGrid />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
