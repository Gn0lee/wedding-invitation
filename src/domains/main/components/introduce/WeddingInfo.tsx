import Image from 'next/image';
import IntroImage from '@/assets/images/intro2.png';
import type { WeddingInfo as WeddingInfoType } from '@/domains/main/scheme/wedding-info';
import { formatKoreaTime } from '@/lib/date-utils';

interface WeddingInfoProps {
  weddingInfo: WeddingInfoType;
}

export function WeddingInfo({ weddingInfo }: WeddingInfoProps) {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
      {/* 배경 이미지 */}
      <Image src={IntroImage} alt="wedding-info" className="m-auto" priority />

      {/* 텍스트 오버레이 */}
      <div className="relative z-10 mt-4 flex flex-col items-center text-center text-xs font-light leading-relaxed text-gray-200">
        <p>
          신랑 {weddingInfo.groom_name} & 신부 {weddingInfo.bride_name}
        </p>
        <p className="whitespace-nowrap">
          {formatKoreaTime(weddingInfo.wedding_date, 'yyyy.M.d (E) a h:mm')} |{' '}
          {weddingInfo.venue_name}
        </p>
      </div>
    </div>
  );
}
