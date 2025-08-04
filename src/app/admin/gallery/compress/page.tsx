import { ImageCompressor } from '@/components/admin/gallery/ImageCompressor';
import { NavigationButton } from '@/components/header/NavigationButton';

export default function CompressPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">이미지 압축 관리</h1>
        <NavigationButton className="text-gray-900 hover:bg-gray-900/10" />
      </div>
      <ImageCompressor />
    </>
  );
}
