-- =====================================================
-- profiles 테이블에 role 필드 추가
-- =====================================================

-- 1. role enum 타입 생성
CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');

-- 2. profiles 테이블에 role 필드 추가 (기본값: 'user')
ALTER TABLE public.profiles 
ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- 3. 기존 사용자들의 role을 'user'로 설정 (안전장치)
UPDATE public.profiles 
SET role = 'user' 
WHERE role IS NULL;

-- 4. role 필드에 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 5. handle_new_user 함수 업데이트 (새 사용자 가입 시 role 설정)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    name,
    full_name,
    preferred_username,
    email,
    avatar_url,
    role
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'preferred_username',
    COALESCE(NEW.email, ''),
    NEW.raw_user_meta_data->>'avatar_url',
    'user'  -- 기본값으로 'user' 설정
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 