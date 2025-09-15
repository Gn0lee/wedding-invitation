import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GallerySkeletonProps {
  className?: string;
}

export function GallerySkeleton({ className }: GallerySkeletonProps) {
  return (
    <Skeleton className={cn('size-full rounded-lg bg-white/20 backdrop-blur-sm', className)} />
  );
}
