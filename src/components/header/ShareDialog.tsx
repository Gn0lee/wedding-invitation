'use client';

import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink } from './ExternalLink';
import { KakaoShare } from './KakaoShare';

export function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-gray-50 backdrop-blur-md hover:bg-white/10 hover:text-white [&_svg]:!size-6"
          aria-label="공유하기"
        >
          <Share />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ExternalLink />
          <KakaoShare />
        </div>
      </DialogContent>
    </Dialog>
  );
}
