-- gallery_images 테이블의 RLS 정책 수정 (admin, super_admin 모두 허용)

-- 기존 정책 삭제
DROP POLICY IF EXISTS "gallery_images_write_policy" ON gallery_images;

-- 새로운 정책 생성 (admin, super_admin 모두 허용)
CREATE POLICY "gallery_images_write_policy" ON gallery_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );
