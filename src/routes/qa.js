// POST /api/qa: Reviewer agent writes three hard questions for the presenter's own script.
import { callClaude, hasClaude } from '../../lib/claude.js';
import { reviewerPrompt } from '../../lib/prompts.js';
import { parseJsonLoose, normaliseQa } from '../../lib/json.js';
import { json, readJson, methodNotAllowed } from '../util.js';

const RETRYABLE_STATUS = new Set([500, 502, 503, 504, 529]);

export default async function qa(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const { title = '', text = '', mentorLang = 'ko-KR', targetLang = 'en-GB' } = (await readJson(request)) ?? {};
  if (typeof text !== 'string' || !text.trim()) return json({ error: 'Send the script text.' }, 400);
  if (!hasClaude(env)) return json({ source: 'local', qa: [] });

  const options = {
    system: reviewerPrompt(mentorLang, targetLang),
    content: [{ type: 'text', text: `Talk title: ${title}\n\nScript:\n${text.slice(0, 12000)}` }],
    maxTokens: 3000,
  };
  const failure = { error: 'The Reviewer agent could not write questions. Try again.' };
  const rayId = request.headers.get('cf-ray');
  let output;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      output = await callClaude(env, options);
      break;
    } catch (err) {
      // callClaude includes the provider response body in its error. Log only its HTTP status.
      const status = Number(/^Claude API (\d{3}):/.exec(err?.message)?.[1]) || null;
      console.error('qa_failed', { stage: 'provider_call', status, rayId, attempt });
      if (attempt === 2 || !RETRYABLE_STATUS.has(status)) return json(failure, 502);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  try {
    const questions = normaliseQa(parseJsonLoose(output));
    if (questions.length) return json({ source: 'claude', qa: questions });
    console.error('qa_failed', { stage: 'empty_questions', rayId });
  } catch {
    console.error('qa_failed', { stage: 'invalid_output', rayId });
  }
  return json(failure, 502);
}
