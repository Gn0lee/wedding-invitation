import Image from 'next/image';
import { Section } from '@/domains/main/components/Section';

export function MainHero() {
  return (
    <Section className="bg-green-800 text-white">
      <div className="container m-auto flex h-full flex-col px-4 pt-6 lg:flex-row lg:justify-around">
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
        {/* Image Content */}
        <div className="flex w-full flex-1 items-end pt-4">
          <div className="relative size-full">
            <div className="absolute bottom-4 right-4 aspect-[2028/3120] h-3/4">
              <Image src="/images/main/DSCF0464.jpg" alt="어서오세요" fill />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
