'use client';

import { motion } from 'framer-motion';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomContent } from '@/components/hero/HeroBottomContent';
import { HeroContainer } from '@/components/hero/HeroContainer';
import { HeroDescription } from '@/components/hero/HeroDescription';
import { HeroSection } from '@/components/hero/HeroSection';
import { HeroTextColumn } from '@/components/hero/HeroTextColumn';

export function MainHero() {
  return (
    <HeroSection id="main">
      <HeroBackground
        image={{
          src: 'https://phhlmbcnhhuenmslkawd.supabase.co/storage/v1/object/public/static/040A2346.webp',
          alt: 'Main Hero',
          fill: true,
          className: 'brightness-[0.5]',
        }}
      />
      <HeroContainer>
        <HeroTextColumn>
          <HeroDescription className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: 'easeOut' }}
              className="mb-6 text-2xl font-extrabold"
            >
              이진호 <strong className="text-lg font-[900]">그리고</strong> 김태운,
              <br />
              저희 결혼합니다.
            </motion.div>
            {/* 첫 번째 문단 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.8, ease: 'easeOut' }}
            >
              <p>서로를 바라보는 마음이 쌓여</p>
              <p>
                어느새 깊은 <strong className="text-lg font-[900]">진</strong>심이 되었고,
              </p>
              <p>
                맑고 잔잔한 <strong className="text-lg font-[900]">호</strong>수처럼
              </p>
              <p>서로의 세상을 담아내게 되었습니다.</p>
            </motion.div>
            <br />
            {/* 두 번째 문단 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 3.1, ease: 'easeOut' }}
            >
              <p>이제 두 사람,</p>
              <p>
                한낮의 햇살처럼 따스한 <strong className="text-lg font-[900]">태</strong>양 아래
              </p>
              <p>
                손을 맞잡고 새로<strong className="text-lg font-[900]">운</strong> 길을 걸어가려
                합니다.
              </p>
            </motion.div>
            <br />
            {/* 세 번째 문단 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 4.4, ease: 'easeOut' }}
            >
              <p>저희의 새로운 시작에 함께해 주신다면</p>
              <p>그 마음을 오래도록 간직하겠습니다</p>
            </motion.div>
          </HeroDescription>
        </HeroTextColumn>
        <HeroBottomContent className="mt-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 5.7,
              ease: 'easeOut',
            }}
          >
            <p className="leading-loose">
              <span>이진구 · 이선배</span>
              <span className="align-baseline text-xs"> 의 아들 </span>
              <span className="text-xl font-extrabold drop-shadow">진호</span>
            </p>
            <p className="leading-loose">
              <span>김종현 · 임송미</span>
              <span className="align-baseline text-xs"> 의 딸 </span>
              <span className="text-xl font-extrabold drop-shadow">태운</span>
            </p>
          </motion.div>
        </HeroBottomContent>
      </HeroContainer>
    </HeroSection>
  );
}
