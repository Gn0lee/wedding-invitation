import Image from 'next/image';
import { Section } from '@/domains/main/components/Section';

export function MainHero() {
  return (
    <Section className="text-white">
      <div className="container m-auto flex h-full flex-col items-center justify-center px-4 lg:flex-row lg:justify-around">
        {/* Text Content */}
        <div className="flex w-full flex-1 flex-col items-center justify-center text-center md:text-left">
          <div className="inline-block max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-full">
            <Image
              src="/images/main/hero-title.png"
              alt="장보기도 쇼핑도 배민에서"
              width={584}
              height={331}
              priority
              className="h-auto max-h-[20vh] w-full object-contain"
            />
          </div>
          <div className="mt-4 space-y-1 text-sm md:text-base">
            <p>지금 필요한 건 지금 받아야죠!</p>
            <p>토마토부터 핸드폰까지, 편의점부터 대형마트까지</p>
            <p>이젠 택배말고 배달하세요.</p>
            <div className="pt-2 text-xs opacity-70">
              <p>배민장보기쇼핑은 현재 전국 일부 지역에서 서비스 중입니다.</p>
              <p>더 많은 지역으로 확장 준비 중이니 조금만 기다려 주세요.</p>
            </div>
          </div>
        </div>
        {/* Image Content */}
        <div className="flex w-full flex-1 items-center justify-center">
          <Image
            src="/images/main/hero-image.png"
            alt="배달 음식"
            width={700}
            height={700}
            className="max-h-[40vh] w-full max-w-[300px] object-contain md:max-w-[400px] lg:max-w-[600px]"
          />
        </div>
      </div>
    </Section>
  );
}
