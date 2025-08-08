'use client';

import { useEffect } from 'react';

/**
 * 비디오 재생/일시정지를 제어하는 hook
 */
export function useVideoPlayback(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isPlaying: boolean,
) {
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [videoRef, isPlaying]);
}
