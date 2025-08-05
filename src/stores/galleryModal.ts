import { atom } from 'jotai';

/**
 * 갤러리 모달(캐러셀) 오픈 여부와 현재 인덱스를 저장하는 Atom
 */
export const galleryModalAtom = atom<{ open: boolean; index: number }>({
  open: false,
  index: 0,
});
