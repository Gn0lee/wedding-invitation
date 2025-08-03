'use client';

import { Link } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

export function ExternalLink() {
  const handleCopyLink = async () => {
    try {
      // 호스팅된 링크를 복사 (실제 링크로 변경 필요)
      const link = window.location.href;
      await navigator.clipboard.writeText(link);
      toast.success('링크가 복사되었습니다!');
    } catch {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return (
    <DialogClose asChild>
      <Button
        onClick={handleCopyLink}
        variant="outline"
        className="w-full justify-center gap-3"
        aria-label="링크 복사"
      >
        <Link className="size-5" />
        링크 복사하기
      </Button>
    </DialogClose>
  );
}
