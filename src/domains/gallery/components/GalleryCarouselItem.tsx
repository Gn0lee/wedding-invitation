'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { CarouselItem } from '@/components/ui/carousel';
import { GalleryCommentOverlay } from '@/domains/gallery/components/GalleryCommentOverlay';
import { GalleryLikeButton } from '@/domains/gallery/components/GalleryLikeButton';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types/items';

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
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 0.7 이상 노출될 때 좋아요 정보 로딩
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          setShouldLoadLike(true);
        }
      },
      {
        threshold: 0.7,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <CarouselItem key={item.id} className="m-auto">
      <div
        ref={itemRef}
        className="relative overflow-hidden rounded-xl"
        style={{
          aspectRatio: `${item.width} / ${item.height}`,
        }}
      >
        <Image src={item.src} alt={item.name} fill className="object-contain" priority={false} />

        {/* 좋아요 버튼 - Intersection Observer로 0.7 이상 노출될 때만 로딩 */}
        <GalleryLikeButton imageId={item.id} index={index} shouldLoad={shouldLoadLike} />

        {/* 코멘트 영역 */}
        {(item.brideComment || item.groomComment) && <GalleryCommentOverlay item={item} />}
      </div>
    </CarouselItem>
  );
}
