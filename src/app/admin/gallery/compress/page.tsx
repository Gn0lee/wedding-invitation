import { ImageCompressor } from '@/components/admin/gallery/ImageCompressor';

export default function CompressPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">이미지 압축 관리</h1>
      <ImageCompressor />
    </>
  );
}
