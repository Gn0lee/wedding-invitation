'use client';

import { useAtom } from 'jotai';
import { type SortBy } from '@/domains/gallery/types';
import { gallerySortByAtom } from '@/stores/gallery';

export function GallerySort() {
  const [sortBy, setSortBy] = useAtom(gallerySortByAtom);

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="mb-4 mt-2 flex justify-end gap-4">
      <button
        onClick={() => handleSortChange('takenAt')}
        className={`text-sm transition-colors ${
          sortBy === 'takenAt' ? 'font-semibold text-white' : 'text-white/60 hover:text-white/80'
        }`}
      >
        최신순
      </button>
      <button
        onClick={() => handleSortChange('likes')}
        className={`text-sm transition-colors ${
          sortBy === 'likes' ? 'font-semibold text-white' : 'text-white/60 hover:text-white/80'
        }`}
      >
        인기순
      </button>
    </div>
  );
}
