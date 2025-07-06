import Image from 'next/image';
import { Section } from '@/domains/main/components/Section';

export function MainHero() {
  return (
    <Section className="relative text-gray-50 ">
      <div className="absolute inset-0 z-0">
        <Image src="/images/main/DSCF0438.jpg" alt="Main Hero" fill />
      </div>
      <div className="container z-10 m-auto flex h-full flex-col px-4 pt-6 lg:flex-row lg:justify-around">
        {/* Text Content */}
        <div className="flex w-full shrink flex-col text-left">
          <h2 className="font-bmJua text-4xl font-medium leading-snug">
            태운이와 진호의
            <br />
            설레는 첫 시작에
            <br />
            여러분을 초대합니다
          </h2>
          <div className="mt-4 space-y-1 text-sm md:text-base">
            <p>2026년 1월 26일</p>
            <p>오후 4시</p>
            <p>로얄파크 컨벤션 파크홀</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
