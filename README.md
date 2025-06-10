# 결혼 모바일 청첩장

이 프로젝트는 Next.js 기반의 결혼 모바일 청첩장입니다. 다양한 최신 프론트엔드/백엔드 스택을 활용하여, 모바일 환경에 최적화된 청첩장 서비스를 제공합니다.

## 주요 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org)
- **상태관리**: [TanStack Query](https://tanstack.com/query/latest), [Jotai](https://jotai.org)
- **스타일/UI**: [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)
- **API 호출**: fetch API
- **인증**: [Supabase](https://supabase.com) Kakao OAuth
- **DB/스토리지**: Supabase
- **배포**: Github Actions, [Vercel](https://vercel.com) (Next.js API Route 활용)

## 개발 시작하기

1. 패키지 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 폴더 구조

- `src/` : 주요 소스 코드
- `public/` : 정적 파일(이미지 등)
- `pages/` 또는 `app/` : Next.js 라우트

## 배포

- Github Actions를 통한 CI/CD
- Vercel을 통한 프론트/백엔드(Next.js API Route) 통합 배포

## 인증 및 데이터베이스

- Supabase를 통한 Kakao OAuth 인증
- Supabase DB 및 Storage 활용

## 커뮤니티 & 문의

- Pull Request 및 Issue 환영

---

본 프로젝트는 신랑/신부의 결혼을 축하해주시는 모든 분들께 편리한 모바일 청첩장 경험을 제공하기 위해 제작되었습니다.
