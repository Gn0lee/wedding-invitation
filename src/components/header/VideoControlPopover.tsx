'use client';

import { useAtom } from 'jotai';
import { Video } from 'lucide-react';
import { useState } from 'react';
import { VideoControlPopoverContent } from '@/components/header/VideoControlPopoverContent';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { isVideoVisibleAtom } from '@/domains/main/store/video';

export function VideoControlPopover() {
  const [isVideoVisible] = useAtom(isVideoVisibleAtom);

  const [open, setOpen] = useState(false);

  // 비디오가 보이지 않으면 렌더링하지 않음
  if (!isVideoVisible) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="size-9 text-gray-50 backdrop-blur-md hover:bg-white/10 hover:text-white [&_svg]:!size-6"
          aria-label="비디오 제어"
        >
          <Video />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-none bg-transparent p-2 backdrop-blur-none">
        <VideoControlPopoverContent onOpenChange={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
