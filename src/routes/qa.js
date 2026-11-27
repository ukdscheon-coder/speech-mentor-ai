// POST /api/qa: Reviewer agent writes three hard questions for the presenter's own script.
import { callClaude, hasClaude } from '../../lib/claude.js';
import { reviewerPrompt } from '../../lib/prompts.js';
import { parseJsonLoose, normaliseQa } from '../../lib/json.js';
import { json, readJson, methodNotAllowed } from '../util.js';

export default async function qa(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const { title = '', text = '', mentorLang = 'ko-KR', targetLang = 'en-GB' } = await readJson(request);
  if (!text.trim()) return json({ error: 'Send the script text.' }, 400);
  if (!hasClaude(env)) return json({ source: 'local', qa: [] });

  try {
    const out = await callClaude(env, {
      system: reviewerPrompt(mentorLang, targetLang),
      content: [{ type: 'text', text: `Talk title: ${title}\n\nScript:\n${text.slice(0, 12000)}` }],
      maxTokens: 3000,
    });
    return json({ source: 'claude', qa: normaliseQa(parseJsonLoose(out)) });
  } catch (err) {
    console.error('qa failed:', err.message);
    return json({ error: 'The Reviewer agent could not write questions. Try again.' }, 502);
  }
}
