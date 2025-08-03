-- 1. gallery_images 테이블 생성
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  src TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  name TEXT NOT NULL,
  bride_comment TEXT,
  groom_comment TEXT,
  likes_count INTEGER DEFAULT 0,
  taken_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. gallery_image_likes 테이블 생성
CREATE TABLE gallery_image_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id UUID NOT NULL REFERENCES gallery_images(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(image_id, user_id)
);

-- 3. 인덱스 생성
CREATE INDEX idx_gallery_images_taken_at ON gallery_images(taken_at);
CREATE INDEX idx_gallery_images_created_at ON gallery_images(created_at);
CREATE INDEX idx_gallery_images_likes_count ON gallery_images(likes_count);
CREATE INDEX idx_gallery_image_likes_image_user ON gallery_image_likes(image_id, user_id);
CREATE INDEX idx_gallery_image_likes_user ON gallery_image_likes(user_id);

-- 4. likes_count 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- 5. 트리거 생성
CREATE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON gallery_image_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_likes_count();

-- 6. updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. updated_at 트리거
CREATE TRIGGER trigger_update_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 8. RLS 정책 설정
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_image_likes ENABLE ROW LEVEL SECURITY;

-- gallery_images: 모든 사용자 읽기, admin만 쓰기
CREATE POLICY "gallery_images_read_policy" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "gallery_images_write_policy" ON gallery_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- gallery_image_likes: 인증된 사용자만 읽기/쓰기
CREATE POLICY "gallery_image_likes_read_policy" ON gallery_image_likes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "gallery_image_likes_write_policy" ON gallery_image_likes
  FOR ALL USING (auth.uid() IS NOT NULL); 