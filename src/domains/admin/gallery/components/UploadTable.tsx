'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadFileItem } from '@/domains/admin/gallery/components/UploadFileItem';
import { UploadTableProps } from '@/domains/admin/gallery/scheme/types';

export const UploadTable = memo(
  ({ files, onUpdate, onRemove, onUpload, onUploadAll }: UploadTableProps) => {
    const hasPendingFiles = files.some((f) => f.status === 'pending');

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>업로드할 파일 목록</CardTitle>
              <CardDescription>
                각 파일의 정보를 수정한 후 개별적으로 업로드할 수 있습니다.
              </CardDescription>
            </div>
            <Button onClick={onUploadAll} disabled={!hasPendingFiles}>
              모두 업로드
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>미리보기</TableHead>
                <TableHead>
                  <Label htmlFor="upload-name">이름</Label>
                </TableHead>
                <TableHead>
                  <Label htmlFor="upload-brideComment">신부 코멘트</Label>
                </TableHead>
                <TableHead>
                  <Label htmlFor="upload-groomComment">신랑 코멘트</Label>
                </TableHead>
                <TableHead>
                  <Label htmlFor="upload-takenAt">촬영일</Label>
                </TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((uploadFile) => (
                <UploadFileItem
                  key={uploadFile.id}
                  uploadFile={uploadFile}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                  onUpload={onUpload}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  },
);

UploadTable.displayName = 'UploadTable';
