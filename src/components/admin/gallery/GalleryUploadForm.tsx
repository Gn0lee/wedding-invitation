'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Trash2, CheckCircle, AlertCircle, ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface UploadFile {
  file: File;
  id: string;
  name: string;
  brideComment: string;
  groomComment: string;
  takenAt: Date | undefined;
  takenTime: string; // 시간을 별도로 저장
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export function GalleryUploadForm() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const newFiles: UploadFile[] = files.map((file) => {
      const defaultDate = new Date(file.lastModified);
      return {
        file,
        id: Math.random().toString(36).substring(2),
        name: file.name.replace(/\.[^/.]+$/, ''), // 확장자 제거
        brideComment: '',
        groomComment: '',
        takenAt: defaultDate, // 파일 생성일을 기본값으로
        takenTime: defaultDate.toTimeString().slice(0, 8), // HH:MM:SS 형식
        status: 'pending',
      };
    });

    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const updateFile = (id: string, field: keyof UploadFile, value: string | Date | undefined) => {
    setUploadFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, [field]: value } : file)),
    );
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const compressImage = async (
    file: File,
  ): Promise<{ compressedImage: string; width: number; height: number }> => {
    // 압축 API 호출
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/gallery/compress', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '이미지 압축에 실패했습니다.');
    }

    const result = await response.json();
    return {
      compressedImage: result.compressedImage,
      width: result.compressedDimensions.width,
      height: result.compressedDimensions.height,
    };
  };

  const uploadSingleFile = async (uploadFile: UploadFile) => {
    if (!uploadFile.takenAt) {
      updateFile(uploadFile.id, 'status', 'error');
      updateFile(uploadFile.id, 'error', '촬영일을 선택해주세요.');
      return;
    }

    updateFile(uploadFile.id, 'status', 'uploading');

    try {
      // 1. 이미지 압축
      const compressedResult = await compressImage(uploadFile.file);

      // 2. 압축된 이미지를 Blob으로 변환
      const base64Data = compressedResult.compressedImage.replace('data:image/webp;base64,', '');
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const compressedBlob = new Blob([byteArray], { type: 'image/webp' });

      // 3. FormData 생성
      const formData = new FormData();
      formData.append('file', compressedBlob, `${uploadFile.name}.webp`);
      formData.append('name', uploadFile.name);
      formData.append('brideComment', uploadFile.brideComment);
      formData.append('groomComment', uploadFile.groomComment);
      // 날짜와 시간을 결합하여 ISO 문자열 생성
      const combinedDateTime = new Date(
        uploadFile.takenAt.getFullYear(),
        uploadFile.takenAt.getMonth(),
        uploadFile.takenAt.getDate(),
        ...uploadFile.takenTime.split(':').map(Number),
      );
      formData.append('takenAt', combinedDateTime.toISOString());

      // 4. 갤러리 아이템 생성 API 호출
      const response = await fetch('/api/admin/gallery/items', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '업로드에 실패했습니다.');
      }

      updateFile(uploadFile.id, 'status', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      updateFile(uploadFile.id, 'status', 'error');
      updateFile(
        uploadFile.id,
        'error',
        error instanceof Error ? error.message : '업로드에 실패했습니다.',
      );
    }
  };

  const uploadAll = async () => {
    const pendingFiles = uploadFiles.filter((file) => file.status === 'pending');

    for (const file of pendingFiles) {
      await uploadSingleFile(file);
    }
  };

  const getStatusIcon = (status: UploadFile['status']) => {
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
  };

  const getStatusBadge = (status: UploadFile['status']) => {
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
    <div className="space-y-6">
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

      {uploadFiles.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>업로드할 파일 목록</CardTitle>
                <CardDescription>
                  각 파일의 정보를 수정한 후 개별적으로 업로드할 수 있습니다.
                </CardDescription>
              </div>
              <Button
                onClick={uploadAll}
                disabled={uploadFiles.every((f) => f.status !== 'pending')}
              >
                모두 업로드
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>미리보기</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>신부 코멘트</TableHead>
                  <TableHead>신랑 코멘트</TableHead>
                  <TableHead>촬영일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadFiles.map((uploadFile) => (
                  <TableRow key={uploadFile.id}>
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
                        value={uploadFile.name}
                        onChange={(e) => updateFile(uploadFile.id, 'name', e.target.value)}
                        placeholder="이름"
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={uploadFile.brideComment}
                        onChange={(e) => updateFile(uploadFile.id, 'brideComment', e.target.value)}
                        placeholder="신부 코멘트"
                        rows={2}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={uploadFile.groomComment}
                        onChange={(e) => updateFile(uploadFile.id, 'groomComment', e.target.value)}
                        placeholder="신랑 코멘트"
                        rows={2}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'justify-between font-normal',
                                !uploadFile.takenAt && 'text-muted-foreground',
                              )}
                            >
                              {uploadFile.takenAt ? (
                                format(uploadFile.takenAt, 'yyyy-MM-dd', { locale: ko })
                              ) : (
                                <span>날짜 선택</span>
                              )}
                              <ChevronDownIcon className="size-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={uploadFile.takenAt}
                              onSelect={(date) => updateFile(uploadFile.id, 'takenAt', date)}
                              initialFocus
                              locale={ko}
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="time"
                          step="1"
                          value={uploadFile.takenTime}
                          onChange={(e) => updateFile(uploadFile.id, 'takenTime', e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(uploadFile.status)}
                        {getStatusBadge(uploadFile.status)}
                      </div>
                      {uploadFile.error && (
                        <p className="mt-1 text-xs text-red-500">{uploadFile.error}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          onClick={() => uploadSingleFile(uploadFile)}
                          disabled={uploadFile.status === 'uploading'}
                        >
                          업로드
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFile(uploadFile.id)}
                        >
                          <Trash2 className="size-4" />
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
