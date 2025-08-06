// Kakao SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      cleanup: () => void;
      Share: {
        sendCustom: (settings: {
          templateId: number;
          templateArgs?: object;
          installTalk?: boolean;
          serverCallbackArgs?: object | string;
        }) => Promise<{
          url: string;
          length: number;
          content_type: string;
          width: number;
          height: number;
        }>;
      };
      // 추가적인 Kakao SDK 메서드들
      [key: string]: unknown;
    };
  }
}

export {};
