import Image from 'next/image';

import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';
import { HeroTitle } from '@/components/hero/HeroTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function MapHero() {
  return (
    <HeroSection>
      <HeroBackground
        image={{
          src: '/images/location/040A5895.jpg',
          alt: '찾아오시는 길 배경',
          fill: true,
          className: 'brightness-[0.7]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle>찾아오시는 길</HeroTitle>
          <HeroDescription>로얄파크컨벤션으로 오시는 방법을 안내해드립니다.</HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="min-h-0 overflow-y-auto pt-8">
          <Accordion type="single" collapsible className="w-full">
            {/* 약도 */}
            <AccordionItem value="map" className="border-b border-gray-200/20">
              <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                약도
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative aspect-[750/613] w-full rounded-md bg-gray-50">
                  <Image
                    src="/images/location/230612-약도-명칭수정.png"
                    alt="로얄파크컨벤션 약도"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 지하철 정보 */}
            <AccordionItem value="subway" className="border-b border-gray-200/20">
              <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                지하철 이용 시
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 leading-relaxed text-gray-100">
                  <p>① 6호선 : 삼각지역 12번 출구 (도보 3분)</p>
                  <p>② 4호선 : 삼각지역 1번 출구 (도보 5분)</p>
                  <p>③ 1호선 : 남영역 1번 출구 (도보 7분)</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 버스 정보 */}
            <AccordionItem value="bus" className="border-b border-gray-200/20">
              <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                버스 이용 시
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 leading-relaxed text-gray-100">
                  <div>
                    <p className="font-medium">① 마을버스</p>
                    <p>- 용산03 (전쟁기념관 하차)</p>
                  </div>
                  <div>
                    <p className="font-medium">② 간선버스 (전쟁기념관 하차)</p>
                    <p>- 110A, 110B, 421, 740, N72, N75</p>
                  </div>
                  <div>
                    <p className="font-medium">③ 삼각지역 하차</p>
                    <p>
                      - 421, N75, 100, 150, 151, 152, 500, 501, 502, 504, 506, 507, 605, 742, 750A,
                      750B, 752, N15
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 자가용 정보 */}
            <AccordionItem value="car" className="border-b border-gray-200/20">
              <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                자가용 이용 시
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 leading-relaxed text-gray-100">
                  <div>
                    <p className="font-medium">① 한강대교에서 오시는 경우</p>
                    <p>- 서울역 방면으로 오셔서 삼각지역 사거리를 지나서 북문으로 우회전 진입</p>
                  </div>
                  <div>
                    <p className="font-medium">② 서울역에서 오시는 경우</p>
                    <p>
                      - 한강대교 방면으로 오셔서 삼각지역 사거리에서 좌회전 후 70M 전방에서 서문으로
                      좌회전 진입
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">③ 이태원방면에서 오시는 경우</p>
                    <p>- 삼각지역 사거리 방향으로 오시다가 동문으로 우회전 진입</p>
                  </div>
                  <div>
                    <p className="font-medium">④ 마포(공덕역)에서 오시는 경우</p>
                    <p>
                      - 삼각지 고가차도를 넘어 삼각지역 사거리에서 직진 후 70M 전방에서 서문으로
                      좌회전 진입
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 주차 정보 */}
            <AccordionItem value="parking" className="border-b border-gray-200/20">
              <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                주차장 이용 안내
              </AccordionTrigger>
              <AccordionContent>
                <div className="leading-relaxed text-gray-100">
                  <p>- 전쟁기념관내 지상, 지하 주차 가능</p>
                  <p>- 지상, 지하 주차 1000대 가능</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
