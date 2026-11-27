// Demo mode without AI keys: rule-based scenes and coaching in the same shape as the AI output.

export function splitSentences(text) {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?。])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

function ruleSegment(s, ko) {
  const words = s.split(/\s+/).filter(Boolean);
  const emphasisWords = [
    ...new Set(
      words
        .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
        .filter((w) => w.length >= 4 && s.includes(w))
        .sort((a, b) => b.length - a.length),
    ),
  ].slice(0, 3);

  let gestureCue = ko ? '차분히 청중과 시선 맞추기' : 'Hold steady eye contact with the audience';
  if (/\b(\d+|one|two|three|four|five)\b|세 가지|세 개|\d/i.test(s)) {
    gestureCue = ko ? '손가락으로 개수를 펼쳐 보이기' : 'Show the count on your fingers';
  } else if (/\b(we|us|our|together)\b|우리|함께/i.test(s)) {
    gestureCue = ko ? '양손을 청중 쪽으로 부드럽게 열기' : 'Open both palms towards the audience';
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
  const ko = String(mentorLang).startsWith('ko');
  const sentences = splitSentences(text);
  const scenes = [];
  for (let i = 0; i < sentences.length; i += 3) {
    const chunk = sentences.slice(i, i + 3);
    scenes.push({
      badge: `Section ${scenes.length + 1}`,
      title: chunk[0].slice(0, 40),
      mentorBriefing: ko
        ? '차분한 속도로 핵심 문장을 또박또박 읽으세요. 강조 단어 앞에서 잠시 멈추세요.'
        : 'Speak at a steady pace and pause briefly before the key words.',
      segments: chunk.map((s) => ruleSegment(s, ko)),
    });
  }
  return { title: sentences[0] ? sentences[0].slice(0, 60) : '맞춤 스피치 원고', scenes };
}

export function buildLocalCoach(kind, d) {
  const ko = String(d.mentorLang || 'ko-KR').startsWith('ko');
  const env = d.env || {};
  const wpm = d.wpm || 0;
  if (kind === 'qa') {
    return ko
      ? `답변을 분당 ${wpm}단어로 말씀하셨습니다. 결론을 먼저 말하고, 근거를 하나씩 짧게 덧붙이면 심사위원이 더 쉽게 받아들입니다.`
      : `You answered at ${wpm} WPM. Give the conclusion first, then add one short piece of evidence at a time.`;
  }
  const energy = d.energy || '양호';
  return ko
    ? `${env.name || '현재'} 환경 권장 속도(${env.wpmMin}~${env.wpmMax} WPM) 대비 분당 ${wpm}단어로 말씀하셨습니다. 핵심 키워드 앞에서 0.3초만 숨을 고르고 성량 변화(${energy})를 조금 더 살려주시면 전달력이 크게 올라갑니다.`
    : `You spoke at ${wpm} WPM against the ${env.name || 'current'} target of ${env.wpmMin} to ${env.wpmMax}. Pause briefly before key words and add more volume variation (${energy}).`;
}

// Demo situations used when no AI key is configured. Korean coaching text when the coaching language is Korean.
export function localScenarios(mentorLang = 'ko-KR') {
  const ko = String(mentorLang).startsWith('ko');
  const list = [
    { kind: ko ? '돌발 질문' : 'Unexpected question', setting: ko ? '질의응답' : 'Q&A',
      promptTarget: 'Could you give one concrete example of how this would work in practice?',
      promptMentor: ko ? '청중이 구체적인 사례를 요청합니다.' : 'The audience asks for one concrete example.',
      responseHint: ko ? '가장 대표적인 사례 하나를 골라 세 문장 안에서 답하세요.' : 'Pick one representative case and answer in three sentences.' },
    { kind: ko ? '청중 반응' : 'Audience reaction', setting: ko ? '발표 중간' : 'Mid-talk',
      promptTarget: '(The audience looks confused and someone is checking their phone.)',
      promptMentor: ko ? '청중의 표정이 혼란스러워 보입니다.' : 'The audience looks confused.',
      responseHint: ko ? '말을 잠시 멈추고 핵심 한 문장으로 다시 요약하세요.' : 'Pause, then restate the key point in one sentence.' },
    { kind: ko ? '시간 압박' : 'Time pressure', setting: ko ? '발표 후반' : 'Late in the talk',
      promptTarget: 'We only have two minutes left, so please keep it brief.',
      promptMentor: ko ? '사회자가 남은 시간이 짧다고 알립니다.' : 'The moderator says only two minutes remain.',
      responseHint: ko ? '남은 핵심 두 가지만 골라 빠르게 마무리하세요.' : 'Choose the two most important points and close quickly.' },
    { kind: ko ? '도전 질문' : 'Challenge', setting: ko ? '질의응답' : 'Q&A',
      promptTarget: 'Isn\'t this claim too strong given the limited evidence you presented?',
      promptMentor: ko ? '근거가 충분하지 않다는 지적을 받습니다.' : 'The presenter is challenged on thin evidence.',
      responseHint: ko ? '근거의 한계를 먼저 인정하고, 필요한 추가 자료를 말하세요.' : 'Acknowledge the limit first, then name the evidence you would add.' },
  ];
  return list;
}
