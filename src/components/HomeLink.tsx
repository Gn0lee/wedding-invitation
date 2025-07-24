import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HomeLink() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="size-9 text-gray-50 hover:bg-white/10 hover:text-white [&_svg]:!size-6"
      aria-label="홈으로 이동"
    >
      <Link href="/">
        <Home />
      </Link>
    </Button>
  );
}
