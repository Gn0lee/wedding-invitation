'use client';

import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { useProfile } from '@/hooks/useProfile';
import { navigationDrawerOpenAtom } from '@/stores/navigation';
import type { UserRole } from '@/types/profile';

type Section = {
  id: string;
  label: string;
  href?: string;
};

const BASE_SECTIONS: Section[] = [
  { id: 'main', label: '메인' },
  { id: 'remain-time', label: '예식 일정' },
  { id: 'location', label: '오시는 길' },
  { id: 'gallery', label: '갤러리' },
  { id: 'rsvp', label: '참석 여부' },
  { id: 'information', label: '안내사항' },
];

const ADMIN_SECTIONS: Section[] = [
  { id: 'admin-gallery-create', label: '갤러리 추가', href: '/admin/gallery/create' },
  { id: 'admin-gallery-manage', label: '갤러리 관리', href: '/admin/gallery/manage' },
  { id: 'admin-gallery-compress', label: '이미지 압축', href: '/admin/gallery/compress' },
  { id: 'admin-wedding-info', label: '결혼 정보 관리', href: '/admin/wedding-info' },
];

export function NavigationDrawerContent() {
  const [open, setOpen] = useAtom(navigationDrawerOpenAtom);
  const { profile } = useProfile();

  // 사용자 role에 따라 섹션 동적 생성
  const sections = useMemo(() => {
    const adminRoles: UserRole[] = ['admin', 'super_admin'];
    const isAdmin = profile?.role && adminRoles.includes(profile.role);

    if (isAdmin) {
      return [...BASE_SECTIONS, ...ADMIN_SECTIONS];
    }

    return BASE_SECTIONS;
  }, [profile?.role]);

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

  const handleScrollSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
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
          <DrawerDescription>원하시는 섹션을 클릭하면 바로 이동합니다.</DrawerDescription>
        </DrawerHeader>
        <nav className="overflow-y-auto px-4 pb-4">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                {section.href ? (
                  // href가 있는 경우 Next.js Link 사용
                  <Link
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {section.label}
                  </Link>
                ) : (
                  // href가 없는 경우 내부 스크롤 처리
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleScrollSectionClick(e, section.id)}
                    className="block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {section.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
