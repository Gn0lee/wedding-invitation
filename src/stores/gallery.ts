import { atom } from 'jotai';
import { SortBy, SortOrder } from '@/domains/main/types/items';

// 정렬 상태 관리
export const gallerySortByAtom = atom<SortBy>('takenAt');
export const gallerySortOrderAtom = atom<SortOrder>('asc');
