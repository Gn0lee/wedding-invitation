'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { ComponentPropsWithoutRef } from 'react';

import KakaoMapImage from '@/assets/images/kakaomap_basic.webp';
import NaverMapImage from '@/assets/images/naver_map.webp';
import TmapImage from '@/assets/images/Tmap.webp';
import { cn } from '@/lib/utils';

interface MapAppButtonsProps {
  container?: ComponentPropsWithoutRef<'div'>;
  image?: Omit<ImageProps, 'src' | 'alt'>;
  anchor?: HTMLMotionProps<'a'>;
}

export function MapAppButtons({ container, image, anchor }: MapAppButtonsProps) {
  const { className: containerClassName, ...containerProps } = container || {};
  const { className: imageClassName, ...imageProps } = image || {};
  const { className: anchorClassName, ...anchorProps } = anchor || {};

  return (
    <div className={cn('flex items-center gap-4', containerClassName)} {...containerProps}>
      <motion.a
        href="https://tmap.life/e1e87e54"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="티맵으로 길찾기"
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('overflow-hidden rounded-full', anchorClassName)}
        {...anchorProps}
      >
        <Image
          src={TmapImage}
          alt="티맵"
          width={36}
          height={36}
          className={cn('rounded-full', imageClassName)}
          {...imageProps}
          priority
        />
      </motion.a>
      <motion.a
        href="https://naver.me/IFgdRRqM"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="네이버지도에서 보기"
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
        whileTap={{ scale: 0.95 }}
        className={cn('overflow-hidden rounded-full', anchorClassName)}
        {...anchorProps}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image
          src={NaverMapImage}
          alt="네이버 지도"
          width={36}
          height={36}
          className={cn('rounded-full', imageClassName)}
          {...imageProps}
          priority
        />
      </motion.a>
      <motion.a
        href="https://place.map.kakao.com/1505842477"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오맵으로 길찾기"
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('overflow-hidden rounded-full', anchorClassName)}
        {...anchorProps}
      >
        <Image
          src={KakaoMapImage}
          alt="카카오맵"
          width={36}
          height={36}
          className={cn('rounded-full', imageClassName)}
          {...imageProps}
          priority
        />
      </motion.a>
    </div>
  );
}
