import Image from 'next/image';
import IntroImage from '@/assets/images/intro2.png';

export function WeddingInfo() {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
      {/* 배경 이미지 */}
      <Image src={IntroImage} alt="wedding-info" className="m-auto" priority />

      {/* 텍스트 오버레이 */}
      <div className="relative z-10 mt-4 flex flex-col items-center text-center text-xs font-light leading-relaxed text-gray-200">
        <p>신랑 이진호 & 신부 김태운</p>
        <p className="whitespace-nowrap">2026.1.25 (일) 4:00 pm | 로얄파크컨벤션 파크홀</p>
      </div>
    </div>
  );
}
