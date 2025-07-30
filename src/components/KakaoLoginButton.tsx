'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function KakaoLoginButton() {
  const signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback/kakao`,
        queryParams: {
          prompt: 'login',
          next: '/#rsvp',
        },
      },
    });
  };

  return (
    <Button
      onClick={signInWithKakao}
      className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
    >
      카카오로 로그인
    </Button>
  );
}
