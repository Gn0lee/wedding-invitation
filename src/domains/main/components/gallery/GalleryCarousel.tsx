'use client';

import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { Images } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function GalleryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isKakaoLoginButtonVisible, setIsKakaoLoginButtonVisible] = useState(false);
  const kakaoLoginButtonRef = useRef<HTMLDivElement>(null);

  const autoPlayPlugin = useRef<AutoplayType>(
    Autoplay({
      delay: 2500,
      playOnInit: false,
    }),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isKakaoLoginButtonVisible) {
          autoPlayPlugin.current.play();
        } else {
          autoPlayPlugin.current.stop();
        }
      },
      {
        threshold: 1,
      },
    );

    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isKakaoLoginButtonVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsKakaoLoginButtonVisible(true);
      } else {
        setIsKakaoLoginButtonVisible(false);
      }
    });

    const currentRef = kakaoLoginButtonRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={carouselRef} className="flex size-full items-center justify-center p-4">
      <Carousel plugins={[autoPlayPlugin.current, Fade()]} className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/main/040A1880.webp" alt="Gallery1" fill priority />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/main/040A2830.webp" alt="Gallery2" fill priority />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/main/040A7880.webp" alt="Gallery3" fill priority />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-2" ref={kakaoLoginButtonRef}>
              <div className="flex aspect-square items-baseline justify-center pt-6">
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
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
