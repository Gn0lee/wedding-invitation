'use client';

import { useAtom } from 'jotai';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gallerySortByAtom, gallerySortOrderAtom } from '@/stores/gallery';

export function GallerySort() {
  const [sortBy, setSortBy] = useAtom(gallerySortByAtom);
  const [sortOrder, setSortOrder] = useAtom(gallerySortOrderAtom);

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'takenAt-desc':
        setSortBy('takenAt');
        setSortOrder('desc');
        break;
      case 'takenAt-asc':
        setSortBy('takenAt');
        setSortOrder('asc');
        break;
      case 'likes-desc':
        setSortBy('likes');
        setSortOrder('desc');
        break;
      default:
        setSortBy('takenAt');
        setSortOrder('asc');
    }
  };

  const getCurrentValue = () => {
    if (sortBy === 'takenAt' && sortOrder === 'desc') return 'takenAt-desc';
    if (sortBy === 'takenAt' && sortOrder === 'asc') return 'takenAt-asc';
    if (sortBy === 'likes' && sortOrder === 'desc') return 'likes-desc';
    return 'takenAt-asc';
  };

  return (
    <div className="mb-4 mt-2 flex justify-end">
      <Select value={getCurrentValue()} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[140px] border-white/20 bg-white/10 text-white backdrop-blur-sm focus:border-white/40 focus:ring-white/20">
          <SelectValue placeholder="정렬 선택" />
        </SelectTrigger>
        <SelectContent className="border-white/20 bg-white/10 backdrop-blur-sm">
          <SelectItem value="takenAt-asc">시간순</SelectItem>
          <SelectItem value="takenAt-desc">최신순</SelectItem>
          <SelectItem value="likes-desc">인기순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
