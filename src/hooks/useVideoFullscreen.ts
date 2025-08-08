'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { isVideoFullscreenAtom } from '@/domains/main/store/video';

/**
 * 비디오 풀스크린 모드를 제어하는 hook
 */
export function useVideoFullscreen(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const isFullscreen = useAtomValue(isVideoFullscreenAtom);
  const setIsFullscreen = useSetAtom(isVideoFullscreenAtom);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    const enterFullscreen = async (): Promise<boolean> => {
      const video = videoRef.current;
      if (!video || !video.requestFullscreen) {
        console.warn('Fullscreen not supported');
        return false;
      }

      try {
        await video.requestFullscreen();
        return true;
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
        return false;
      }
    };

    const exitFullscreen = async (): Promise<boolean> => {
      if (!document.exitFullscreen) {
        console.warn('Exit fullscreen not supported');
        return false;
      }

      try {
        await document.exitFullscreen();
        return true;
      } catch (error) {
        console.error('Failed to exit fullscreen:', error);
        return false;
      }
    };

    const handleFullscreenToggle = async () => {
      const shouldEnterFullscreen = isFullscreen && !document.fullscreenElement;
      const shouldExitFullscreen = !isFullscreen && document.fullscreenElement;

      if (shouldEnterFullscreen) {
        const success = await enterFullscreen();
        if (!success) {
          setIsFullscreen(false);
        }
      } else if (shouldExitFullscreen) {
        await exitFullscreen();
      }
    };

    handleFullscreenToggle();

    // 브라우저의 풀스크린 상태 변화 감지
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, setIsFullscreen, videoRef]);
}
