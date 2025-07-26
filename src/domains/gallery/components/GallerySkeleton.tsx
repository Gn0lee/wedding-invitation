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
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <GallerySkeleton key={index} />
      ))}
    </div>
  );
}
