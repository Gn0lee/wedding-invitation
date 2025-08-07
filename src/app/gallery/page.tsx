import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/gallery/components/GalleryHero';
import GalleryModalCarousel from '@/domains/gallery/components/GalleryModalCarousel';

export const metadata: Metadata = {
  title: '갤러리 - 태운 ♥ 진호의 결혼식',
  description: '태운 ♥ 진호의 아름다운 순간들을 확인해보세요.',
  openGraph: {
    title: '갤러리 - 태운 ♥ 진호의 결혼식',
    description: '태운 ♥ 진호의 아름다운 순간들을 확인해보세요.',
    images: [
      {
        url: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/3M1A0207%20(1).webp',
        width: 1920,
        height: 960,
        alt: '태운 ♥ 진호의 결혼식 갤러리',
      },
    ],
  },
  twitter: {
    title: '갤러리 - 태운 ♥ 진호의 결혼식',
    description: '태운 ♥ 진호의 아름다운 순간들을 확인해보세요.',
    images: [
      'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/3M1A0207%20(1).webp',
    ],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header leftChildren={<HomeLink />} />
      <PageStyleWrapper>
        <GalleryHero />
      </PageStyleWrapper>
      <GalleryModalCarousel />
    </>
  );
}
