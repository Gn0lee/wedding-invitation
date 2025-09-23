'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { CarouselItem } from '@/components/ui/carousel';
import { GalleryCommentOverlay } from '@/domains/main/components/gallery/GalleryCommentOverlay';
import { GalleryLikeButton } from '@/domains/main/components/gallery/GalleryLikeButton';
import { GallerySkeleton } from '@/domains/main/components/gallery/GallerySkeleton';
import { GalleryItem as GalleryItemType } from '@/domains/main/types/items';

interface GalleryCarouselItemProps {
  item: GalleryItemType;
  index: number;
}

/**
 * 갤러리 모달 캐러셀의 개별 아이템 컴포넌트
 * Intersection Observer를 사용하여 화면에 0.7 이상 노출될 때 좋아요 정보를 로딩
 */
export function GalleryCarouselItem({ item, index }: GalleryCarouselItemProps) {
  const [shouldLoadLike, setShouldLoadLike] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 0.5 이상 노출될 때 좋아요 정보 로딩
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setShouldLoadLike(true);
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // 에러가 나도 스켈레톤은 사라지게
  };

  return (
    <CarouselItem key={item.id} className="m-auto">
      <div
        ref={itemRef}
        className="relative overflow-hidden rounded-xl"
        style={{
          aspectRatio: `${item.width} / ${item.height}`,
        }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 size-full">
            <GallerySkeleton />
          </div>
        )}
        <Image
          src={item.src}
          alt={item.name}
          fill
          className="object-contain"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* 좋아요 버튼 - Intersection Observer로 0.7 이상 노출될 때만 로딩 */}
        <GalleryLikeButton imageId={item.id} index={index} shouldLoad={shouldLoadLike} />

        {/* 코멘트 영역 */}
        {(item.brideComment || item.groomComment) && <GalleryCommentOverlay item={item} />}
      </div>
    </CarouselItem>
  );
}
