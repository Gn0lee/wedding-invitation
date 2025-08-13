'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import KakaoMapImage from '@/assets/images/kakaomap_basic.webp';
import NaverMapImage from '@/assets/images/naver_map.webp';
import TmapImage from '@/assets/images/Tmap.webp';

export function MapAppButtons() {
  return (
    <div className="flex items-center gap-4">
      <motion.a
        href="https://tmap.life/e1e87e54"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="티맵으로 길찾기"
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px #fff8' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="overflow-hidden rounded-full"
      >
        <Image
          src={TmapImage}
          alt="티맵"
          width={48}
          height={48}
          className="rounded-full"
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
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="overflow-hidden rounded-full"
      >
        <Image
          src={NaverMapImage}
          alt="네이버 지도"
          width={48}
          height={48}
          className="rounded-full"
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
        className="overflow-hidden rounded-full"
      >
        <Image
          src={KakaoMapImage}
          alt="카카오맵"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
      </motion.a>
    </div>
  );
}
