'use client';

import { KakaoIcon } from '@/components/icons/kakao-icon';
import { Button } from '@/components/ui/button';
import { getKakaoLoginQueryParams } from '@/lib/kakao';
import { createClient } from '@/lib/supabase/client';

export function KakaoLoginButton() {
  const signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback/kakao`,
        queryParams: getKakaoLoginQueryParams({
          next: '/#rsvp',
        }),
      },
    });
  };

  return (
    <Button
      onClick={signInWithKakao}
      className="w-full max-w-sm bg-yellow-400 text-black hover:bg-yellow-500"
    >
      <KakaoIcon className="size-4" />
      카카오로 로그인
    </Button>
  );
}
