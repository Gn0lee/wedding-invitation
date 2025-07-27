'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
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
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10 rounded-full bg-white/10 text-gray-50 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
              >
                <X size={20} />
              </Button>

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
                <div className="absolute bottom-3 right-4 flex flex-col items-center gap-1 rounded-full bg-white/10 p-2 text-gray-50 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30">
                  <Heart size={16} className="text-red-500" fill="currentColor" />
                  <span className="text-xs font-medium">{item.likes}</span>
                </div>

                {/* 하단 코멘트 영역 */}
                {hasComments && (
                  <div className="absolute bottom-0 left-0 right-10 p-4">
                    <Collapsible open={isCommentsExpanded} onOpenChange={setIsCommentsExpanded}>
                      <div className="relative pr-4">
                        {/* 접힌 상태: 높이 제한으로 표시 */}
                        {!isCommentsExpanded && (
                          <div className="max-h-6 overflow-hidden text-white">
                            {item.brideComment && (
                              <span className="line-clamp-1">
                                <span className="mr-1">👰🏻‍♀️ :</span>
                                {item.brideComment}
                              </span>
                            )}
                            {item.groomComment && (
                              <span className="line-clamp-1">
                                <span className="mr-1">🤵🏻 :</span>
                                {item.groomComment}
                              </span>
                            )}
                          </div>
                        )}

                        {/* 펼쳐진 상태: 높이 자동 조정 */}
                        {isCommentsExpanded && (
                          <div className="text-white">
                            {item.brideComment && (
                              <div className="mb-2">
                                <span className="mr-1">👰🏻‍♀️ :</span>
                                <span>{item.brideComment}</span>
                              </div>
                            )}
                            {item.groomComment && (
                              <div>
                                <span className="mr-1">🤵🏻 :</span>
                                <span>{item.groomComment}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 더보기 버튼 */}
                        <CollapsibleTrigger asChild>
                          <button className="absolute bottom-1 right-0 text-sm text-gray-300 hover:text-white">
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
