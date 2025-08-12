'use client';

import AutoScroll, { AutoScrollType } from 'embla-carousel-auto-scroll';
import { Images } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import Gallery3Image from '@/assets/images/040A1044_square.webp';
import Gallery1Image from '@/assets/images/040A2825_square.webp';
import Gallery2Image from '@/assets/images/DSFF0058_square.webp';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function GalleryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const autoScrollPlugin = useRef<AutoScrollType>(
    AutoScroll({
      speed: 2.7,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      startDelay: 0,
    }),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          autoScrollPlugin.current.play();
        } else {
          autoScrollPlugin.current.stop();
        }
      },
      {
        threshold: 0.7,
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
  }, []);

  return (
    <div ref={carouselRef} className="flex size-full items-center justify-center p-2">
      <Carousel plugins={[autoScrollPlugin.current]} className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={Gallery1Image} alt="Gallery_carousel_1" fill priority />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={Gallery2Image} alt="Gallery_carousel_2" fill placeholder="blur" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={Gallery3Image} alt="Gallery_carousel_3" fill placeholder="blur" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-2">
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
