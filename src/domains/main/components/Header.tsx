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
    <header className="sticky top-0 z-10  size-full h-[72px] px-6 py-4 md:h-[88px] md:px-12 lg:h-[104px] lg:px-16">
      <div className="container m-auto flex h-full items-center justify-between">
        <Link href="/" className="font-bmJua text-2xl">
          👩‍❤️‍👨
        </Link>
        <div className="flex items-center space-x-4">
          <ul className="flex items-center space-x-4">
            {socialLinks.map((item) => (
              <li key={item.name}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={32}
                  height={28}
                  className="w-6 md:w-8 lg:w-10"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
