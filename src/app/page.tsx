import { Header } from '@/domains/main/components/Header';
import { MainHero } from '@/domains/main/components/MainHero';
import { Section } from '@/domains/main/components/Section';

export default function Home() {
  return (
    <div className="relative flex size-full snap-y snap-mandatory  items-center justify-center overflow-y-auto shadow-2xl">
      <div className="relative aspect-[375/667] h-full">
        <Header />
        <div className="h-full">
          <MainHero />
          <Section className="bg-blue-100 text-blue-900">
            <span className="text-2xl font-bold">Section 2</span>
          </Section>
          <Section className="bg-green-100 text-green-900 ">
            <span className="text-2xl font-bold">Section 3</span>
          </Section>
        </div>
      </div>
    </div>
  );
}
