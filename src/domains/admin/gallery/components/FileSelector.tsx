'use client';

import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileSelectorProps } from '@/domains/admin/gallery/scheme/types';

export const FileSelector = memo(({ onFileSelect }: FileSelectorProps) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileSelect(files);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>파일 선택</CardTitle>
        <CardDescription>
          갤러리에 추가할 이미지 파일들을 선택해주세요. 각 파일의 정보를 수정한 후 업로드할 수
          있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="cursor-pointer"
        />
      </CardContent>
    </Card>
  );
});

FileSelector.displayName = 'FileSelector';
