import { Header } from '@/domains/main/components/Header';
import { MainHero } from '@/domains/main/components/MainHero';
import { Section } from '@/domains/main/components/Section';

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-full snap-y snap-mandatory overflow-y-auto">
        <MainHero />
        <Section
          className="pt-[72px] md:pt-[88px] lg:pt-[104px]"
          bgColor="bg-blue-100"
          textColor="text-blue-900"
        >
          <span className="text-2xl font-bold">Section 2</span>
        </Section>
        <Section
          className="pt-[72px] md:pt-[88px] lg:pt-[104px]"
          bgColor="bg-green-100"
          textColor="text-green-900"
        >
          <span className="text-2xl font-bold">Section 3</span>
        </Section>
      </div>
    </>
  );
}
