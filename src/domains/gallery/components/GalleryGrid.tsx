'use client';

import { useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { GalleryItem } from '@/domains/gallery/components/GalleryItem';
import { GalleryGridSkeleton } from '@/domains/gallery/components/GallerySkeleton';
import { useGalleryItems } from '@/domains/gallery/hooks/useGalleryItems';

export function GalleryGrid() {
  const { items, isLoading, isValidating, hasMore, loadMore } = useGalleryItems();
  const observerRef = useRef<HTMLDivElement>(null);

  // 무한스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isValidating) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isValidating, loadMore]);

  // 초기 로딩 시 스켈레톤
  if (isLoading) {
    return <GalleryGridSkeleton count={12} />;
  }

  return (
    <div className="space-y-8">
      {/* 갤러리 그리드 - Masonry 사용 */}
      <Masonry
        breakpointCols={2}
        className="-ml-4 flex w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {items.map((item) => (
          <div key={item.id} className="mb-4">
            <GalleryItem item={item} />
          </div>
        ))}
      </Masonry>

      {/* 무한스크롤 로딩 */}
      {isValidating && (
        <div className="flex justify-center">
          <GalleryGridSkeleton count={6} />
        </div>
      )}

      {/* 무한스크롤 감지 요소 */}
      <div ref={observerRef} className="h-4" />
    </div>
  );
}
