'use client';

import { useCallback } from 'react';
import { UploadFile } from '../scheme/types';

export const useFileUpload = () => {
  // UTC를 한국 시간으로 변환 (datetime-local 입력용)
  const utcToKoreaTime = useCallback((utcString: string) => {
    const date = new Date(utcString);
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9
    return koreaTime.toISOString().slice(0, 16);
  }, []);

  // 한국 시간을 UTC로 변환 (저장용)
  const koreaTimeToUtc = useCallback((koreaTimeString: string) => {
    const koreaDate = new Date(koreaTimeString);
    const utcDate = new Date(koreaDate.getTime() - 9 * 60 * 60 * 1000); // UTC-9
    return utcDate.toISOString();
  }, []);

  const compressImage = useCallback(
    async (file: File): Promise<{ compressedImage: string; width: number; height: number }> => {
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
    },
    [],
  );

  const uploadSingleFile = useCallback(
    async (uploadFile: UploadFile) => {
      if (!uploadFile.takenAt) {
        throw new Error('촬영일을 선택해주세요.');
      }

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
        // 한국 시간을 UTC로 변환하여 저장
        formData.append('takenAt', koreaTimeToUtc(uploadFile.takenAt));
        formData.append('width', compressedResult.width.toString());
        formData.append('height', compressedResult.height.toString());

        // 4. 갤러리 아이템 생성 API 호출
        const response = await fetch('/api/admin/gallery/items', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '업로드에 실패했습니다.');
        }
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    },
    [compressImage, koreaTimeToUtc],
  );

  const createUploadFile = useCallback(
    (file: File): UploadFile => {
      const defaultDate = new Date(file.lastModified);
      return {
        file,
        id: Math.random().toString(36).substring(2),
        name: file.name.replace(/\.[^/.]+$/, ''), // 확장자 제거
        brideComment: '',
        groomComment: '',
        takenAt: utcToKoreaTime(defaultDate.toISOString()), // 한국 시간으로 변환
        status: 'pending',
      };
    },
    [utcToKoreaTime],
  );

  return {
    uploadSingleFile,
    createUploadFile,
  };
};
