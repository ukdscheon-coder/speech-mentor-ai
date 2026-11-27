// POST /api/scenarios: Rehearsal Director agent writes real-situation prompts for the presenter's talk.
import { callClaude, hasClaude } from '../../lib/claude.js';
import { scenariosPrompt } from '../../lib/prompts.js';
import { parseJsonLoose, normaliseScenarios } from '../../lib/json.js';
import { localScenarios } from '../../lib/local.js';
import { json, readJson, methodNotAllowed } from '../util.js';

export default async function scenarios(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const { title = '', text = '', mentorLang = 'ko-KR', targetLang = 'en-GB' } = await readJson(request);
  if (!text.trim()) return json({ error: 'Send the script text.' }, 400);
  if (!hasClaude(env)) return json({ source: 'local', scenarios: localScenarios(mentorLang) });

  try {
    const out = await callClaude(env, {
      system: scenariosPrompt(mentorLang, targetLang),
      content: [{ type: 'text', text: `Talk title: ${title}\n\nScript:\n${text.slice(0, 8000)}` }],
      maxTokens: 2000,
    });
    return json({ source: 'claude', scenarios: normaliseScenarios(parseJsonLoose(out)) });
  } catch (err) {
    console.error('scenarios failed:', err.message);
    return json({ error: 'The Rehearsal Director could not write situations. Try again.' }, 502);
  }
}
