'use client';

import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import videoPoster from '@/assets/images/hero/video-poster.webp';
import {
  isVideoMutedAtom,
  isVideoPlayingAtom,
  isVideoVisibleAtom,
} from '@/domains/main/store/video';
import { useVideoFullscreen } from '@/hooks/useVideoFullscreen';
import { useVideoPlayback } from '@/hooks/useVideoPlayback';
import { useVideoVisibility } from '@/hooks/useVideoVisibility';

export function BackgroundVideo() {
  const isPlaying = useAtomValue(isVideoPlayingAtom);
  const isMuted = useAtomValue(isVideoMutedAtom);
  const isVisible = useAtomValue(isVideoVisibleAtom);

  // refs 생성
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 가시성 추적 (isVideoVisibleAtom은 이 훅에서 자동으로 관리됨)
  useVideoVisibility(containerRef);

  // 실제 재생 상태는 전역 상태와 가시성을 결합
  const shouldPlay = isPlaying && isVisible;

  // 비디오 재생/일시정지 제어
  useVideoPlayback(videoRef, shouldPlay);

  // 풀스크린 제어
  useVideoFullscreen(videoRef);

  return (
    <div ref={containerRef} className="z-1 absolute inset-0 size-full bg-[#082D00]">
      <video
        ref={videoRef}
        muted={isMuted}
        playsInline
        loop
        preload="metadata"
        className="size-full object-cover brightness-50"
        poster={videoPoster.src}
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
