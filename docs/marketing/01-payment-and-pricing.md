# Payment and pricing recommendation

Status: recommendation, pending the owner's confirmation before setup.

## 1. Payment provider

Target: subscriptions sold to buyers in the UK, US, Japan, the EU and elsewhere.

| Option | Who handles VAT and sales tax | Fit for this app |
|---|---|---|
| Lemon Squeezy (recommended to start) | The provider acts as Merchant of Record and collects and remits tax in most countries | Fastest setup for a solo founder. Subscriptions, hosted checkout and a customer portal are included. |
| Paddle | Merchant of Record, same tax model | Stronger if invoicing for businesses and teams grows. Setup is heavier. |
| Stripe | The seller (you) is responsible for tax registration in each country. Stripe Tax calculates it but does not file it. | Lowest per-transaction fees at scale, but tax compliance becomes your job. Best added later. |

Recommendation: start with Lemon Squeezy. As a Merchant of Record it removes the foreign VAT and sales tax registration burden, which a UK sole trader would otherwise carry in each market. Move to Stripe only when monthly volume justifies the extra tax work.

Checks before choosing (verify on each provider's current pages, since fees and ownership change):
- Current fee per transaction and whether it applies to subscriptions.
- Payouts to a UK bank account and the payout schedule.
- Whether the provider lists Japan, the US, the EU and the UK as supported selling regions.
- Whether Stripe's acquisition of Lemon Squeezy changes the product roadmap. Confirm the current position.

## 2. Monetisation model

Why the model matters here: speech practice is episodic. People buy when a talk, pitch or exam is near, then stop. Heavy usage also carries real per-use cost, because each AI coaching call and each neural voice line costs money.

Recommended structure:

1. Free tier (acquisition). Teleprompter, cue cards, camera gesture cues and browser voice cost nothing to run, so they stay free. Allow a small number of AI coaching sessions and neural voice lines per month.
2. Pro monthly subscription (core revenue). Unlimited AI coaching, neural voice, and all languages and famous speeches. Suggested starting range: £4.99 to £7.99 per month, with local prices set by the provider. Validate against real conversion data.
3. Annual Pro plan (retention). Offer about two months free against the monthly price. Annual payers churn less.
4. Session pack (occasional users). A one-off pack of about 10 AI coaching sessions for people with a single talk coming up. This captures buyers who would not subscribe.

Why not pure one-off payment or pure credits: one-off payment leaves no recurring revenue to cover AI costs. Pure credits make the price hard to understand. A monthly subscription with a generous free tier and a session pack covers both acquisition and recurring income.

Success measures to track from launch:
- Visitor to sign-up rate.
- Free to Pro conversion, target set after the first 30 days of data.
- Monthly churn and annual share.
- AI cost per active Pro user (Anthropic and Gemini usage), to keep margin positive.
