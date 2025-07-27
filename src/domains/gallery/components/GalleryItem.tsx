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
  const [showLineClamp, setShowLineClamp] = useState(true); // 초기에는 접힌 상태이므로 true

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

  const handleTransitionStart = () => {
    // 펼쳐질 때는 즉시 line-clamp 제거, 접힐 때는 유지
    if (isCommentsExpanded) {
      setShowLineClamp(false);
    }
  };

  const handleTransitionEnd = () => {
    // 접힐 때 애니메이션 완료 후 line-clamp 적용
    if (!isCommentsExpanded) {
      setShowLineClamp(true);
    }
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
              className="relative mx-auto flex aspect-[375/667] h-[90vh] max-w-[100vw] overflow-hidden rounded-lg "
              layoutId={`gallery-item-${item.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10 rounded-full bg-gray-700/20 text-gray-50 backdrop-blur-sm transition-colors hover:bg-gray-700/70 hover:text-gray-50"
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
                <div className="absolute bottom-3 right-4 flex flex-col items-center gap-1 rounded-full bg-gray-700/20 p-2 text-white backdrop-blur-sm">
                  <Heart size={16} className="text-red-500" fill="currentColor" />
                  <span className="text-xs font-medium">{item.likes}</span>
                </div>

                {/* 하단 코멘트 영역 */}
                {hasComments && (
                  <div className="absolute bottom-0 left-0 right-16 mb-3 ml-3 rounded-md bg-gray-700/20 p-1 text-sm text-gray-50">
                    <Collapsible open={isCommentsExpanded} onOpenChange={setIsCommentsExpanded}>
                      <div className="relative pr-5">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isCommentsExpanded ? 'max-h-32' : 'max-h-5'
                          }`}
                          onTransitionStart={handleTransitionStart}
                          onTransitionEnd={handleTransitionEnd}
                        >
                          <div
                            className={`transition-all duration-300 ${
                              isCommentsExpanded ? 'opacity-100' : 'opacity-90'
                            }`}
                          >
                            {item.brideComment && (
                              <div
                                className={`transition-all duration-300 ${
                                  isCommentsExpanded || !showLineClamp ? '' : 'line-clamp-1'
                                }`}
                              >
                                <span className="mr-1">👰🏻‍♀️ :</span>
                                <span>{item.brideComment}</span>
                              </div>
                            )}
                            {item.groomComment && (
                              <div
                                className={`transition-all duration-300 ${
                                  isCommentsExpanded || !showLineClamp ? '' : 'line-clamp-1'
                                }`}
                              >
                                <span className="mr-1">🤵🏻 :</span>
                                <span>{item.groomComment}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 더보기 버튼 */}
                        <CollapsibleTrigger asChild>
                          <button className="absolute bottom-1 right-0 text-sm text-gray-50 transition-transform duration-100 hover:scale-110 active:scale-90">
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
