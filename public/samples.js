// Built-in sample speeches. Each sample sets its own speech language, coaching language and environment.
window.SPEECH_SAMPLES = [
  {
    "id": "gettysburg-en-us",
    "label": "🇺🇸 게티즈버그 연설 (1863, 공개 도메인) · 행사·축사",
    "environmentId": "ceremony",
    "targetLang": "en-US",
    "mentorLang": "ko-KR",
    "text": "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.\n\nNow we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.\n\nBut, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow, this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here.\n\nIt is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion. We here highly resolve that these dead shall not have died in vain, that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth."
  },
  {
    "id": "pilot-update-en-gb",
    "label": "🇬🇧 현장 파일럿 결과 보고 · 회사·비즈니스",
    "environmentId": "corporate",
    "targetLang": "en-GB",
    "mentorLang": "ko-KR",
    "text": "Good morning, everyone. Over the last three months, our team ran a small pilot to reduce delivery delays for field engineers. We tracked every shipment, every missed appointment and every return.\n\nThe results were clear. Average waiting time fell by a quarter, and returns were processed within two working days. Engineers also reported fewer repeat visits.\n\nNext, we propose a wider rollout, starting with two regions. I would welcome your questions before we confirm the plan."
  },
  {
    "id": "library-ko-kr",
    "label": "🇰🇷 동네 도서관 이야기 · TED·키노트",
    "environmentId": "ted",
    "targetLang": "ko-KR",
    "mentorLang": "en-GB",
    "text": "저는 매일 아침 같은 질문으로 하루를 시작합니다. 오늘 나는 누구에게 도움이 될 수 있을까? 이 질문은 거창하지 않습니다. 그러나 답을 찾기 시작하면 하루의 방향이 바뀝니다.\n\n오늘은 그 작은 질문이 제 일의 방식을 어떻게 바꾸었는지 이야기하고 싶습니다. 작년에 저는 동네 도서관의 빈 시간을 주민들과 함께 쓰는 실험을 시작했습니다.\n\n그 결과 학생과 육아 중인 부모가 다시 도서관을 찾기 시작했습니다. 작은 질문 하나가 공간을 바꾸었습니다."
  },
  {
    "id": "library-ja-jp",
    "label": "🇯🇵 地域の図書館 · 学校·講義",
    "environmentId": "school",
    "targetLang": "ja-JP",
    "mentorLang": "ko-KR",
    "text": "皆さん、こんにちは。今日は「地域の図書館をどう使うか」についてお話しします。まず、図書館は本を借りる場所だけではありません。学びの場であり、人と出会う場でもあります。\n\n私たちの町では、利用者の声をもとに週末の開館時間を延長しました。その結果、学生や子育て世代の利用が増えています。\n\n次の一歩として、子ども向けの読み聞かせを毎週開くことを提案します。ご意見をいただけたら嬉しいです。"
  },
  {
    "id": "cafe-launch-es-es",
    "label": "🇪🇸 lanzamiento de producto · 마케팅·세일즈",
    "environmentId": "marketing",
    "targetLang": "es-ES",
    "mentorLang": "ko-KR",
    "text": "Imagina una mañana en la que tu café ya está listo y tu agenda ya está organizada. Eso es exactamente lo que ofrecemos. Nuestra herramienta reúne tus tareas, tus correos y tus reuniones en un solo lugar.\n\nLo mejor es que, de media, ahorra una hora al día. Y no necesitas cambiar tus hábitos para empezar.\n\nHoy te invito a probarla durante treinta días, sin compromiso. Si no notas la diferencia, no pagas nada."
  },
  {
    "id": "wedding-toast-fr-fr",
    "label": "🇫🇷 toast de mariage · 행사·축사",
    "environmentId": "ceremony",
    "targetLang": "fr-FR",
    "mentorLang": "en-GB",
    "text": "Chers amis, c'est un honneur d'être parmi vous pour célébrer ce mariage. Ce jour nous rappelle que l'amour se construit chaque jour, par de petits gestes et beaucoup de patience.\n\nJe souhaite à nos amis une vie remplie de rires, de respect et de confiance. Ils savent écouter, et c'est sans doute leur plus belle qualité.\n\nLevons nos verres à leur bonheur."
  },
  {
    "id": "lab-study-de-de",
    "label": "🇩🇪 Laborstudie · 학회·논문",
    "environmentId": "academic",
    "targetLang": "de-DE",
    "mentorLang": "ko-KR",
    "text": "Sehr geehrte Damen und Herren, in meinem Vortrag stelle ich eine Methode vor, mit der sich die Zuverlässigkeit von Messdaten in klinischen Laborumgebungen verbessern lässt.\n\nDie Ergebnisse zeigen eine deutliche Reduktion der Abweichungen zwischen den Messreihen. Allerdings sind die Stichproben noch klein.\n\nDeshalb schlage ich eine größere Folgestudie vor. Vielen Dank für Ihre Aufmerksamkeit."
  },
  {
    "id": "sermon-zh-cn",
    "label": "🇨🇳 主日信息 · 종교·설교",
    "environmentId": "sermon",
    "targetLang": "zh-CN",
    "mentorLang": "ko-KR",
    "text": "亲爱的弟兄姐妹们，平安！今天我们读到的经文告诉我们，真正的爱不是一时的热情，而是持续的陪伴。\n\n在生活中，我们常常忙于自己的计划，却忽略了身边需要帮助的人。愿我们每一天都能放下一点自己，去看见别人的需要。\n\n愿神的平安与我们同在。阿们。"
  }
];
