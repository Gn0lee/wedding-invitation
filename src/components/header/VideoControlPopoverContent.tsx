'use client';

import { useAtom } from 'jotai';
import { Play, Pause, VolumeOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isVideoMutedAtom, isVideoPlayingAtom } from '@/domains/main/store/video';

interface VideoControlPopoverContentProps {
  onOpenChange: (open: boolean) => void;
}

export function VideoControlPopoverContent({ onOpenChange }: VideoControlPopoverContentProps) {
  const [isPlaying, setIsPlaying] = useAtom(isVideoPlayingAtom);
  const [isMuted, setIsMuted] = useAtom(isVideoMutedAtom);

  const togglePlay = () => {
    onOpenChange(false);
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    onOpenChange(false);
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* 재생/일시정지 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="h-8 justify-start gap-2 border border-gray-50/20 bg-gray-50/10 px-2 text-gray-50 backdrop-blur-md transition-all duration-200 hover:bg-gray-50/20 hover:text-gray-50"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </Button>

      {/* 음소거/음성 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMute}
        className="h-8 justify-start gap-2 border border-gray-50/20 bg-gray-50/10 px-2 text-gray-50 backdrop-blur-md transition-all duration-200 hover:bg-gray-50/20 hover:text-gray-50"
      >
        {isMuted ? <VolumeOff size={14} /> : <Volume2 size={14} />}
      </Button>

      {/* 전체화면 */}
      {/* TODO: 모바일 대응 */}
      {/* <Button
        variant="ghost"
        size="sm"
        onClick={toggleFullscreen}
        className="h-8 justify-start gap-2 border border-gray-50/20 bg-gray-50/10 px-2 text-gray-50 backdrop-blur-md transition-all duration-200 hover:bg-gray-50/20 hover:text-gray-50"
      >
        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </Button> */}
    </div>
  );
}
