# Paddle 테스트 결제 설정

월 £6.99를 테스트 가격으로 사용합니다. 라이브 가격과 Pro 혜택은 테스트와 사업 검토를 거쳐 확정합니다.

1. Paddle Sandbox에 제품을 만든 뒤 GBP 6.99 월간 반복 가격을 등록합니다.
2. Sandbox의 Checkout configuration에서 Default payment link를 `https://speech-mentor-ai.com/checkout`으로 설정합니다.
3. Cloudflare Worker 설정에 `PADDLE_SANDBOX_PRICE_ID`, `PADDLE_SANDBOX_CLIENT_TOKEN`과 시크릿 `PADDLE_SANDBOX_API_KEY`를 등록합니다. API 키에는 거래 생성에 필요한 권한만 부여합니다. Supabase 계정 기능도 먼저 구성합니다.
4. 지정된 테스트 환경에서 `BILLING_SANDBOX_ENABLED=true`로 설정하고 계정 페이지에서 테스트 결제를 시작합니다. 구현은 Sandbox API와 테스트 클라이언트 토큰만 사용합니다.
5. 실제 판매 전에는 라이브 사이트·계정 승인 및 한국 정산 확인, 구독 웹훅 서명 확인, 계정별 Pro 이용권 지급과 회수, 중복 이벤트 처리가 필요합니다. 현재 코드는 테스트 거래 및 Checkout 열기까지 지원합니다.

Paddle 사이트 심사 자료에는 제품 설명, 실제 판매 가격, 이용약관, 개인정보처리방침 및 환불정책이 필요합니다. 공개 정책에는 운영자 정보와 실제 데이터 처리 및 고객 지원 조건을 반영합니다.

[기본 결제 링크](https://developer.paddle.com/build/transactions/default-payment-link/) · [테스트 환경](https://developer.paddle.com/build/tools/sandbox/) · [계정 심사](https://www.paddle.com/help/start/account-verification/what-is-account-verification)
