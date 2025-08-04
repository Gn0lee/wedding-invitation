'use client';

import { useCallback, useState } from 'react';
import { FileSelector } from '@/domains/admin/gallery/components/FileSelector';
import { UploadTable } from '@/domains/admin/gallery/components/UploadTable';
import { useFileUpload } from '@/domains/admin/gallery/components/useFileUpload';
import { UploadFile } from '@/domains/admin/gallery/scheme/types';

export function GalleryUploadForm() {
  const [uploadFilesMap, setUploadFilesMap] = useState<Map<string, UploadFile>>(new Map());
  const { uploadSingleFile, createUploadFile } = useFileUpload();

  // Map을 배열로 변환하는 함수
  const getUploadFiles = useCallback(() => {
    return Array.from(uploadFilesMap.values());
  }, [uploadFilesMap]);

  // 효율적인 상태 업데이트
  const updateFile = useCallback((id: string, field: keyof UploadFile, value: string) => {
    setUploadFilesMap((prev) => {
      const newMap = new Map(prev);
      const file = newMap.get(id);
      if (file) {
        newMap.set(id, { ...file, [field]: value });
      }
      return newMap;
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setUploadFilesMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const handleFileSelect = useCallback(
    (files: File[]) => {
      const newFiles = files.map(createUploadFile);

      setUploadFilesMap((prev) => {
        const newMap = new Map(prev);
        newFiles.forEach((file) => {
          newMap.set(file.id, file);
        });
        return newMap;
      });
    },
    [createUploadFile],
  );

  const handleUpload = useCallback(
    async (uploadFile: UploadFile) => {
      // 상태를 uploading으로 변경
      updateFile(uploadFile.id, 'status', 'uploading');
      updateFile(uploadFile.id, 'error', '');

      try {
        await uploadSingleFile(uploadFile);
        updateFile(uploadFile.id, 'status', 'success');
      } catch (error) {
        updateFile(uploadFile.id, 'status', 'error');
        updateFile(
          uploadFile.id,
          'error',
          error instanceof Error ? error.message : '업로드에 실패했습니다.',
        );
      }
    },
    [uploadSingleFile, updateFile],
  );

  const handleUploadAll = useCallback(async () => {
    const pendingFiles = getUploadFiles().filter((file) => file.status === 'pending');

    for (const file of pendingFiles) {
      await handleUpload(file);
    }
  }, [getUploadFiles, handleUpload]);

  return (
    <div className="space-y-6">
      <FileSelector onFileSelect={handleFileSelect} />

      {uploadFilesMap.size > 0 && (
        <UploadTable
          files={getUploadFiles()}
          onUpdate={updateFile}
          onRemove={removeFile}
          onUpload={handleUpload}
          onUploadAll={handleUploadAll}
        />
      )}
    </div>
  );
}
