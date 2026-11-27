# Speech Mentor AI의 Lemon Squeezy 설정

> 보관용 문서입니다. Lemon Squeezy는 2026년 11월 16일 신규 스토어 등록을 중단했습니다. 신규 출시 준비는 [Paddle 테스트 설정](06-paddle-setup.md)을 참조하세요.

## 테스트 상품 등록

1. Lemon Squeezy 대시보드에서 스토어를 만들고 Test mode를 켭니다.
2. **Products → New Product**에서 상품명 `Speech Mentor AI Pro`와 설명을 입력합니다. 설명에 실제 제공 기능, 사용 한도, 갱신 주기를 표시합니다. 가격은 확정 전까지 테스트 용도로만 사용합니다.
3. 가격 유형에서 **Subscription**과 월간 결제 주기를 설정합니다. 연간 요금은 같은 상품의 별도 variant로, 세션권을 출시할 때는 **Single payment** 상품으로 구성할 수 있습니다. 현재 체크아웃은 설정한 variant 하나를 지원합니다.
4. 테스트 상품을 저장하고 해당 variant ID와 store ID를 확인합니다. Checkout 링크와 별도로 앱에서는 variant ID를 사용합니다.
5. 스토어의 실제 판매 활성화와 심사를 마친 뒤 테스트 상품을 라이브 모드로 복사하거나 다시 만들고, 라이브 variant ID를 별도로 확인합니다.

[상품 등록](https://docs.lemonsqueezy.com/help/products/adding-products) · [Variant](https://docs.lemonsqueezy.com/help/products/variants) · [테스트 모드](https://docs.lemonsqueezy.com/help/getting-started/test-mode)

## 앱 연결

앱에 로그인한 사용자가 `POST /api/billing/checkout`을 호출하면 Cloudflare Worker가 서버에서 Lemon Squeezy 체크아웃 URL을 생성합니다. Worker는 Supabase에서 사용자 세션을 확인하고 검증한 사용자 ID를 체크아웃의 custom data로 전달합니다.

Cloudflare의 `speech-mentor-ai` Worker에 `SUPABASE_URL`, `SUPABASE_ANON_KEY`와 함께 아래 값을 설정합니다.

| 설정 | 용도 |
| --- | --- |
| `LEMON_SQUEEZY_API_KEY` | Worker에 시크릿으로 등록하는 API 키 |
| `LEMON_SQUEEZY_STORE_ID` | 스토어 ID |
| `LEMON_SQUEEZY_VARIANT_ID` | 구매할 요금 옵션 ID |
| `LEMON_SQUEEZY_TEST_MODE` | 테스트에서 `true`, 실제 판매에서 `false` |
| `BILLING_ENABLED` | 결제와 이용권 검증을 마친 환경에서만 `true` |

Lemon Squeezy의 결제 완료 화면은 사용자를 계정 페이지로 돌려보냅니다. 이용권은 서버에서 서명을 검증한 웹훅으로 지급해야 합니다. 결제 버튼을 공개하기 전에 웹훅 처리, 중복 이벤트 처리, 계정별 이용권 저장, 취소·만료·결제 실패에 따른 권한 변경을 연결하고 테스트합니다. 현재 구현 범위는 체크아웃 생성까지입니다.

[Checkout API](https://docs.lemonsqueezy.com/api/checkouts/create-checkout) · [웹훅 서명](https://docs.lemonsqueezy.com/help/webhooks/signing-requests)
