-- 계좌 정보 배치 업데이트 함수 생성
CREATE OR REPLACE FUNCTION update_wedding_accounts_batch(
  p_wedding_info_id UUID,
  p_accounts JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  account_record JSONB;
BEGIN
  -- 트랜잭션 시작
  BEGIN
    -- 기존 계좌 삭제
    DELETE FROM wedding_accounts 
    WHERE wedding_info_id = p_wedding_info_id;
    
    -- 새 계좌 생성
    FOR account_record IN SELECT * FROM jsonb_array_elements(p_accounts)
    LOOP
      INSERT INTO wedding_accounts (
        wedding_info_id,
        side,
        name,
        bank,
        account_number,
        account_holder,
        created_at,
        updated_at
      ) VALUES (
        p_wedding_info_id,
        (account_record->>'side')::wedding_side,
        account_record->>'name',
        account_record->>'bank',
        account_record->>'account_number',
        account_record->>'account_holder',
        NOW(),
        NOW()
      );
    END LOOP;
    
    -- 트랜잭션 커밋
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      -- 트랜잭션 롤백
      ROLLBACK;
      RAISE;
  END;
END;
$$;
