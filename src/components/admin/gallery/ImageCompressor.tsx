'use client';

import { Upload, Download, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // TODO: 압축 로직 구현
      console.log('Compressing file:', selectedFile.name);
    } catch (err) {
      console.error(err);
      setError('압축 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
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
          <CardDescription>압축할 이미지 파일을 선택해주세요. (최대 3MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              size={10}
              onChange={handleFileSelect}
              className="file:mr-4 file:rounded-full file:bg-blue-50 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />

            {selectedFile && (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">선택된 파일: {selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  크기: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="size-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <Button
              onClick={handleCompress}
              disabled={!selectedFile || isProcessing}
              className="w-full"
            >
              {isProcessing ? '압축 중...' : '압축 시작'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 압축 결과 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="size-5" />
            압축 결과
          </CardTitle>
          <CardDescription>압축된 이미지를 다운로드할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">아직 압축된 파일이 없습니다.</div>
        </CardContent>
      </Card>
    </div>
  );
}
