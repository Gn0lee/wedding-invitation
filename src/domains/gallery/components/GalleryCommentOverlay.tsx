'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { GalleryItem as GalleryItemType } from '@/domains/gallery/types';

interface GalleryCommentOverlayProps {
  item: GalleryItemType;
}

export function GalleryCommentOverlay({ item }: GalleryCommentOverlayProps) {
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [showLineClamp, setShowLineClamp] = useState(true);

  const handleTransitionStart = () => {
    if (isCommentsExpanded) {
      setShowLineClamp(false);
    }
  };

  const handleTransitionEnd = () => {
    if (!isCommentsExpanded) {
      setShowLineClamp(true);
    }
  };

  return (
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
                  <div className="flex items-start gap-2 text-xs">
                    <span className="shrink-0">👰🏻‍♀️ :</span>
                    <ul className="list-inside list-none space-y-1">
                      <li className="whitespace-pre-wrap text-gray-50">{item.brideComment}</li>
                    </ul>
                  </div>
                </div>
              )}
              {item.groomComment && (
                <div
                  className={`transition-all duration-300 ${
                    isCommentsExpanded || !showLineClamp ? '' : 'line-clamp-1'
                  }`}
                >
                  <div className="flex items-start gap-2 text-xs">
                    <span className="shrink-0">🤵🏻 :</span>
                    <ul className="list-inside list-none space-y-1">
                      <li className="whitespace-pre-wrap text-gray-50">{item.groomComment}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 더보기 버튼 */}
          <CollapsibleTrigger asChild>
            <button className="absolute bottom-1 right-0 text-sm text-gray-50 transition-transform duration-100 hover:scale-110 active:scale-90">
              {isCommentsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}
