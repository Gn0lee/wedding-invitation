-- =====================================================
-- gallery_images 테이블에서 blur_data_url 컬럼 제거
-- =====================================================

-- 1. blur_data_url 컬럼에 대한 인덱스 제거
DROP INDEX IF EXISTS idx_gallery_images_blur_data_url;

-- 2. gallery_images 테이블에서 blur_data_url 컬럼 제거
ALTER TABLE gallery_images 
DROP COLUMN IF EXISTS blur_data_url;
