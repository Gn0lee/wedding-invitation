'use client';

import { useAtom } from 'jotai';
import { Maximize2, Minimize2, Play, Pause, VolumeOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  isVideoMutedAtom,
  isVideoPlayingAtom,
  isVideoFullscreenAtom,
} from '@/domains/main/store/video';

export function BackgroundVideoController() {
  const [isPlaying, setIsPlaying] = useAtom(isVideoPlayingAtom);
  const [isMuted, setIsMuted] = useAtom(isVideoMutedAtom);
  const [isFullscreen, setIsFullscreen] = useAtom(isVideoFullscreenAtom);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={togglePlay}
        className="bg-black/50 text-white hover:bg-black/70"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleMute}
        className="bg-black/50 text-white hover:bg-black/70"
      >
        {isMuted ? <VolumeOff size={16} /> : <Volume2 size={16} />}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleFullscreen}
        className="bg-black/50 text-white hover:bg-black/70"
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </Button>
    </div>
  );
}
