import { Header } from '@/domains/main/components/Header';
import { MainHero } from '@/domains/main/components/MainHero';
import { RemainTimeHero } from '@/domains/main/components/RemainTimeHero';

export default function Home() {
  return (
    <div className="size-full snap-y snap-mandatory overflow-y-auto">
      <div className="relative mx-auto w-fit">
        <Header />
        <MainHero />
        <RemainTimeHero />
      </div>
    </div>
  );
}
