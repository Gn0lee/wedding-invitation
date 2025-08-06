import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HomeLink } from '@/components/HomeLink';
import { PageStyleWrapper } from '@/components/PageStyleWrapper';
import { GalleryHero } from '@/domains/gallery/components/GalleryHero';
import GalleryModalCarousel from '@/domains/gallery/components/GalleryModalCarousel';

export const metadata: Metadata = {
  title: '갤러리 - 이진호 ♥ 김태운 결혼식',
  description: '이진호와 김태운의 결혼식 갤러리입니다. 신랑신부의 아름다운 순간들을 확인해보세요.',
  openGraph: {
    title: '갤러리 - 이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식 갤러리입니다. 신랑신부의 아름다운 순간들을 확인해보세요.',
    images: [
      {
        url: '/images/main/040A1880.webp',
        width: 1200,
        height: 630,
        alt: '이진호 김태운 결혼식 갤러리',
      },
    ],
  },
  twitter: {
    title: '갤러리 - 이진호 ♥ 김태운 결혼식',
    description:
      '이진호와 김태운의 결혼식 갤러리입니다. 신랑신부의 아름다운 순간들을 확인해보세요.',
    images: ['/images/main/040A1880.webp'],
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
