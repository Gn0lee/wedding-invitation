'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { navigationDrawerOpenAtom } from '@/stores/navigation';

const SECTIONS = [
  { id: 'main', label: '메인' },
  { id: 'remain-time', label: '카운트다운' },
  { id: 'location', label: '오시는 길' },
  { id: 'gallery', label: '갤러리' },
  { id: 'rsvp', label: '참석 여부' },
  { id: 'information', label: '안내사항' },
] as const;

export function NavigationDrawerContent() {
  const [open, setOpen] = useAtom(navigationDrawerOpenAtom);

  // 마운트 시에만 해시 처리
  useEffect(() => {
    const initialHash = window.location.hash;
    if (initialHash) {
      const element = document.querySelector(initialHash);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); // 기본 동작 방지

    // 1. 해당 섹션으로 스크롤
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. 스크롤 후 해시 변경
    setTimeout(() => {
      window.location.hash = `#${sectionId}`;
    }, 100); // 스크롤 시작 후 해시 변경

    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-bmJua text-xl">메뉴</DrawerTitle>
        </DrawerHeader>
        <nav className="px-4 pb-4">
          <ul className="space-y-4">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleSectionClick(e, section.id)}
                  className="block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
