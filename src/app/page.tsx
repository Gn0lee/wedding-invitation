import { Header } from '@/domains/main/components/Header';
import { MainHero } from '@/domains/main/components/MainHero';

export default function Home() {
  return (
    <div className="relative flex size-full snap-y snap-mandatory  items-center justify-center overflow-y-auto shadow-2xl">
      <div className="relative aspect-[375/667] h-full max-w-full">
        <Header />
        <div className="h-full">
          <MainHero />
        </div>
      </div>
    </div>
  );
}
