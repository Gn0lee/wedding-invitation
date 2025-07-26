'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Masonry from 'react-responsive-masonry';
import { GalleryItem } from '@/domains/gallery/components/GalleryItem';
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

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader2 className="size-12 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div>
      {/* React Responsive Masonry 레이아웃 */}
      <Masonry columnsCount={3} gutter="16px">
        {items.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </Masonry>

      {/* 무한스크롤 감지 요소 */}
      <div ref={observerRef} className="mt-4 h-4">
        {hasMore && <Loader2 className="size-full animate-spin text-gray-500" />}
      </div>
    </div>
  );
}
