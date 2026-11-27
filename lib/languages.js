// Supported speech and coaching languages. Keys are BCP-47 codes used by the UI and the API.
export const LANGUAGES = {
  'en-GB': 'British English',
  'en-US': 'American English',
  'ko-KR': 'Korean',
  'ja-JP': 'Japanese',
  'es-ES': 'Spanish',
  'fr-FR': 'French',
  'de-DE': 'German',
  'zh-CN': 'Mandarin Chinese',
};

// Human-readable name used inside prompts. Falls back to English for unknown codes.
export function languageName(code) {
  return LANGUAGES[code] || 'British English';
}
