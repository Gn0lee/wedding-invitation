import { getPlaiceholder } from 'plaiceholder';

/**
 * 이미지 Buffer에서 blurDataUrl을 생성합니다.
 * @param imageBuffer - 이미지 Buffer
 * @returns blurDataUrl (Base64 인코딩된 작은 이미지)
 */
export async function generateBlurDataUrl(imageBuffer: Buffer): Promise<string> {
  try {
    const { base64 } = await getPlaiceholder(imageBuffer);
    return base64;
  } catch (error) {
    console.error('Failed to generate blur data URL:', error);
    // 에러 발생 시 기본 blurDataUrl 반환 (투명한 1x1 픽셀)
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }
}

/**
 * 파일 객체에서 blurDataUrl을 생성합니다.
 * @param file - 이미지 파일 객체
 * @returns blurDataUrl (Base64 인코딩된 작은 이미지)
 */
export async function generateBlurDataUrlFromFile(file: File): Promise<string> {
  try {
    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // plaiceholder로 blurDataUrl 생성
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    console.error('Failed to generate blur data URL from file:', error);
    // 에러 발생 시 기본 blurDataUrl 반환
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }
}
