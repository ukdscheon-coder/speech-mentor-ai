// Demo mode without AI keys: rule-based scenes and coaching in the same shape as the AI output.
// All wording comes from lib/coach-text.js, so the chosen coaching language is used.
import { coachText, envLabel, energyLabel, fill } from './coach-text.js';

export function splitSentences(text) {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?。])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

function ruleSegment(s, t) {
  const words = s.split(/\s+/).filter(Boolean);
  const emphasisWords = [
    ...new Set(
      words
        .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
        .filter((w) => w.length >= 4 && s.includes(w))
        .sort((a, b) => b.length - a.length),
    ),
  ].slice(0, 3);

  let gestureCue = t.gesture.default;
  if (/\b(\d+|one|two|three|four|five)\b|세 가지|세 개|\d/i.test(s)) {
    gestureCue = t.gesture.count;
  } else if (/\b(we|us|our|together)\b|우리|함께/i.test(s)) {
    gestureCue = t.gesture.we;
  }

  return {
    text: s,
    emphasisWords,
    gestureCue,
    slideCue: '',
    pauseAfterMs: /[!?]$/.test(s) ? 1500 : 1200,
    intonation: /\?$/.test(s) ? 'up' : 'down',
    phonetics: [],
  };
}

export function buildLocalScenes(text, mentorLang = 'ko-KR') {
  const t = coachText(mentorLang);
  const sentences = splitSentences(text);
  const scenes = [];
  for (let i = 0; i < sentences.length; i += 3) {
    const chunk = sentences.slice(i, i + 3);
    scenes.push({
      badge: `${t.section} ${scenes.length + 1}`,
      title: chunk[0].slice(0, 40),
      mentorBriefing: t.briefing,
      segments: chunk.map((s) => ruleSegment(s, t)),
    });
  }
  return { title: sentences[0] ? sentences[0].slice(0, 60) : t.title, scenes };
}

export function buildLocalCoach(kind, d) {
  const lang = d.mentorLang || 'ko-KR';
  const t = coachText(lang);
  const wpm = d.wpm || 0;
  if (kind === 'qa') return fill(t.qa, { wpm });
  const env = d.env || {};
  return fill(t.practice, {
    env: env.name ? envLabel(lang, env.name) : t.envDefault,
    min: env.wpmMin,
    max: env.wpmMax,
    wpm,
    energy: energyLabel(lang, d.energy || '양호'),
  });
}

// Demo situations used when no AI key is configured.
export function localScenarios(mentorLang = 'ko-KR') {
  const t = coachText(mentorLang);
  const promptTargets = [
    'Could you give one concrete example of how this would work in practice?',
    '(The audience looks confused and someone is checking their phone.)',
    'We only have two minutes left, so please keep it brief.',
    "Isn't this claim too strong given the limited evidence you presented?",
  ];
  return t.scenarios.map(([kind, setting, promptMentor, responseHint], i) => ({
    kind,
    setting,
    promptTarget: promptTargets[i],
    promptMentor,
    responseHint,
  }));
}
