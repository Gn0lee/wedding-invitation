-- =====================================================
-- wedding_info 테이블에 created_by 필드 추가
-- =====================================================

-- 1. wedding_info 테이블에 created_by 컬럼 추가
ALTER TABLE wedding_info 
ADD COLUMN created_by UUID REFERENCES auth.users(id) NOT NULL;

-- 2. created_by 컬럼에 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_wedding_info_created_by ON wedding_info(created_by);

-- 3. 기존 레코드들의 created_by를 기본값으로 설정
-- (실제 운영에서는 기존 데이터의 소유자를 명시적으로 지정해야 함)
-- UPDATE wedding_info SET created_by = (SELECT id FROM auth.users LIMIT 1) WHERE created_by IS NULL;

-- 4. created_by 컬럼을 NOT NULL로 설정 (기본값 설정 후)
-- ALTER TABLE wedding_info ALTER COLUMN created_by SET NOT NULL;
