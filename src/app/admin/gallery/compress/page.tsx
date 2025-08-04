import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageCompressor } from '@/domains/admin/gallery/components/ImageCompressor';

export default function CompressPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">이미지 압축 관리</h1>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 size-4" />
            홈으로
          </Link>
        </Button>
      </div>
      <ImageCompressor />
    </>
  );
}
