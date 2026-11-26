import { json } from '../util.js';

export default async function health(request, env) {
  return json({
    ai: Boolean(env.ANTHROPIC_API_KEY),
    tts: Boolean(env.GEMINI_API_KEY),
    history: Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY),
    model: env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
  });
}
