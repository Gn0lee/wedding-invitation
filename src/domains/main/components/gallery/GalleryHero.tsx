import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { GalleryCarousel } from '@/domains/main/components/gallery/GalleryCarousel';

export function GalleryHero() {
  return (
    <HeroSection id="gallery">
      <HeroBackground
        image={{
          src: '/images/main/IMG_6479.JPG',
          alt: '갤러리 배경',
          fill: true,
          className: 'brightness-[0.4]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            우리 둘의
            <br />
            빛나는 순간들
          </HeroTitle>
          <HeroDescription>
            <p>설렘으로 수놓은</p>
            <p>사랑의 장면들</p>
            <p>지금 만나보세요</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="pt-0">
          <GalleryCarousel />
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
