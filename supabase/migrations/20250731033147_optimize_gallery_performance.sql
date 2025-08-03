-- =====================================================
-- 갤러리 성능 최적화 및 뷰 생성
-- =====================================================

-- 1. 페이지네이션을 위한 복합 인덱스 추가
CREATE INDEX idx_gallery_images_taken_at_likes_count ON gallery_images(taken_at DESC, likes_count DESC);
CREATE INDEX idx_gallery_images_created_at_likes_count ON gallery_images(created_at DESC, likes_count DESC);
CREATE INDEX idx_gallery_images_likes_count_taken_at ON gallery_images(likes_count DESC, taken_at DESC);

-- 2. 좋아요 수 집계를 위한 인덱스 추가
CREATE INDEX idx_gallery_image_likes_image_created ON gallery_image_likes(image_id, created_at);

-- 3. 사용자별 좋아요 상태를 포함한 뷰 생성
CREATE OR REPLACE VIEW gallery_images_with_user_likes AS
SELECT 
  gi.id,
  gi.src,
  gi.width,
  gi.height,
  gi.name,
  gi.bride_comment,
  gi.groom_comment,
  gi.likes_count,
  gi.taken_at,
  gi.created_at,
  gi.updated_at,
  CASE WHEN gil.user_id IS NOT NULL THEN true ELSE false END as is_liked_by_user
FROM gallery_images gi
LEFT JOIN gallery_image_likes gil ON gi.id = gil.image_id AND gil.user_id = auth.uid();

-- 4. 뷰는 기본 테이블의 RLS 정책을 상속받으므로 별도 정책 불필요
-- gallery_images 테이블의 읽기 정책이 뷰에도 적용됨

-- 5. 성능 최적화를 위한 통계 정보 업데이트 함수
CREATE OR REPLACE FUNCTION refresh_gallery_statistics()
RETURNS void AS $$
BEGIN
  -- 테이블 통계 정보 업데이트
  ANALYZE gallery_images;
  ANALYZE gallery_image_likes;
END;
$$ LANGUAGE plpgsql;

-- 6. 좋아요 수 정확성 검증 함수
CREATE OR REPLACE FUNCTION verify_likes_count()
RETURNS TABLE(image_id UUID, actual_count BIGINT, stored_count INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gi.id,
    COUNT(gil.id)::BIGINT as actual_count,
    gi.likes_count
  FROM gallery_images gi
  LEFT JOIN gallery_image_likes gil ON gi.id = gil.image_id
  GROUP BY gi.id, gi.likes_count
  HAVING COUNT(gil.id) != gi.likes_count;
END;
$$ LANGUAGE plpgsql;

-- 7. 좋아요 수 동기화 함수 (불일치 시 수정)
CREATE OR REPLACE FUNCTION sync_likes_count()
RETURNS void AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN 
    SELECT 
      gi.id,
      COUNT(gil.id) as actual_count
    FROM gallery_images gi
    LEFT JOIN gallery_image_likes gil ON gi.id = gil.image_id
    GROUP BY gi.id
  LOOP
    UPDATE gallery_images 
    SET likes_count = rec.actual_count
    WHERE id = rec.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql; 