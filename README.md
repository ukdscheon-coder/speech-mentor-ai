# Speech Mentor AI

원고를 스피치 악보로 바꾸고, 모범 음성으로 시연한 뒤 따라 말하며 코칭받는 앱입니다. Cloudflare Workers에서 동작합니다.

## 구성
- `public/index.html`: 화면 (텔레프롬프터, 재생, 쉐도잉, 마이크 코칭, Q&A 드로어)
- `src/worker.js`: `/api/*` 라우팅, 나머지는 정적 파일 제공
- `src/routes/`: `script` (Writer + Director 에이전트), `coach` (Tutor), `qa` (Reviewer), `tts` (Gemini 뉴럴 음성), `history` (Supabase 기록), `health`
- `lib/`: 에이전트 프롬프트, AI 출력 검증, API 키가 없을 때 쓰는 규칙 기반 대체 로직
- `supabase/schema.sql`: 연습 기록 테이블

## 시크릿 (코드에 넣지 않음)
```
npx wrangler secret put ANTHROPIC_API_KEY   # AI 원고 생성, 코칭, Q&A (필수)
npx wrangler secret put GEMINI_API_KEY      # 뉴럴 음성 (선택)
npx wrangler secret put SUPABASE_URL        # 연습 기록 (선택)
npx wrangler secret put SUPABASE_SERVICE_KEY
```
`ANTHROPIC_MODEL` 변수로 모델을 바꿀 수 있습니다 (기본값 `claude-haiku-5-5`).

## 실행과 배포
```
npm install
npm run dev       # 로컬 실행
npm run deploy    # 배포
```
`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 배포합니다. 저장소 시크릿 `CLOUDFLARE_API_TOKEN`이 필요합니다.

## 키가 없을 때
AI 키가 없으면 규칙 기반 데모 모드로 동작합니다. PDF와 사진 첨부, Q&A 질문 생성, 뉴럴 음성, 기록 저장은 해당 키가 있어야 켜집니다.
