'use client';

import { KakaoIcon } from '@/components/icons/kakao-icon';
import { Button, ButtonProps } from '@/components/ui/button';
import { getKakaoLoginQueryParams } from '@/lib/kakao';
import { createClient } from '@/lib/supabase/client';

interface KakaoLoginButtonProps {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  innerText?: string;
  baseParams?: Record<string, string>;
}

export function KakaoLoginButton({
  buttonProps,
  innerText = '카카오로 로그인',
  baseParams,
}: KakaoLoginButtonProps) {
  const signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback/kakao`,
        queryParams: getKakaoLoginQueryParams(baseParams),
      },
    });
  };

  return (
    <Button
      onClick={signInWithKakao}
      className="w-full max-w-sm bg-yellow-400 text-black hover:bg-yellow-500"
      {...buttonProps}
    >
      <KakaoIcon className="size-4" />
      {innerText}
    </Button>
  );
}
