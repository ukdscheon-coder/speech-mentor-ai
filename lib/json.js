// Parsing and validation for model output. The UI trusts only the shape produced here.

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export function parseJsonLoose(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object in model output');
  return JSON.parse(text.slice(start, end + 1));
}

// Validates the Director agent's output and clamps every value to a safe range.
export function normaliseScenes(raw) {
  const scenes = (Array.isArray(raw?.scenes) ? raw.scenes : [])
    .map((sc, si) => {
      const segments = (Array.isArray(sc?.segments) ? sc.segments : [])
        .filter((s) => s && typeof s.text === 'string' && s.text.trim())
        .map((s) => {
          const text = s.text.trim();
          return {
            text,
            emphasisWords: (Array.isArray(s.emphasisWords) ? s.emphasisWords : [])
              .filter((w) => typeof w === 'string' && w && text.includes(w))
              .slice(0, 4),
            gestureCue: String(s.gestureCue || '').slice(0, 160),
            slideCue: String(s.slideCue || '').slice(0, 160),
            pauseAfterMs: clamp(Math.round(Number(s.pauseAfterMs) || 1200), 300, 3000),
            intonation: s.intonation === 'up' ? 'up' : 'down',
            phonetics: (Array.isArray(s.phonetics) ? s.phonetics : [])
              .filter((p) => p && p.term && p.phonetic)
              .slice(0, 6)
              .map((p) => ({ term: String(p.term), phonetic: String(p.phonetic) })),
          };
        });
      return {
        badge: `Section ${si + 1}`,
        title: String(sc?.title || `Section ${si + 1}`).slice(0, 160),
        mentorBriefing: String(sc?.mentorBriefing || '').slice(0, 800),
        segments,
      };
    })
    .filter((sc) => sc.segments.length);

  if (!scenes.length) throw new Error('The score came back empty');
  return { title: String(raw?.title || '').slice(0, 200), scenes };
}

// Validates the Reviewer agent's Q&A output.
export function normaliseQa(raw) {
  const list = Array.isArray(raw?.qa) ? raw.qa : [];
  return list
    .filter((q) => q && q.questionTarget)
    .slice(0, 3)
    .map((q, i) => ({
      id: `qa-ai-${i + 1}`,
      reviewer: String(q.reviewer || `Reviewer ${i + 1}`).slice(0, 120),
      tag: String(q.tag || 'Expected question').slice(0, 40),
      questionTarget: String(q.questionTarget).slice(0, 400),
      questionMentor: String(q.questionMentor || '').slice(0, 400),
      defenseGuideMentor: String(q.defenseGuideMentor || '').slice(0, 600),
      sampleAnswerTarget: String(q.sampleAnswerTarget || '').slice(0, 800),
    }));
}
