import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">인증 오류</h1>
        <p className="mb-6 text-gray-600">로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        <Link href="/#rsvp">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
