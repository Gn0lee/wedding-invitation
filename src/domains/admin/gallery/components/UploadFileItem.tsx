'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/domains/admin/gallery/components/StatusComponents';
import { UploadFile } from '@/domains/admin/gallery/scheme/types';
import { UploadFileItemProps } from '@/domains/admin/gallery/scheme/types';

export const UploadFileItem = memo(
  ({ uploadFile, onUpdate, onRemove, onUpload }: UploadFileItemProps) => {
    const handleInputChange = (field: keyof UploadFile, value: string) => {
      onUpdate(uploadFile.id, field, value);
    };

    const handleUpload = () => {
      onUpload(uploadFile);
    };

    const handleRemove = () => {
      onRemove(uploadFile.id);
    };

    return (
      <TableRow>
        <TableCell>
          <Image
            src={URL.createObjectURL(uploadFile.file)}
            alt={uploadFile.name}
            width={64}
            height={64}
            className="rounded object-cover"
          />
        </TableCell>
        <TableCell>
          <Input
            id={`upload-name-${uploadFile.id}`}
            value={uploadFile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="이름"
            className="w-full"
          />
        </TableCell>
        <TableCell>
          <Textarea
            id={`upload-brideComment-${uploadFile.id}`}
            value={uploadFile.brideComment}
            onChange={(e) => handleInputChange('brideComment', e.target.value)}
            placeholder="신부 코멘트"
            rows={2}
            className="w-full"
          />
        </TableCell>
        <TableCell>
          <Textarea
            id={`upload-groomComment-${uploadFile.id}`}
            value={uploadFile.groomComment}
            onChange={(e) => handleInputChange('groomComment', e.target.value)}
            placeholder="신랑 코멘트"
            rows={2}
            className="w-full"
          />
        </TableCell>
        <TableCell>
          <Input
            id={`upload-takenAt-${uploadFile.id}`}
            type="datetime-local"
            value={uploadFile.takenAt}
            onChange={(e) => handleInputChange('takenAt', e.target.value)}
            className="w-full"
          />
        </TableCell>
        <TableCell>
          <StatusBadge status={uploadFile.status} error={uploadFile.error} />
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-2">
            <Button size="sm" onClick={handleUpload} disabled={uploadFile.status === 'uploading'}>
              업로드
            </Button>
            <Button size="sm" variant="destructive" onClick={handleRemove}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  },
);

UploadFileItem.displayName = 'UploadFileItem';
