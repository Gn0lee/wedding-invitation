'use client';

import { useEffect, useRef } from 'react';
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
      {/* 갤러리 그리드 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>

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
