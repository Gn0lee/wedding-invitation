import { Skeleton } from '@/components/ui/skeleton';

interface GallerySkeletonProps {
  className?: string;
}

export function GallerySkeleton({ className }: GallerySkeletonProps) {
  return <Skeleton className={`aspect-[4/5] w-full rounded-lg ${className}`} />;
}

// 갤러리 그리드용 스켈레톤 (여러 개)
export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="columns-3 gap-4 space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4 break-inside-avoid">
          <GallerySkeleton />
        </div>
      ))}
    </div>
  );
}
