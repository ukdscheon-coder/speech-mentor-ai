// Anthropic Messages API wrapper for Cloudflare Workers. The key comes from the Worker's env bindings.
const API_URL = 'https://api.anthropic.com/v1/messages';

export function hasClaude(env) {
  return Boolean(env.ANTHROPIC_API_KEY);
}

export async function callClaude(env, { system, content, maxTokens = 2000 }) {
  if (!env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Claude API ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  return data.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');
}
