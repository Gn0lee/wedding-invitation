import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { GalleryGrid } from '@/domains/main/components/gallery/GalleryGrid';

export function GalleryHero() {
  return (
    <HeroSection id="gallery" className="h-dvh">
      <HeroBackground
        image={{
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/3M1A0207.webp',
          alt: '갤러리 배경',
          fill: true,
          className: 'brightness-[0.4]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            우리들의
            <br />
            빛나는 순간들
          </HeroTitle>
          <HeroDescription>
            <p>설렘으로 수놓은 사랑의 장면들</p>
            <p>지금 만나보세요</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="mt-4 h-full min-h-0 overflow-y-auto pt-0">
          <GalleryGrid />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
