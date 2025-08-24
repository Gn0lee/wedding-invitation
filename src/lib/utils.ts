import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 모든 브라우저에서 작동하는 클립보드 복사 함수
 * iOS Safari를 포함한 다양한 브라우저 환경을 지원합니다.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern Clipboard API 지원 확인
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback: document.execCommand 사용 (iOS Safari 등)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
}
