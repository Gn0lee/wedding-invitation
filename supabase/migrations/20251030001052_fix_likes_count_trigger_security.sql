-- =====================================================
-- 좋아요 카운트 트리거 보안 수정
-- =====================================================
-- 문제: update_likes_count() 함수가 SECURITY DEFINER 없이 실행되어
--       일반 사용자의 좋아요 추가/삭제 시 RLS로 인해 likes_count 업데이트 실패
-- 해결: SECURITY DEFINER를 추가하여 트리거가 시스템 권한으로 실행되도록 수정

-- 1. update_likes_count 함수를 SECURITY DEFINER로 재생성
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER  -- 시스템 권한으로 실행되도록 설정
SET search_path = public  -- 보안: search_path 고정
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE gallery_images 
    SET likes_count = likes_count + 1
    WHERE id = NEW.image_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE gallery_images 
    SET likes_count = likes_count - 1
    WHERE id = OLD.image_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- 2. 불일치된 데이터 동기화 (기존 데이터 수정)
DO $$
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
    WHERE id = rec.id 
      AND likes_count != rec.actual_count;  -- 불일치한 것만 업데이트
  END LOOP;
  
  RAISE NOTICE 'Gallery likes_count synchronization completed';
END;
$$;

-- 3. 동기화 결과 확인 (불일치 데이터가 있는지 검증)
DO $$
DECLARE
  mismatched_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO mismatched_count
  FROM (
    SELECT 
      gi.id,
      gi.likes_count as stored,
      COUNT(gil.id) as actual
    FROM gallery_images gi
    LEFT JOIN gallery_image_likes gil ON gi.id = gil.image_id
    GROUP BY gi.id, gi.likes_count
    HAVING COUNT(gil.id) != gi.likes_count
  ) AS mismatches;
  
  IF mismatched_count > 0 THEN
    RAISE WARNING 'Still % mismatched records found after sync', mismatched_count;
  ELSE
    RAISE NOTICE 'All gallery likes_count values are now synchronized';
  END IF;
END;
$$;

