import { MapAppButtons } from '@/components/MapAppButtons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AccountItem } from '@/domains/main/components/information/AccountItem';
import { ContactItem } from '@/domains/main/components/information/ContactItem';
import type { InformationData } from '@/types/information';

interface InformationContentProps {
  data: InformationData;
}

export function InformationContent({ data }: InformationContentProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion type="single" collapsible className="w-full">
        {/* 식사안내 */}
        <AccordionItem value="meal" className="border-b border-gray-200/20">
          <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
            식사안내
          </AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-line leading-relaxed text-gray-100">{data.mealInfo}</div>
          </AccordionContent>
        </AccordionItem>

        {/* 주차안내 */}
        <AccordionItem value="parking" className="border-b border-gray-200/20">
          <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
            주차안내
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="whitespace-pre-line leading-relaxed text-gray-100">
                {data.parkingInfo}
              </div>
              <div className="pt-2">
                <p className="mb-3 text-sm text-gray-200">길찾기</p>
                <MapAppButtons />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 신랑측 계좌번호 */}
        <AccordionItem value="groom-account" className="border-b border-gray-200/20">
          <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
            신랑측 계좌번호
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {data.groomAccounts.map((account, index) => (
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
              {data.brideAccounts.map((account, index) => (
                <AccountItem key={index} account={account} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 신랑측 연락처 */}
        <AccordionItem value="groom-contacts" className="border-b border-gray-200/20">
          <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
            신랑측 연락처
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {data.groomContacts.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 신부측 연락처 */}
        <AccordionItem value="bride-contacts" className="border-b border-gray-200/20">
          <AccordionTrigger className="text-lg font-semibold text-gray-50 hover:text-white [&>svg]:text-gray-50">
            신부측 연락처
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {data.brideContacts.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
