// Speech Mentor AI on Cloudflare Workers.
// /api/* runs as Worker routes (AI agents, neural voice, Supabase history). Everything else is served from public/.
import health from './routes/health.js';
import script from './routes/script.js';
import coach from './routes/coach.js';
import qa from './routes/qa.js';
import scenarios from './routes/scenarios.js';
import tts from './routes/tts.js';
import history from './routes/history.js';
import profile from './routes/profile.js';
import authConfig from './routes/auth-config.js';
import checkout from './routes/checkout.js';
import { json } from './util.js';

const ROUTES = {
  '/api/health': health,
  '/api/script': script,
  '/api/coach': coach,
  '/api/qa': qa,
  '/api/scenarios': scenarios,
  '/api/tts': tts,
  '/api/history': history,
  '/api/profile': profile,
  '/api/auth-config': authConfig,
  '/api/billing/checkout': checkout,
  '/api/billing/sandbox-config': (request, env) => {
    if (request.method !== 'GET') return json({ error: 'Use GET.' }, 405);
    const token = env.PADDLE_SANDBOX_CLIENT_TOKEN;
    if (env.BILLING_SANDBOX_ENABLED !== 'true' || !/^test_[a-z0-9]+$/i.test(token || '')) {
      return json({ error: 'Test checkout is not available.' }, 503);
    }
    return json({ token });
  },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const route = ROUTES[url.pathname];

    if (!route) return env.ASSETS.fetch(request);

    try {
      return await route(request, env);
    } catch (err) {
      console.error(`${url.pathname} failed:`, err?.message || err);
      return json({ error: 'The server could not complete this request.' }, 500);
    }
  },
};
