import { AdminGuard } from '@/components/AdminGuard';

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
      </div>
    </AdminGuard>
  );
}
