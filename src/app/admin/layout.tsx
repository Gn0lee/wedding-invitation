import type { Metadata, Viewport } from 'next';
import { AdminGuard } from '@/components/AdminGuard';
import { NavigationDrawerContent } from '@/domains/main/components/NavigationDrawerContent';

export const metadata: Metadata = {
  title: '관리자 페이지',
  description: '관리자 전용 페이지입니다.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  other: {
    googlebot: 'noindex, nofollow',
    robots: 'noindex, nofollow',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
        <NavigationDrawerContent />
      </div>
    </AdminGuard>
  );
}
