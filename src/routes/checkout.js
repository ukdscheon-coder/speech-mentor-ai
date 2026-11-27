import { requireUser } from '../auth.js';
import { json, methodNotAllowed } from '../util.js';

export default async function checkout(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const priceId = env.PADDLE_SANDBOX_PRICE_ID;
  if (env.BILLING_SANDBOX_ENABLED !== 'true' || !env.PADDLE_SANDBOX_API_KEY ||
      !/^pri_[a-z0-9]+$/.test(priceId || '')) {
    return json({ error: 'Checkout is not available.' }, 503);
  }

  const { user, error } = await requireUser(request, env);
  if (error) return error;

  const result = await fetch('https://sandbox-api.paddle.com/transactions', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + env.PADDLE_SANDBOX_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ price_id: priceId, quantity: 1 }],
      collection_mode: 'automatic',
      custom_data: { user_id: user.id },
    }),
  });

  if (!result.ok) return json({ error: 'Unable to start test checkout.' }, 502);
  const { data } = await result.json();
  if (!/^txn_[a-z0-9]+$/.test(data?.id || '') || !data?.checkout?.url) {
    return json({ error: 'Unable to start test checkout.' }, 502);
  }

  const url = URL.parse(data.checkout.url);
  if (!url || url.origin !== 'https://speech-mentor-ai.com' ||
      url.pathname !== '/checkout' || url.searchParams.get('_ptxn') !== data.id) {
    return json({ error: 'Test checkout link is not configured.' }, 502);
  }
  return json({ url: url.href });
}
