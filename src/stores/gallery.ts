import { atom } from 'jotai';
import { SortBy, SortOrder } from '@/domains/gallery/types';

// 정렬 상태 관리
export const gallerySortByAtom = atom<SortBy>('takenAt');
export const gallerySortOrderAtom = atom<SortOrder>('desc');
