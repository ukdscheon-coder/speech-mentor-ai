import { requireUser } from '../auth.js';
import { json, methodNotAllowed } from '../util.js';

export default async function checkout(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  // Enable only after the configured store, variant and fulfillment are verified.
  if (env.BILLING_ENABLED !== 'true' || !env.LEMON_SQUEEZY_API_KEY ||
      !/^\d+$/.test(env.LEMON_SQUEEZY_STORE_ID || '') ||
      !/^\d+$/.test(env.LEMON_SQUEEZY_VARIANT_ID || '') ||
      !['true', 'false'].includes(env.LEMON_SQUEEZY_TEST_MODE)) {
    return json({ error: 'Checkout is not available.' }, 503);
  }

  const { user, error } = await requireUser(request, env);
  if (error) return error;

  const variantId = env.LEMON_SQUEEZY_VARIANT_ID;
  const result = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + env.LEMON_SQUEEZY_API_KEY,
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          test_mode: env.LEMON_SQUEEZY_TEST_MODE === 'true',
          checkout_data: { email: user.email, custom: { user_id: user.id } },
          product_options: {
            enabled_variants: [Number(variantId)],
            redirect_url: 'https://speech-mentor-ai.com/account',
          },
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        },
        relationships: {
          store: { data: { type: 'stores', id: env.LEMON_SQUEEZY_STORE_ID } },
          variant: { data: { type: 'variants', id: variantId } },
        },
      },
    }),
  });

  if (!result.ok) return json({ error: 'Unable to start checkout.' }, 502);
  const { data } = await result.json();
  const url = data?.attributes?.url;
  if (!url || new URL(url).protocol !== 'https:') {
    return json({ error: 'Unable to start checkout.' }, 502);
  }
  return json({ url });
}
