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

// 이미지 크기 생성 함수 (다양한 비율 시뮬레이션)
function generateImageDimensions(): { width: number; height: number } {
  const ratios = [
    { width: 1080, height: 1350 }, // 4:5 세로형
    { width: 1080, height: 1440 }, // 3:4 세로형
    { width: 1080, height: 1620 }, // 2:3 세로형
    { width: 1080, height: 1080 }, // 1:1 정사각형
    { width: 1350, height: 1080 }, // 5:4 가로형
    { width: 1440, height: 1080 }, // 4:3 가로형
    { width: 1620, height: 1080 }, // 3:2 가로형
  ];

  return faker.helpers.arrayElement(ratios);
}

// 실제 존재하는 이미지 URL 생성
function generateImageUrl(dimensions: { width: number; height: number }): string {
  const imageId = faker.number.int({ min: 1, max: 1000 });
  return `https://picsum.photos/${dimensions.width}/${dimensions.height}?random=${imageId}`;
}

// 갤러리 아이템 생성 함수
export function generateGalleryItem(): GalleryItem {
  const dimensions = generateImageDimensions();

  return {
    id: faker.string.uuid(),
    src: generateImageUrl(dimensions),
    width: dimensions.width,
    height: dimensions.height,
    likes: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    takenAt: faker.date.recent({ days: 30 }).toISOString(),
    name: generatePhotoName(),
    brideComment: generateKoreanComment(),
    groomComment: generateKoreanComment(),
    isLikedByUser: faker.datatype.boolean(),
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
