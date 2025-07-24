'use client';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';

export function LocationHero() {
  return (
    <HeroSection id="location">
      <HeroBackground
        image={{
          src: '/images/main/040A4059.jpg',
          alt: '위치 배경',
          fill: true,
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>
            두 마음이
            <br />
            하나가 될 곳
          </HeroTitle>
          <HeroDescription>로얄파크 컨벤션 1F 파크홀</HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="pt-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <motion.a
                href="https://tmap.life/e1e87e54"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="티맵으로 길찾기"
                whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-full"
              >
                <Avatar>
                  <AvatarImage src="/images/main/티맵모빌리티_idBqPT7AKu_1.jpeg" />
                  <AvatarFallback>티맵</AvatarFallback>
                </Avatar>
              </motion.a>
              <motion.a
                href="https://naver.me/IFgdRRqM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="네이버지도에서 보기"
                whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-full"
              >
                <Avatar>
                  <AvatarImage src="/images/main/unnamed.webp" />
                  <AvatarFallback>네이버 지도</AvatarFallback>
                </Avatar>
              </motion.a>
              <motion.a
                href="https://place.map.kakao.com/1505842477"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="카카오맵으로 길찾기"
                whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-full"
              >
                <Avatar>
                  <AvatarImage src="/images/main/kakaomap_basic.png" />
                  <AvatarFallback>카카오맵</AvatarFallback>
                </Avatar>
              </motion.a>
            </div>
            <Button
              asChild
              variant="secondary"
              className="w-fit border border-gray-50 bg-transparent text-gray-50 backdrop-blur-[1px] transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              size="lg"
            >
              <Link href="/rough-map">
                약도 자세히보기
                <Map />
              </Link>
            </Button>
          </div>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
