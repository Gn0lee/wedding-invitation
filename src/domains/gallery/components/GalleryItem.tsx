'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { GalleryItem as GalleryItemType } from '@/domains/gallery/types';
import { GallerySkeleton } from './GallerySkeleton';

interface GalleryItemProps {
  item: GalleryItemType;
}

export function GalleryItem({ item }: GalleryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {/* 그리드 아이템 */}
      <motion.div
        className="cursor-pointer overflow-hidden rounded-lg"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layoutId={`gallery-item-${item.id}`}
      >
        {!imageLoaded && <GallerySkeleton />}
        <Image
          src={item.src}
          alt={item.name}
          width={300}
          height={375}
          className={`aspect-[4/5] w-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
          priority={false}
          onLoad={handleImageLoad}
        />
      </motion.div>

      {/* 확대된 모달 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg bg-white"
              layoutId={`gallery-item-${item.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* 이미지 영역 */}
                <div className="relative">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full object-cover"
                    priority
                  />
                </div>

                {/* 세부정보 영역 */}
                <div className="flex flex-col justify-between p-6">
                  <div className="space-y-4">
                    {/* 제목 */}
                    <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>

                    {/* 좋아요 */}
                    <div className="flex items-center gap-2">
                      <Heart size={20} className="text-red-500" fill="currentColor" />
                      <span className="text-gray-600">{item.likes}개</span>
                    </div>

                    {/* 코멘트 */}
                    {(item.brideComment || item.groomComment) && (
                      <div className="space-y-3">
                        {item.brideComment && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">신부 코멘트</p>
                            <p className="text-gray-700">{item.brideComment}</p>
                          </div>
                        )}
                        {item.groomComment && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">신랑 코멘트</p>
                            <p className="text-gray-700">{item.groomComment}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 날짜 */}
                    <div className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
