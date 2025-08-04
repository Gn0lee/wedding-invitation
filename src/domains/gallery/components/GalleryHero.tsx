'use client';

import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { KakaoLoginButton } from '@/components/KakaoLoginButton';
import { GalleryGrid } from '@/domains/gallery/components/GalleryGrid';
import { GallerySort } from '@/domains/gallery/components/GallerySort';
import { useAuth } from '@/hooks/useAuth';

export function GalleryHero() {
  const { user } = useAuth();

  return (
    <HeroSection id="gallery" className="bg-[#082D00]">
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            우리의 <br />
            소중한 순간들
          </HeroTitle>
          <GallerySort />
        </HeroTextColumn>
        <HeroBottomContent className="min-h-0 overflow-y-auto pt-0">
          {user ? (
            <GalleryGrid />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="mb-4 text-white/80">소중한 순간들을 함께 나누어요</p>
                <KakaoLoginButton innerText="카카오로 로그인하고 갤러리 보기" />
              </div>
            </div>
          )}
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
