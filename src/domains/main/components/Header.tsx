import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { name: 'Facebook', href: '#', icon: '/images/main/facebook.png' },
  { name: 'Instagram', href: '#', icon: '/images/main/instagram.png' },
  { name: 'Blog', href: '#', icon: '/images/main/blog.png' },
  { name: 'Youtube', href: '#', icon: '/images/main/youtube.png' },
];

export function Header() {
  return (
    <header className="fixed top-0 z-10 h-[72px] w-full px-6 py-4 backdrop-blur-sm md:h-[88px] md:px-12 lg:h-[104px] lg:px-16">
      <div className="container m-auto flex h-full items-center justify-between">
        <Link href="/">
          <Image
            src="/images/main/logo.png"
            alt="배달의민족"
            width={150}
            height={28}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>
        <div className="hidden items-center space-x-4 lg:flex">
          <nav>
            <ul className="flex items-center space-x-4">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <Image src={item.icon} alt={item.name} width={32} height={32} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="h-6 w-px bg-gray-300" />
          <Link href="#">
            <Image src="/images/main/app-download.png" alt="앱 다운로드" width={140} height={48} />
          </Link>
        </div>
        <div className="lg:hidden">
          <button type="button" className="p-2">
            <span className="sr-only">메뉴 열기</span>
            <div className="h-0.5 w-6 bg-white" />
            <div className="mt-1.5 h-0.5 w-6 bg-white" />
            <div className="mt-1.5 h-0.5 w-6 bg-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
