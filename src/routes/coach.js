// POST /api/coach: Tutor agent for practice takes and Q&A answers.
import { callClaude, hasClaude } from '../../lib/claude.js';
import { tutorPrompt } from '../../lib/prompts.js';
import { buildLocalCoach } from '../../lib/local.js';
import { json, readJson, methodNotAllowed } from '../util.js';

export default async function coach(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const body = await readJson(request);
  const kind = body.kind === 'qa' ? 'qa' : 'practice';

  if (!hasClaude(env)) return json({ source: 'local', feedback: buildLocalCoach(kind, body) });

  try {
    const data =
      kind === 'qa'
        ? { question: body.question, answer: body.answer, wpm: body.wpm, energy: body.energy }
        : { sceneTitle: body.sceneTitle, spoken: body.spoken, wpm: body.wpm, energy: body.energy, target: body.env };
    const out = await callClaude(env, {
      system: tutorPrompt(body.mentorLang || 'ko-KR'),
      content: [{ type: 'text', text: JSON.stringify({ kind, ...data }) }],
      maxTokens: 400,
    });
    const feedback = out.trim().slice(0, 600);
    if (!feedback) throw new Error('Empty coaching output');
    return json({ source: 'claude', feedback });
  } catch (err) {
    console.error('coach failed:', err.message);
    return json({ source: 'local', feedback: buildLocalCoach(kind, body) });
  }
}
