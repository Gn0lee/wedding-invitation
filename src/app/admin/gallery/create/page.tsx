import { GalleryUploadForm } from '@/components/admin/gallery/GalleryUploadForm';
import { NavigationButton } from '@/components/header/NavigationButton';

export default function CreateGalleryPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">갤러리 아이템 추가</h1>
        <NavigationButton className="text-gray-900 hover:bg-gray-900/10" />
      </div>
      <GalleryUploadForm />
    </>
  );
}
