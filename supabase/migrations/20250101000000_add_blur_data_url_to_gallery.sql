-- =====================================================
-- gallery_images 테이블에 blur_data_url 컬럼 추가
-- =====================================================

-- 1. gallery_images 테이블에 blur_data_url 컬럼 추가
ALTER TABLE gallery_images 
ADD COLUMN blur_data_url TEXT;

-- 2. blur_data_url 컬럼에 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_gallery_images_blur_data_url ON gallery_images(blur_data_url);

-- 3. 기존 레코드들의 blur_data_url을 NULL로 초기화
-- (새로 업로드되는 이미지들만 blur_data_url이 생성됨)
UPDATE gallery_images 
SET blur_data_url = NULL 
WHERE blur_data_url IS NULL;
