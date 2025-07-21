import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HeroBackground } from '@/domains/main/components/hero/HeroBackground';
import { HeroBottomContent } from '@/domains/main/components/hero/HeroBottomContent';
import { HeroContainer } from '@/domains/main/components/hero/HeroContainer';
import { HeroDescription } from '@/domains/main/components/hero/HeroDescription';
import { HeroSection } from '@/domains/main/components/hero/HeroSection';
import { HeroTextColumn } from '@/domains/main/components/hero/HeroTextColumn';
import { HeroTitle } from '@/domains/main/components/hero/HeroTitle';
import { AccountItem } from '@/domains/main/components/information/AccountItem';
import {
  defaultInformationData,
  type InformationData,
} from '@/domains/main/components/information/data';

interface InformationSectionProps {
  data?: InformationData;
}

export function InformationSection({ data }: InformationSectionProps) {
  // props가 있으면 사용하고, 없으면 기본값 사용
  const finalData = data || defaultInformationData;

  return (
    <HeroSection id="information">
      <HeroBackground
        image={{
          src: '/images/main/DSCF0079.JPG',
          alt: '안내사항 배경',
          fill: true,
          className: 'brightness-[0.5]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroTitle className="text-center">안내사항</HeroTitle>
          <HeroDescription className="text-center">
            <p>식사, 주차, 계좌번호 등</p>
            <p>참석하시는 분들을 위한</p>
            <p>유용한 정보를 확인하세요</p>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="min-h-0 overflow-y-auto pt-8">
          <div className="mx-auto w-full max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {/* 식사안내 */}
              <AccordionItem value="meal" className="border-b border-gray-200/20">
                <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                  식사안내
                </AccordionTrigger>
                <AccordionContent>
                  <div className="leading-relaxed text-gray-100">{finalData.mealInfo}</div>
                </AccordionContent>
              </AccordionItem>

              {/* 주차안내 */}
              <AccordionItem value="parking" className="border-b border-gray-200/20">
                <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                  주차안내
                </AccordionTrigger>
                <AccordionContent>
                  <div className="leading-relaxed text-gray-100">{finalData.parkingInfo}</div>
                </AccordionContent>
              </AccordionItem>

              {/* 신랑측 계좌번호 */}
              <AccordionItem value="groom-account" className="border-b border-gray-200/20">
                <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                  신랑측 계좌번호
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {finalData.groomAccounts.map((account, index) => (
                      <AccountItem key={index} account={account} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 신부측 계좌번호 */}
              <AccordionItem value="bride-account" className="border-b border-gray-200/20">
                <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
                  신부측 계좌번호
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {finalData.brideAccounts.map((account, index) => (
                      <AccountItem key={index} account={account} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
