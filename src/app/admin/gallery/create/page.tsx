import { Home } from 'lucide-react';
import Link from 'next/link';
import { GalleryUploadForm } from '@/components/admin/gallery/GalleryUploadForm';
import { Button } from '@/components/ui/button';

export default function CreateGalleryPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">갤러리 아이템 추가</h1>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 size-4" />
            홈으로
          </Link>
        </Button>
      </div>
      <GalleryUploadForm />
    </>
  );
}
