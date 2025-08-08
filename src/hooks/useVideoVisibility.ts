'use client';

import { useEffect, useState } from 'react';

const INTERSECTION_THRESHOLD = 0.8;

/**
 * Intersection Observer를 사용하여 요소의 가시성을 추적하는 hook
 */
export function useVideoVisibility(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.intersectionRatio >= INTERSECTION_THRESHOLD;
        setIsVisible(isIntersecting);
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: '0px',
      },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return isVisible;
}
