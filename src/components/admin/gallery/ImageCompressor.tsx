'use client';

import { Upload, Download, AlertCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
  compressionRatio: string;
  quality: number;
  compressedImage: string;
}

interface FileItem {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  result?: CompressionResult;
}

export function ImageCompressor() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending',
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setError(null);
  };

  const handleCompress = async (fileItem: FileItem) => {
    const updatedFiles = files.map((item) =>
      item.id === fileItem.id ? { ...item, status: 'processing' as const } : item,
    );
    setFiles(updatedFiles);

    try {
      const formData = new FormData();
      formData.append('file', fileItem.file);

      const response = await fetch('/api/admin/gallery/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '압축 중 오류가 발생했습니다.');
      }

      const result: CompressionResult = await response.json();

      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileItem.id ? { ...item, status: 'completed' as const, result } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : '압축 중 오류가 발생했습니다.';

      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileItem.id
            ? { ...item, status: 'error' as const, error: errorMessage }
            : item,
        ),
      );
    }
  };

  const handleDownload = (fileItem: FileItem) => {
    if (!fileItem.result) return;

    const link = document.createElement('a');
    link.href = fileItem.result.compressedImage;
    link.download = `${fileItem.file.name.replace(/\.[^/.]+$/, '')}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* 파일 업로드 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-5" />
            이미지 업로드
          </CardTitle>
          <CardDescription>압축할 이미지 파일들을 선택해주세요. (최대 50MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="file:mr-4 file:rounded-full file:bg-blue-50 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="size-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 파일 목록 테이블 */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>파일 목록</CardTitle>
            <CardDescription>각 파일을 개별적으로 압축할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>파일명</TableHead>
                  <TableHead>원본 크기</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>압축 결과</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((fileItem) => (
                  <TableRow key={fileItem.id}>
                    <TableCell className="font-medium">{fileItem.file.name}</TableCell>
                    <TableCell>{formatFileSize(fileItem.file.size)} MB</TableCell>
                    <TableCell>
                      {fileItem.status === 'pending' && (
                        <span className="text-gray-500">대기중</span>
                      )}
                      {fileItem.status === 'processing' && (
                        <span className="text-blue-500">압축중...</span>
                      )}
                      {fileItem.status === 'completed' && (
                        <span className="text-green-500">완료</span>
                      )}
                      {fileItem.status === 'error' && (
                        <span className="text-red-500">{fileItem.error}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {fileItem.result && (
                        <div className="text-sm">
                          <div className="text-green-600">
                            {formatFileSize(fileItem.result.compressedSize)} MB
                          </div>
                          <div className="text-blue-600">
                            {fileItem.result.compressionRatio}% 압축
                          </div>
                          <div className="text-gray-600">
                            {fileItem.result.compressedDimensions.width} ×{' '}
                            {fileItem.result.compressedDimensions.height}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {fileItem.status === 'pending' && (
                          <Button size="sm" onClick={() => handleCompress(fileItem)}>
                            압축
                          </Button>
                        )}
                        {fileItem.status === 'completed' && fileItem.result && (
                          <Button size="sm" onClick={() => handleDownload(fileItem)}>
                            <Download className="mr-1 size-3" />
                            다운로드
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveFile(fileItem.id)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
