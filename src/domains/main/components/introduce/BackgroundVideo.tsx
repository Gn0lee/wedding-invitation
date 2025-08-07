'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import {
  isVideoMutedAtom,
  isVideoPlayingAtom,
  isVideoFullscreenAtom,
} from '@/domains/main/store/video';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = useAtomValue(isVideoPlayingAtom);
  const isMuted = useAtomValue(isVideoMutedAtom);
  const isFullscreen = useAtomValue(isVideoFullscreenAtom);
  const setIsFullscreen = useSetAtom(isVideoFullscreenAtom);

  // 재생/멈춤 상태 변화 감지
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // 풀스크린 상태 변화 감지
  useEffect(() => {
    if (!videoRef.current) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    // 풀스크린 상태가 변경되었을 때
    const handleFullscreenToggle = async () => {
      if (isFullscreen && !document.fullscreenElement) {
        try {
          await videoRef.current!.requestFullscreen();
        } catch (error) {
          console.error('Fullscreen error:', error);
          setIsFullscreen(false);
        }
      } else if (!isFullscreen && document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch (error) {
          console.error('Exit fullscreen error:', error);
        }
      }
    };

    handleFullscreenToggle();

    // 브라우저의 풀스크린 상태 변화 감지
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, setIsFullscreen]);

  return (
    <div className="z-1 absolute inset-0 size-full">
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        playsInline
        loop
        preload="metadata"
        className="size-full object-cover brightness-50"
      >
        <source
          src="https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/background_720p.vp9.webm"
          type="video/webm; codecs=vp9"
        />
        <source
          src="https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/background_720p.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
