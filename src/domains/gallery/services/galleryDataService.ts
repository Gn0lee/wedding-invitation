import { fakerKO as faker } from '@faker-js/faker';
import { GalleryItem } from '@/domains/gallery/types';

// 사진 이름 생성 함수
function generatePhotoName(): string {
  return faker.book.title();
}

// 한국어 코멘트 생성 함수
function generateKoreanComment(): string | null {
  return faker.datatype.boolean() ? faker.lorem.sentence() : null;
}

// 갤러리 아이템 생성 함수
export function generateGalleryItem(): GalleryItem {
  return {
    id: faker.string.uuid(),
    src: faker.image.urlLoremFlickr({ category: 'people' }),
    likes: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    modifiedAt: faker.date.recent({ days: 7 }).toISOString(),
    name: generatePhotoName(),
    brideComment: generateKoreanComment(),
    groomComment: generateKoreanComment(),
  };
}

// 갤러리 아이템 목록 생성 함수
export function generateGalleryItems(count: number): GalleryItem[] {
  return Array.from({ length: count }, () => generateGalleryItem());
}

import { SortBy, SortOrder } from '@/domains/gallery/types';

// 정렬 함수
export function sortGalleryItems(
  items: GalleryItem[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): GalleryItem[] {
  const sortedItems = [...items];

  return sortedItems.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortBy === 'createdAt') {
      aValue = new Date(a.createdAt).getTime();
      bValue = new Date(b.createdAt).getTime();
    } else {
      aValue = a.likes;
      bValue = b.likes;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

// 전체 데이터 (실제로는 DB에서 가져올 예정)
export const TOTAL_ITEMS = 90;
export const allItems = generateGalleryItems(TOTAL_ITEMS);
