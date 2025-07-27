'use client';

import { useAtom } from 'jotai';
import { Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gallerySortByAtom, gallerySortOrderAtom } from '@/stores/gallery';

export function GallerySort() {
  const [sortBy, setSortBy] = useAtom(gallerySortByAtom);
  const [sortOrder, setSortOrder] = useAtom(gallerySortOrderAtom);

  const handleSortChange = (newSortBy: 'createdAt' | 'likes') => {
    // 같은 정렬 기준을 클릭하면 순서만 바꾸기
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 다른 정렬 기준을 클릭하면 해당 기준으로 변경하고 기본값은 desc
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (type: 'createdAt' | 'likes') => {
    if (sortBy !== type) return null;
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  return (
    <div className="mb-4 mt-2 flex items-center gap-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
      <span className="text-sm font-medium text-white">정렬:</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange('createdAt')}
        className={`flex items-center gap-2 text-white hover:bg-white/20 ${
          sortBy === 'createdAt' ? 'bg-white/20' : ''
        }`}
      >
        <Calendar size={16} />
        <span>날짜순</span>
        {getSortIcon('createdAt')}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange('likes')}
        className={`flex items-center gap-2 text-white hover:bg-white/20 ${
          sortBy === 'likes' ? 'bg-white/20' : ''
        }`}
      >
        <Heart size={16} />
        <span>좋아요순</span>
        {getSortIcon('likes')}
      </Button>
    </div>
  );
}
