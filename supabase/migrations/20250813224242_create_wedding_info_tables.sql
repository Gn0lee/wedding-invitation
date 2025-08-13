-- 결혼 정보 관리를 위한 테이블 생성
-- 2024-12-20

-- 1. 결혼 기본 정보 테이블
CREATE TABLE wedding_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 계좌 정보 테이블
CREATE TABLE wedding_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_info_id UUID NOT NULL REFERENCES wedding_info(id) ON DELETE CASCADE,
  side TEXT NOT NULL CHECK (side IN ('groom', 'bride')),
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 연락처 정보 테이블
CREATE TABLE wedding_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_info_id UUID NOT NULL REFERENCES wedding_info(id) ON DELETE CASCADE,
  side TEXT NOT NULL CHECK (side IN ('groom', 'bride')),
  role TEXT NOT NULL,
  full_name TEXT NOT NULL,
  contact_type TEXT NOT NULL,
  contact_value TEXT NOT NULL,
  contact_label TEXT, -- nullable로 설정
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 기타 정보 테이블
CREATE TABLE wedding_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_info_id UUID NOT NULL REFERENCES wedding_info(id) ON DELETE CASCADE,
  meal_info TEXT,
  parking_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_wedding_accounts_wedding_info_id ON wedding_accounts(wedding_info_id);
CREATE INDEX idx_wedding_accounts_side ON wedding_accounts(side);
CREATE INDEX idx_wedding_contacts_wedding_info_id ON wedding_contacts(wedding_info_id);
CREATE INDEX idx_wedding_contacts_side ON wedding_contacts(side);
CREATE INDEX idx_wedding_details_wedding_info_id ON wedding_details(wedding_info_id);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_wedding_info_updated_at BEFORE UPDATE ON wedding_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wedding_accounts_updated_at BEFORE UPDATE ON wedding_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wedding_contacts_updated_at BEFORE UPDATE ON wedding_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wedding_details_updated_at BEFORE UPDATE ON wedding_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE wedding_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_details ENABLE ROW LEVEL SECURITY;

-- 기본 RLS 정책 (모든 사용자가 읽기 가능, 관리자만 쓰기 가능)
-- TODO: 실제 인증 시스템 구현 후 정책 수정 필요

-- 읽기 정책 (모든 사용자)
CREATE POLICY "Allow public read access to wedding_info" ON wedding_info
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to wedding_accounts" ON wedding_accounts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to wedding_contacts" ON wedding_contacts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to wedding_details" ON wedding_details
  FOR SELECT USING (true);

-- 관리자 쓰기 정책 (임시로 모든 사용자 허용, 나중에 수정 필요)
CREATE POLICY "Allow admin write access to wedding_info" ON wedding_info
  FOR ALL USING (true);

CREATE POLICY "Allow admin write access to wedding_accounts" ON wedding_accounts
  FOR ALL USING (true);

CREATE POLICY "Allow admin write access to wedding_contacts" ON wedding_contacts
  FOR ALL USING (true);

CREATE POLICY "Allow admin write access to wedding_details" ON wedding_details
  FOR ALL USING (true);
