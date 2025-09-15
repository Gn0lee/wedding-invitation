'use client';

import { Loader2 } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { Button } from '@/components/ui/button';
import { GalleryItem } from '@/domains/main/components/gallery/GalleryItem';
import { useGalleryItems } from '@/domains/main/hooks/useGalleryItems';

export function GalleryGrid() {
  const { items, isLoading, isValidating, hasMore, loadMore } = useGalleryItems();

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
      <Masonry columnsCount={2} gutter="16px">
        {items.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
      </Masonry>

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="mb-2 mt-6 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isValidating}
            className="w-full border border-gray-50 bg-transparent px-8 py-3 backdrop-blur-sm hover:border-gray-50 hover:bg-gray-50/20 disabled:border-gray-50 disabled:bg-gray-50/10 disabled:text-gray-50"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                로딩 중...
              </>
            ) : (
              '더보기'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
