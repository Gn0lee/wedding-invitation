import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/tw';

interface GallerySkeletonProps {
  className?: string;
}

export function GallerySkeleton({ className }: GallerySkeletonProps) {
  return (
    <Skeleton
      className={cn('aspect-[4/5] w-full rounded-lg bg-white/20 backdrop-blur-sm', className)}
    />
  );
}
