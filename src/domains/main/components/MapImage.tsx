'use client';

import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Expand, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';

import RoughMapImage from '@/assets/images/rough-map.webp';

export function MapImage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setScale(1);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleDragEnd = useCallback(() => {
    // 드래그 종료 시 위치는 useMotionValue가 자동으로 관리
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, closeFullscreen]);

  return (
    <>
      {/* 약도 이미지 컨테이너 */}
      <div className="group relative aspect-[750/613] w-full rounded-md bg-gray-50">
        <Image
          src={RoughMapImage}
          alt="로얄파크컨벤션 약도"
          fill
          className="object-contain"
          priority
        />

        {/* 전체화면 버튼 */}
        <motion.button
          onClick={openFullscreen}
          className="absolute right-2 top-2 rounded-md bg-black/50 p-2 text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Expand className="size-5" />
        </motion.button>
      </div>

      {/* 전체화면 모달 */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              ref={containerRef}
              className="relative h-[90vh] max-h-[80vh] w-[90vw] max-w-4xl overflow-hidden rounded-lg bg-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 컨트롤 버튼들 */}
              <div className="absolute right-4 top-4 z-10 flex gap-2">
                <motion.button
                  onClick={handleZoomOut}
                  className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="size-5" />
                </motion.button>

                <motion.button
                  onClick={handleZoomIn}
                  className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={scale >= 3}
                >
                  <ZoomIn className="size-5" />
                </motion.button>

                <motion.button
                  onClick={handleReset}
                  className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="size-5" />
                </motion.button>

                <motion.button
                  onClick={closeFullscreen}
                  className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              {/* 확대된 약도 이미지 */}
              <div className="relative size-full overflow-hidden">
                <motion.div
                  className="size-full"
                  style={{
                    x,
                    y,
                    scale,
                  }}
                  drag
                  dragConstraints={{
                    left: -300,
                    right: 300,
                    top: -300,
                    bottom: 300,
                  }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ cursor: 'grabbing' }}
                >
                  <Image
                    src={RoughMapImage}
                    alt="로얄파크컨벤션 약도 (전체화면)"
                    fill
                    className="select-none object-contain"
                    priority
                    draggable={false}
                  />
                </motion.div>
              </div>

              {/* 줌 레벨 표시 */}
              <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {Math.round(scale * 100)}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
