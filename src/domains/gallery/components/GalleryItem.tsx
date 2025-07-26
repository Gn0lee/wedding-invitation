'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { GallerySkeleton } from '@/domains/gallery/components/GallerySkeleton';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types';

interface GalleryItemProps {
  item: GalleryItemType;
}

export function GalleryItem({ item }: GalleryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // 에러가 나도 스켈레톤은 사라지게
  };

  const hasComments = item.brideComment || item.groomComment;

  return (
    <>
      {/* Masonry 아이템 */}
      <motion.div
        className="w-full cursor-pointer overflow-hidden rounded-lg"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layoutId={`gallery-item-${item.id}`}
      >
        <AspectRatio ratio={item.width / item.height} className="relative w-full">
          {!imageLoaded && (
            <div className="absolute inset-0">
              <GallerySkeleton />
            </div>
          )}
          <Image
            src={item.src}
            alt={item.name}
            width={item.width}
            height={item.height}
            priority={false}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </AspectRatio>
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
              className="relative mx-auto flex aspect-[375/667] h-[80vh] max-w-[100vw] overflow-hidden rounded-lg "
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

              {/* 이미지 영역 */}
              <div className="relative size-full">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  className="size-full object-cover"
                  priority
                />

                {/* 우하단 좋아요 버튼 */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-white backdrop-blur-sm">
                  <Heart size={20} className="text-red-500" fill="currentColor" />
                  <span className="text-sm font-medium">{item.likes}</span>
                </div>

                {/* 하단 코멘트 영역 */}
                {hasComments && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <Collapsible open={isCommentsExpanded} onOpenChange={setIsCommentsExpanded}>
                      <div className="space-y-2">
                        {/* 접힌 상태: 코멘트들을 한 줄로 표시 */}
                        {!isCommentsExpanded && (
                          <div className="line-clamp-1 text-white">
                            {item.brideComment && (
                              <span>
                                <span className="mr-1">👰🏻‍♀️</span>
                                {item.brideComment}
                              </span>
                            )}
                            {item.brideComment && item.groomComment && (
                              <span className="mx-2">•</span>
                            )}
                            {item.groomComment && (
                              <span>
                                <span className="mr-1">🤵🏻</span>
                                {item.groomComment}
                              </span>
                            )}
                          </div>
                        )}

                        {/* 펼쳐진 상태: 각각 별도 줄로 표시 */}
                        {isCommentsExpanded && (
                          <>
                            {item.brideComment && (
                              <div className="text-white">
                                <span className="mr-2">👰🏻‍♀️</span>
                                <span>{item.brideComment}</span>
                              </div>
                            )}
                            {item.groomComment && (
                              <div className="text-white">
                                <span className="mr-2">🤵🏻</span>
                                <span>{item.groomComment}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* 더보기 버튼 */}
                        <CollapsibleTrigger asChild>
                          <button className="text-sm text-gray-300 hover:text-white">
                            {isCommentsExpanded ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        </CollapsibleTrigger>
                      </div>
                    </Collapsible>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
