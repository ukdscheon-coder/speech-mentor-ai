// Pre-written coaching text for the rule-based demo mode (no AI key) and for fallbacks.
// Each language is stored once here, so the chosen coaching language is always used.
// en-US uses the British wording (en-GB) per the app's text standard.

export const COACH_LANGS = ['ko-KR', 'en-GB', 'en-US', 'ja-JP', 'es-ES', 'fr-FR', 'de-DE', 'zh-CN'];

const ENV_KO = ['학회 · 논문', '회사 · 비즈니스', '종교 · 설교', '학교 · 강의', '마케팅 · 세일즈', 'TED · 키노트', '투자 피칭', '행사 · 축사', '유튜브 · 방송', '직접 설정'];

const SET = {
  'ko-KR': {
    practice: '{env} 환경 권장 속도({min}~{max} WPM) 대비 분당 {wpm}단어로 말씀하셨습니다. 핵심 키워드 앞에서 0.3초만 숨을 고르고 성량 변화({energy})를 조금 더 살려주시면 전달력이 크게 올라갑니다.',
    qa: '답변을 분당 {wpm}단어로 말씀하셨습니다. 결론을 먼저 말하고, 근거를 하나씩 짧게 덧붙이면 심사위원이 더 쉽게 받아들입니다.',
    briefing: '차분한 속도로 핵심 문장을 또박또박 읽으세요. 강조 단어 앞에서 잠시 멈추세요.',
    gesture: { default: '차분히 청중과 시선 맞추기', count: '손가락으로 개수를 펼쳐 보이기', we: '양손을 청중 쪽으로 부드럽게 열기' },
    section: '섹션', title: '맞춤 스피치 원고', envDefault: '현재',
    env: {}, energy: {},
    scenarios: [
      ['돌발 질문', '질의응답', '청중이 구체적인 사례를 요청합니다.', '가장 대표적인 사례 하나를 골라 세 문장 안에서 답하세요.'],
      ['청중 반응', '발표 중간', '청중의 표정이 혼란스러워 보입니다.', '말을 잠시 멈추고 핵심 한 문장으로 다시 요약하세요.'],
      ['시간 압박', '발표 후반', '사회자가 남은 시간이 짧다고 알립니다.', '남은 핵심 두 가지만 골라 빠르게 마무리하세요.'],
      ['도전 질문', '질의응답', '근거가 충분하지 않다는 지적을 받습니다.', '근거의 한계를 먼저 인정하고, 필요한 추가 자료를 말하세요.'],
    ],
  },
  'en-GB': {
    practice: 'You spoke at {wpm} WPM against the {env} target of {min} to {max}. Pause briefly before key words and add more volume variation ({energy}).',
    qa: 'You answered at {wpm} WPM. Give the conclusion first, then add one short piece of evidence at a time.',
    briefing: 'Speak at a steady pace and pause briefly before the key words.',
    gesture: { default: 'Hold steady eye contact with the audience', count: 'Show the count on your fingers', we: 'Open both palms towards the audience' },
    section: 'Section', title: 'Custom speech script', envDefault: 'current',
    env: { '학회 · 논문': 'academic paper', '회사 · 비즈니스': 'business', '종교 · 설교': 'faith sermon', '학교 · 강의': 'school lecture', '마케팅 · 세일즈': 'marketing and sales', 'TED · 키노트': 'TED keynote', '투자 피칭': 'investor pitch', '행사 · 축사': 'event toast', '유튜브 · 방송': 'YouTube broadcast', '직접 설정': 'custom' },
    energy: { '매우 우수': 'excellent', '양호': 'fair', '평탄함': 'flat' },
    scenarios: [
      ['Unexpected question', 'Q&A', 'The audience asks for one concrete example.', 'Pick one representative case and answer in three sentences.'],
      ['Audience reaction', 'Mid-talk', 'The audience looks confused.', 'Pause, then restate the key point in one sentence.'],
      ['Time pressure', 'Late in the talk', 'The moderator says only two minutes remain.', 'Choose the two most important points and close quickly.'],
      ['Challenge', 'Q&A', 'The presenter is challenged on thin evidence.', 'Acknowledge the limit first, then name the evidence you would add.'],
    ],
  },
  'ja-JP': {
    practice: '{env}の推奨速度（{min}〜{max} WPM）に対して、毎分{wpm}語で話されました。キーワードの前で少し間を置き、声量の変化（{energy}）をもう少し生かしてください。',
    qa: '毎分{wpm}語で答えられました。まず結論を述べ、根拠を一つずつ短く加えると、審査員に伝わりやすくなります。',
    briefing: '落ち着いた速さで要点の文をはっきり読みましょう。強調したい語の前で少し間を置いてください。',
    gesture: { default: '聴衆と落ち着いて目を合わせる', count: '指で数を示す', we: '両手を聴衆の方へ柔らかく開く' },
    section: 'セクション', title: 'カスタムスピーチの原稿', envDefault: '現在',
    env: { '학회 · 논문': '学会・論文', '회사 · 비즈니스': '企業・ビジネス', '종교 · 설교': '宗教・説教', '학교 · 강의': '学校・講義', '마케팅 · 세일즈': 'マーケティング・営業', 'TED · 키노트': 'TED・基調講演', '투자 피칭': '投資家向けピッチ', '행사 · 축사': '式典・祝辞', '유튜브 · 방송': 'YouTube・配信', '직접 설정': 'カスタム' },
    energy: { '매우 우수': '非常に優秀', '양호': '良好', '평탄함': '平坦' },
    scenarios: [
      ['予想外の質問', '質疑応答', '聴衆が具体的な事例を求めています。', '最も代表的な事例を一つ選び、三文以内で答えてください。'],
      ['聴衆の反応', '発表の途中', '聴衆の表情が困惑しているように見えます。', '一度間を置き、要点を一文で言い直してください。'],
      ['時間の制約', '発表の後半', '司会者が残り時間は二分だと伝えます。', '重要な二点だけに絞って、手早くまとめてください。'],
      ['厳しい質問', '質疑応答', '根拠が不十分だという指摘を受けています。', '最初に根拠の限界を認め、必要な追加資料を挙げてください。'],
    ],
  },
  'es-ES': {
    practice: 'Hablaste a {wpm} palabras por minuto frente al ritmo recomendado de {min}–{max} WPM para {env}. Haz una pausa breve antes de las palabras clave y añade más variación de volumen ({energy}).',
    qa: 'Respondiste a {wpm} palabras por minuto. Da primero la conclusión y añade después, una por una, pruebas breves.',
    briefing: 'Habla a un ritmo constante y haz una pausa breve antes de las palabras clave.',
    gesture: { default: 'Mantén un contacto visual firme con el público', count: 'Muestra la cantidad con los dedos', we: 'Abre las palmas hacia el público' },
    section: 'Sección', title: 'Guion de discurso personalizado', envDefault: 'actual',
    env: { '학회 · 논문': 'congreso y artículo', '회사 · 비즈니스': 'empresa y negocios', '종교 · 설교': 'religión y sermón', '학교 · 강의': 'escuela y conferencia', '마케팅 · 세일즈': 'marketing y ventas', 'TED · 키노트': 'TED keynote', '투자 피칭': 'presentación a inversores', '행사 · 축사': 'evento y brindis', '유튜브 · 방송': 'YouTube y emisión', '직접 설정': 'personalizado' },
    energy: { '매우 우수': 'excelente', '양호': 'aceptable', '평탄함': 'monótona' },
    scenarios: [
      ['Pregunta inesperada', 'Turno de preguntas', 'El público pide un ejemplo concreto.', 'Elige un caso representativo y responde en tres frases.'],
      ['Reacción del público', 'A mitad de la charla', 'El público parece confundido.', 'Haz una pausa y resume el punto clave en una frase.'],
      ['Presión de tiempo', 'Final de la charla', 'El moderador dice que solo quedan dos minutos.', 'Elige los dos puntos más importantes y cierra rápido.'],
      ['Pregunta desafiante', 'Turno de preguntas', 'Cuestionan tu punto por falta de pruebas.', 'Reconoce primero el límite y luego nombra la prueba que añadirías.'],
    ],
  },
  'fr-FR': {
    practice: "Vous avez parlé à {wpm} mots par minute, contre le rythme recommandé de {min}–{max} mots/min pour {env}. Marquez une courte pause avant les mots clés et variez davantage le volume ({energy}).",
    qa: "Vous avez répondu à {wpm} mots par minute. Donnez d'abord la conclusion, puis ajoutez une preuve courte à la fois.",
    briefing: "Parlez d'un rythme régulier et marquez une courte pause avant les mots clés.",
    gesture: { default: 'Gardez un contact visuel stable avec le public', count: 'Montrez le nombre avec vos doigts', we: 'Ouvrez les deux paumes vers le public' },
    section: 'Section', title: 'Discours personnalisé', envDefault: 'actuel',
    env: { '학회 · 논문': 'congrès et article', '회사 · 비즈니스': 'entreprise et affaires', '종교 · 설교': 'religion et sermon', '학교 · 강의': 'école et cours', '마케팅 · 세일즈': 'marketing et vente', 'TED · 키노트': 'TED keynote', '투자 피칭': 'pitch investisseurs', '행사 · 축사': 'cérémonie et discours', '유튜브 · 방송': 'YouTube et diffusion', '직접 설정': 'personnalisé' },
    energy: { '매우 우수': 'excellent', '양호': 'correct', '평탄함': 'monotone' },
    scenarios: [
      ['Question inattendue', 'Questions-réponses', 'Le public demande un exemple concret.', 'Choisissez un cas représentatif et répondez en trois phrases.'],
      ['Réaction du public', "En cours d'exposé", 'Le public semble perplexe.', 'Marquez une pause, puis reformulez le point clé en une phrase.'],
      ['Pression du temps', "Fin de l'exposé", 'Le modérateur annonce qu\'il ne reste que deux minutes.', 'Gardez les deux points les plus importants et concluez vite.'],
      ['Question difficile', 'Questions-réponses', 'Votre affirmation est contestée faute de preuves suffisantes.', "Reconnaissez d'abord la limite, puis citez les preuves que vous ajouteriez."],
    ],
  },
  'de-DE': {
    practice: 'Sie sprachen mit {wpm} Wörtern pro Minute, empfohlen für {env} sind {min}–{max} WPM. Machen Sie vor Schlüsselwörtern eine kurze Pause und variieren Sie die Lautstärke stärker ({energy}).',
    qa: 'Sie haben mit {wpm} Wörtern pro Minute geantwortet. Nennen Sie zuerst das Ergebnis und fügen Sie dann nacheinander kurze Belege hinzu.',
    briefing: 'Sprechen Sie in ruhigem Tempo und machen Sie vor den Schlüsselwörtern eine kurze Pause.',
    gesture: { default: 'Halten Sie ruhig Blickkontakt zum Publikum', count: 'Zeigen Sie die Anzahl mit den Fingern', we: 'Öffnen Sie beide Handflächen zum Publikum' },
    section: 'Abschnitt', title: 'Individuelles Redeskript', envDefault: 'aktuelle',
    env: { '학회 · 논문': 'Akademie und Fachartikel', '회사 · 비즈니스': 'Unternehmen und Business', '종교 · 설교': 'Religion und Predigt', '학교 · 강의': 'Schule und Vorlesung', '마케팅 · 세일즈': 'Marketing und Vertrieb', 'TED · 키노트': 'TED Keynote', '투자 피칭': 'Investoren-Pitch', '행사 · 축사': 'Feier und Festrede', '유튜브 · 방송': 'YouTube und Sendung', '직접 설정': 'eigene' },
    energy: { '매우 우수': 'sehr gut', '양호': 'befriedigend', '평탄함': 'monoton' },
    scenarios: [
      ['Unerwartete Frage', 'Fragerunde', 'Das Publikum bittet um ein konkretes Beispiel.', 'Wählen Sie einen typischen Fall und antworten Sie in drei Sätzen.'],
      ['Reaktion des Publikums', 'Mitten im Vortrag', 'Das Publikum wirkt verwirrt.', 'Pausieren Sie kurz und fassen Sie den Kernpunkt in einem Satz neu zusammen.'],
      ['Zeitdruck', 'Gegen Ende des Vortrags', 'Die Moderation sagt, es bleiben nur zwei Minuten.', 'Wählen Sie die zwei wichtigsten Punkte und schließen Sie zügig ab.'],
      ['Kritische Frage', 'Fragerunde', 'Ihre Aussage wird wegen schwacher Belege angezweifelt.', 'Räumen Sie zuerst die Grenze ein und nennen Sie dann die Belege, die Sie ergänzen würden.'],
    ],
  },
  'zh-CN': {
    practice: '您的语速为每分钟 {wpm} 个词，而{env}的推荐语速为 {min}–{max} WPM。在关键词前稍作停顿，并增加音量变化（{energy}）。',
    qa: '您的回答语速为每分钟 {wpm} 个词。先说结论，再逐条简要补充依据，评审会更容易接受。',
    briefing: '请以平稳的语速朗读，并在关键词前稍作停顿。',
    gesture: { default: '保持平稳的眼神交流', count: '用手指比出数量', we: '双手掌心向听众缓缓打开' },
    section: '段落', title: '定制演讲稿', envDefault: '当前',
    env: { '학회 · 논문': '学术会议 · 论文', '회사 · 비즈니스': '企业 · 商务', '종교 · 설교': '宗教 · 讲道', '학교 · 강의': '学校 · 讲课', '마케팅 · 세일즈': '营销 · 销售', 'TED · 키노트': 'TED · 主题演讲', '투자 피칭': '投资路演', '행사 · 축사': '活动 · 致辞', '유튜브 · 방송': '视频 · 直播', '직접 설정': '自定义' },
    energy: { '매우 우수': '非常优秀', '양호': '尚可', '평탄함': '平淡' },
    scenarios: [
      ['突发提问', '问答环节', '听众请求一个具体的例子。', '选一个最有代表性的案例，用三句话回答。'],
      ['听众反应', '演讲中途', '听众看起来有些困惑。', '稍作停顿，用一句话重新概括核心观点。'],
      ['时间紧张', '演讲后半段', '主持人提醒只剩两分钟。', '只挑出两个最重要的要点，快速收尾。'],
      ['质疑提问', '问答环节', '有人质疑你提供的证据不足。', '先承认局限，再说明你会补充哪些资料。'],
    ],
  },
};
SET['en-US'] = SET['en-GB'];

// Returns the text set for a language code; unknown codes fall back to British English (Korean when the code is ko-*).
export function coachText(code) {
  if (SET[code]) return SET[code];
  return String(code || '').startsWith('ko') ? SET['ko-KR'] : SET['en-GB'];
}

export function envLabel(code, koName) {
  const t = coachText(code);
  return t.env[koName] || koName;
}

export function energyLabel(code, koLabel) {
  const t = coachText(code);
  return t.energy[koLabel] || koLabel;
}

export function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] === undefined ? '' : String(vars[k])));
}

export { ENV_KO };
