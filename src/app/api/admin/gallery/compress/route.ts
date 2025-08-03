import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { requireAdminPermission } from '@/lib/admin';

const MAX_COMPRESSED_SIZE = 3 * 1024 * 1024; // 3MB

export async function POST(request: NextRequest) {
  try {
    // Admin 권한 확인
    await requireAdminPermission();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 파일 크기 확인 (너무 큰 파일은 서버 부하 방지)
    if (file.size > 50 * 1024 * 1024) {
      // 50MB 제한
      return NextResponse.json({ error: 'File size exceeds 50MB limit' }, { status: 400 });
    }

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 원본 이미지 메타데이터 가져오기
    const originalMetadata = await sharp(buffer).metadata();

    if (!originalMetadata.width || !originalMetadata.height) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    // EXIF Orientation 정보 확인
    const orientation = originalMetadata.orientation;
    const needsRotation = orientation && orientation > 1;

    // 회전이 필요한 경우에만 회전 적용
    let actualWidth = originalMetadata.width;
    let actualHeight = originalMetadata.height;

    if (needsRotation) {
      // Orientation 값에 따른 실제 크기 계산
      actualWidth = originalMetadata.height!;
      actualHeight = originalMetadata.width!;
    }

    // 압축 품질 설정 (초기값)
    let quality = 80;
    let compressedBuffer: Buffer;

    // 모바일 최적화를 위한 해상도 계산
    const maxWidth = 1920; // 모바일 최적 너비 (증가)
    const maxHeight = 2400; // 모바일 최적 높이 (증가)

    // 실제 크기를 기준으로 계산
    let targetWidth = actualWidth;
    let targetHeight = actualHeight;

    // 비율을 유지하면서 모바일 크기로 조정
    if (targetWidth > maxWidth || targetHeight > maxHeight) {
      const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
      targetWidth = Math.round(targetWidth * ratio);
      targetHeight = Math.round(targetHeight * ratio);
    }

    // 압축 시도 (해상도 다운샘플링 + 품질 조정)
    do {
      let sharpInstance = sharp(buffer);

      // 회전이 필요한 경우에만 회전 적용
      if (needsRotation) {
        sharpInstance = sharpInstance.rotate();
      }

      compressedBuffer = await sharpInstance
        .resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality })
        // 메타데이터 삭제 (개인정보 보호)
        .toBuffer();

      quality -= 5; // 품질을 5씩 낮춤
    } while (compressedBuffer.length > MAX_COMPRESSED_SIZE && quality > 10);

    // 최종 크기 확인
    if (compressedBuffer.length > MAX_COMPRESSED_SIZE) {
      return NextResponse.json(
        {
          error: 'Unable to compress image to under 3MB while maintaining quality',
        },
        { status: 400 },
      );
    }

    // 압축된 이미지 메타데이터
    const compressedMetadata = await sharp(compressedBuffer).metadata();

    // 응답 데이터 구성
    const response = {
      originalSize: file.size,
      compressedSize: compressedBuffer.length,
      originalDimensions: {
        width: originalMetadata.width,
        height: originalMetadata.height,
      },
      compressedDimensions: {
        width: compressedMetadata.width,
        height: compressedMetadata.height,
      },
      compressionRatio: (((file.size - compressedBuffer.length) / file.size) * 100).toFixed(1),
      quality: quality + 5, // 실제 사용된 품질
    };

    // 압축된 이미지를 base64로 인코딩하여 응답에 포함
    const base64Image = `data:image/webp;base64,${compressedBuffer.toString('base64')}`;

    return NextResponse.json({
      ...response,
      compressedImage: base64Image,
    });
  } catch (error) {
    console.error('Compression error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
