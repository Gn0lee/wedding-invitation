'use client';

import { CheckCircle, AlertCircle } from 'lucide-react';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { UploadFile } from '@/domains/admin/gallery/scheme/types';

interface StatusIconProps {
  status: UploadFile['status'];
}

export const StatusIcon = memo(({ status }: StatusIconProps) => {
  switch (status) {
    case 'pending':
      return <div className="size-4 rounded-full bg-gray-300" />;
    case 'uploading':
      return <div className="size-4 animate-pulse rounded-full bg-blue-500" />;
    case 'success':
      return <CheckCircle className="size-4 text-green-500" />;
    case 'error':
      return <AlertCircle className="size-4 text-red-500" />;
  }
});

StatusIcon.displayName = 'StatusIcon';

interface StatusBadgeProps {
  status: UploadFile['status'];
  error?: string;
}

export const StatusBadge = memo(({ status, error }: StatusBadgeProps) => {
  const getBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">대기</Badge>;
      case 'uploading':
        return <Badge variant="default">업로드 중</Badge>;
      case 'success':
        return (
          <Badge variant="default" className="bg-green-500">
            완료
          </Badge>
        );
      case 'error':
        return <Badge variant="destructive">오류</Badge>;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <StatusIcon status={status} />
      {getBadge()}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

StatusBadge.displayName = 'StatusBadge';
