-- =====================================================
-- RSVP 응답 관리 시스템 구축
-- =====================================================

-- 1. rsvp_responses 테이블 생성
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  side VARCHAR(10) NOT NULL CHECK (side IN ('groom', 'bride')),
  attend VARCHAR(10) NOT NULL CHECK (attend IN ('yes', 'no')),
  meal VARCHAR(10) CHECK (meal IN ('yes', 'no')), -- attend가 'yes'일 때만 필수
  adult_count INTEGER DEFAULT 0 CHECK (adult_count >= 0),
  child_count INTEGER DEFAULT 0 CHECK (child_count >= 0),
  agree_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 제약조건: 참석하지 않으면 식사 관련 정보는 null이어야 함
  CONSTRAINT check_meal_consistency 
    CHECK (
      (attend = 'yes' AND meal IS NOT NULL) OR 
      (attend = 'no' AND meal IS NULL AND adult_count = 0 AND child_count = 0)
    ),
  
  -- 제약조건: 식사를 하지 않으면 인원수는 0이어야 함
  CONSTRAINT check_meal_personnel_consistency
    CHECK (
      (meal = 'yes') OR 
      (meal = 'no' AND adult_count = 0 AND child_count = 0)
    ),
  
  -- 사용자당 하나의 응답만 허용
  UNIQUE(user_id)
);

-- 2. RLS (Row Level Security) 활성화
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- 3. RLS 정책 설정
-- 사용자는 자신의 RSVP 응답만 읽을 수 있음
CREATE POLICY "Users can view own rsvp response" ON public.rsvp_responses
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 RSVP 응답만 생성할 수 있음
CREATE POLICY "Users can insert own rsvp response" ON public.rsvp_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 RSVP 응답만 수정할 수 있음
CREATE POLICY "Users can update own rsvp response" ON public.rsvp_responses
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 RSVP 응답만 삭제할 수 있음
CREATE POLICY "Users can delete own rsvp response" ON public.rsvp_responses
  FOR DELETE USING (auth.uid() = user_id);

-- 4. updated_at 자동 업데이트 트리거
DROP TRIGGER IF EXISTS handle_rsvp_responses_updated_at ON public.rsvp_responses;
CREATE TRIGGER handle_rsvp_responses_updated_at
  BEFORE UPDATE ON public.rsvp_responses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_user_id ON public.rsvp_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_attend ON public.rsvp_responses(attend);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_side ON public.rsvp_responses(side);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_created_at ON public.rsvp_responses(created_at);

-- 6. 통계 뷰 생성 (관리자용)
CREATE OR REPLACE VIEW public.rsvp_statistics AS
SELECT 
  side,
  attend,
  meal,
  COUNT(*) as count,
  SUM(adult_count) as total_adults,
  SUM(child_count) as total_children
FROM public.rsvp_responses
GROUP BY side, attend, meal
ORDER BY side, attend, meal;

-- 7. RLS 정책 (통계 뷰는 관리자만 접근)
CREATE POLICY "Admins can view rsvp statistics" ON public.rsvp_statistics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  ); 