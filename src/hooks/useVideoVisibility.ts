'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isVideoVisibleAtom } from '@/domains/main/store/video';

const INTERSECTION_THRESHOLD = 0.4;

/**
 * Intersection Observer를 사용하여 요소의 가시성을 추적하는 hook
 */
export function useVideoVisibility(containerRef: React.RefObject<HTMLDivElement | null>) {
  const setIsVideoVisible = useSetAtom(isVideoVisibleAtom);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.intersectionRatio >= INTERSECTION_THRESHOLD;
        setIsVideoVisible(isIntersecting);
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: '0px',
      },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      setIsVideoVisible(false);
    };
  }, [containerRef, setIsVideoVisible]);
}
