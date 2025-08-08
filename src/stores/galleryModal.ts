import { atom } from 'jotai';

/**
 * 갤러리 모달 오픈 여부
 */
export const galleryModalOpenAtom = atom<boolean>(false);

/**
 * 갤러리 모달의 초기 인덱스 (열 때만 사용)
 */
export const galleryModalInitialIndexAtom = atom<number>(0);
