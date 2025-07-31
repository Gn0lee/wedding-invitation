'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Images } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { KakaoLoginButton } from '@/components/KakaoLoginButton';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useAuth } from '@/hooks/useAuth';

export function GalleryCarousel() {
  const { user } = useAuth();

  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnLastSnap: true,
      stopOnFocusIn: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="size-full"
    >
      <CarouselContent className="size-full">
        <CarouselItem className="size-full">
          <div className="relative size-full rounded-lg shadow-md">
            <Image src="/images/main/040A1880.jpg" alt="Gallery1" fill />
          </div>
        </CarouselItem>
        <CarouselItem className="size-full">
          <div className="relative size-full rounded-lg shadow-md">
            <Image src="/images/main/040A2830.jpg" alt="Gallery2" fill />
          </div>
        </CarouselItem>
        <CarouselItem className="size-full">
          <div className="relative size-full rounded-lg shadow-md">
            <Image src="/images/main/040A7880.jpg" alt="Gallery3" fill />
          </div>
        </CarouselItem>
        <CarouselItem className="size-full">
          <div className="relative size-full rounded-lg shadow-md">
            {user ? (
              <Button
                asChild
                variant="secondary"
                className="w-fit border border-gray-50 bg-transparent text-gray-50 backdrop-blur-[1px] transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                size="lg"
              >
                <Link href="/gallery">
                  바로 만나러 가기
                  <Images />
                </Link>
              </Button>
            ) : (
              <KakaoLoginButton
                baseParams={{ next: '/gallery' }}
                innerText="카카오로 로그인하고 갤러리 보기"
              />
            )}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
