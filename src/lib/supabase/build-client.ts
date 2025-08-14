import { createClient } from '@supabase/supabase-js';

/**
 * 빌드 시점에 사용할 Supabase 클라이언트
 * cookies()를 사용하지 않아 정적 빌드가 가능합니다.
 */
export function createBuildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // 서비스 롤 키 사용
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
